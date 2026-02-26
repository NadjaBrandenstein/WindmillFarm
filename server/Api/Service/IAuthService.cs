using System.Security.Claims;
using Api.Dtos.Request;


namespace Api.Service;

public interface IAuthService
{
    Task<AuthUserInfoDto> AuthenticateAsync(LoginRequest request);
    Task<AuthUserInfoDto> RegisterAsync(RegisterRequest request);
    Task<AuthUserInfoDto?> GetUserInfoAsync(ClaimsPrincipal principal);
}