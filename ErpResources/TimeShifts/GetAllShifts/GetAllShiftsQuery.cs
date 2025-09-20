using MediatR;

namespace Gateway.TimeShifts.GetAllShifts;

internal record GetAllShiftsQuery : IRequest<Result<IEnumerable<TimeShift>>>;
