using System.Text.Json;
using System.Text.Json.Serialization;
using api;
using Api.Security;
using Api.Service;
using DataAccess.Entity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DataAccess.MyDbContext;
using DataAccess.Repositories;
using StackExchange.Redis;


public class Program
{
    public static void ConfigureServices(IServiceCollection services, IConfiguration configuration, WebApplicationBuilder builder)
    {
        var appOptions = services.AddAppOptions(configuration);

        // Use concrete AppDbContext instead of abstract DbContext
        var connectionString = appOptions.DbConnectionString;
        builder.Services.AddDbContext<MyDbContext>(options =>
            options.UseNpgsql(connectionString)
                   .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
        );

        // Repositories
        builder.Services.AddScoped<IRepository<Login>, LoginRepository>();
        builder.Services.AddScoped<IRepository<User>, UserRepository>();

        // Services
        builder.Services.AddScoped<IPasswordHasher<Login>, NSecArgon2IdPasswordHasher>();
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<ITokenService, JwtService>();
        
        
        
        
        // Authentication & Authorization
        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = JwtService.ValidationParameters(builder.Configuration);

                // Debug logging
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"Authentication failed: {context.Exception}");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("Token Validated Successfully");
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization();
        
        builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
            ConnectionMultiplexer.Connect("localhost:6379"));

        //builder.Services.AddRedisSseBackplane();
        
        // Controllers & OpenAPI / Swagger
        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        });
        
        
        
        
        // OpenAPI / Swagger
        builder.Services.AddOpenApiDocument(); // no DefaultPropertyNameHandling needed

        builder.Services.AddProblemDetails();

        // CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("FrontendPolicy", policy =>
            {
                policy
                    .WithOrigins(
                        // change to right address "https://jerne-if-doede-duer.fly.dev", 
                        "http://localhost:5173"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

    }

    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configure services
        ConfigureServices(builder.Services, builder.Configuration, builder);

        var app = builder.Build();

        // Middleware pipeline
        app.UseExceptionHandler();
        app.UseRouting();

        app.UseCors("FrontendPolicy");

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseOpenApi();
        app.UseSwaggerUi();
        if (app.Environment.IsDevelopment())
        {
            await app.GenerateApiClientsFromOpenApi("/../../client/src/generated-ts-client.ts");
        }

        app.MapControllers();

        await app.RunAsync();
    }
}