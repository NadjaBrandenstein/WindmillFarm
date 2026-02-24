namespace Api.Dtos.Response.Response;

public record LoginResponse(string Jwt, AuthUserInfoDto User);