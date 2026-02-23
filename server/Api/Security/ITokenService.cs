namespace Api.Security;

public class ITokenService
{
    string CreateToken(AuthUserInfoDto user);
}