using MediatR;

namespace Gateway.TimeShifts.GetAllShifts;

internal record GetAllShiftsCommand : IRequest<Result<IEnumerable<TimeShift>>>;
