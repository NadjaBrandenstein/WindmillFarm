using DataAccess.Entity;

namespace api.Mapper;

public static class UserMappers
{
    public static AuthUserInfoDto ToDto(this Login login, User profile)
    {
        return new AuthUserInfoDto
        {
            UserId = login.UserId,
            UserName = login.Username,
            FirstName = profile.Fname ?? string.Empty,
            LastName = profile?.Lname ?? string.Empty,
            RoleId = login.RoleId,
        };
    }
}