using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Api.Dtos.Request;
using Api.Etc;
using api.Mapper;
using DataAccess.Entity;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;


namespace Api.Service;

public class AuthService : IAuthService
{
    private readonly ILogger<AuthService> _logger;
    private readonly IPasswordHasher<Login> _passwordHasher;
    private readonly IRepository<Login> _loginRepository;
    private readonly IRepository<User> _profileRepository;

    public AuthService(
        ILogger<AuthService> logger,
        IPasswordHasher<Login> passwordHasher,
        IRepository<Login> loginRepository,
        IRepository<User> profileRepository)
    {
        _logger = logger;
        _passwordHasher = passwordHasher;
        _loginRepository = loginRepository;
        _profileRepository = profileRepository;
    }

    public async Task<AuthUserInfoDto> AuthenticateAsync(LoginRequest request)
    {
        var login = _loginRepository.Query()
            .SingleOrDefault(l => l.Username == request.Username);

        if (login == null)
            throw new AuthenticationError();

        var result =
            _passwordHasher.VerifyHashedPassword(login, login.Password, request.Password);
        

        if (result != PasswordVerificationResult.Success)
            throw new AuthenticationError();

        var profile = _profileRepository.Query()
            .SingleOrDefault(p => p.UserId == login.UserId);

        if (profile == null)
            throw new AuthenticationError();

        return login.ToDto(profile);
    }

    public async Task<AuthUserInfoDto> RegisterAsync(RegisterRequest request)
    {
        
        if (_loginRepository.Query().Any(l => l.Username == request.UserName))
            throw new ValidationException("Username already exists.");
        
        var login = new Login
        {
            Username = request.UserName,
            UserId = 1
        };
        login.Password = _passwordHasher.HashPassword(login, request.Password);
        await _loginRepository.Add(login);
        
        var profile = new User()
        {
            UserId = login.UserId,
            Fname = request.FirstName,
            Lname = request.LastName,
            RoleId = 1,
        };
        await _profileRepository.Add(profile);

        return login.ToDto(profile);
    }


    public async Task<AuthUserInfoDto?> GetUserInfoAsync(ClaimsPrincipal principal)
    {
        var idClaim = principal.FindFirst(ClaimTypes.NameIdentifier);
        if (idClaim == null)
        {
            _logger.LogError("User ID not found in token claims!");
            return null;
        }

        if (!int.TryParse(idClaim.Value, out int userId))
        {
            _logger.LogError($"Token ID is not a number: {idClaim.Value}");
            return null;
        }

        var login = _loginRepository.Query().FirstOrDefault(l => l.UserId == userId);
        var profile = _profileRepository.Query().FirstOrDefault(p => p.UserId == userId);

        if (login == null || profile == null)
        {
            _logger.LogError($"User or profile not found for ID {userId}");
            return null;
        }

        return login.ToDto(profile);
    }
}