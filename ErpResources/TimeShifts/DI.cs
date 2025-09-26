using Gateway.TimeShifts.Endpoints;

namespace Gateway.TimeShifts;

internal static class DI {
    public static IServiceCollection AddTimeShiftsModule(this IServiceCollection services) {
        return services.AddScoped<ITimeShiftsRepository, TimeShiftsRepository>();
    }

    public static WebApplication ConfigureTimeShiftsApi(this WebApplication app) {
        app.MapTimeShiftEndpoints();
        return app;
    }
}
