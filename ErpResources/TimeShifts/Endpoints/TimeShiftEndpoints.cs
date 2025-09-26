using Gateway.TimeShifts.CreateShift;
using Gateway.TimeShifts.GetAllShifts;
using MediatR;

namespace Gateway.TimeShifts.Endpoints;

internal static class TimeShiftEndpoints {
    public static void MapTimeShiftEndpoints(this IEndpointRouteBuilder endpoints) {
        var group = endpoints.MapGroup("/timeshifts").RequireAuthorization().WithOpenApi();

        group.MapGet("/", GetTimeShifts).WithName("Init");
        group.MapPost("/", CreateTimeShift).WithName("Create");
    }

    static async Task<IResult> GetTimeShifts(ISender sender) {
        var query = new GetAllShiftsQuery();
        return await sender
            .Send(query)
            .MatchAsync(result => Results.Ok(result), error => Results.BadRequest(error.Message));
    }

    static async Task<IResult> CreateTimeShift(CreateShiftCommand command, ISender sender) {
        var shiftId = await sender.Send(command);
        return Results.Ok(shiftId);
    }
}
