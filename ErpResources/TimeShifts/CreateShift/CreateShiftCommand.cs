using MediatR;

namespace Gateway.TimeShifts.CreateShift;

internal record CreateShiftCommand(Guid EmployeId, DateTime StartTime, DateTime EndTime, string Position)
    : IRequest<Guid>;
