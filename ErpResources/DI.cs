using Gateway.Infrastructure;
using Microsoft.AspNetCore.Identity;

namespace Gateway;

internal static class DI {
    public static IServiceCollection AddAuth(this IServiceCollection services) {

        services.AddCors(options => {
            string[] origins = ["http://localhost:4200", "https://localhost:4200"];
            options.AddPolicy(
                "CorsPolicy",
                policy =>
                    policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod().AllowCredentials()
            );
        });

        services.AddAuthentication().AddBearerToken();
        services.AddAuthorization();

        services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<AppDbContext>();

        return services;
    }

    public static WebApplication UseAuth(this WebApplication app) {
        app.UseCors("CorsPolicy");
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapIdentityApi<IdentityUser>();
        return app;
    }
}
