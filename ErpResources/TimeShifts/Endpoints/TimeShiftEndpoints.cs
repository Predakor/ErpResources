using Gateway.TimeShifts.CreateShift;
using Gateway.TimeShifts.GetAllShifts;
using MediatR;

namespace Gateway.TimeShifts.Endpoints;

internal static class TimeShiftEndpoints {
    public static void MapTimeShiftEndpoints(this IEndpointRouteBuilder endpoints) {
        Func<HttpContext, string> getGreeting = (HttpContext httpContext) => {
            return " Hello world";
        };

        endpoints.MapGet("/", GetTimeShifts).WithName("Init").WithOpenApi();
        endpoints.MapPost("/", CreateTimeShift).WithName("Create").WithOpenApi();
    }

    static async Task<IResult> GetTimeShifts(ISender sender) {
        var query = new GetAllShiftsQuery();
        return await sender
            .Send(query)
            .MatchAsync(
                result => Results.Ok(result),
                error => Results.BadRequest(error.Message));
    }

    static async Task<IResult> CreateTimeShift(CreateShiftCommand command, ISender sender) {
        var shiftId = await sender.Send(command);
        return Results.Ok(shiftId);
    }
}
