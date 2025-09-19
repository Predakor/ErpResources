namespace Gateway.TimeShifts.Endpoints;

internal static class TimeShiftEndpoints {
    public static void MapTimeShiftEndpoints(this IEndpointRouteBuilder endpointes) {
        Func<HttpContext, string> getGreeting = (HttpContext httpContext) => {
            return " Hello world";
        };

        endpointes.MapGet("/", getGreeting).WithName("Init").WithOpenApi().RequireAuthorization();
    }
}
