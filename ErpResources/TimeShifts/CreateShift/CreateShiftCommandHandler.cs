using MediatR;

namespace Gateway.TimeShifts.CreateShift;

internal class CreateShiftCommandHandler : IRequestHandler<CreateShiftCommand, Guid> {
    readonly ITimeShiftsRepository _repository;

    public CreateShiftCommandHandler(ITimeShiftsRepository repository) {
        _repository = repository;
    }

    public async Task<Guid> Handle(CreateShiftCommand request, CancellationToken cancellationToken) {
        ArgumentNullException.ThrowIfNull(request);

        var shift = new TimeShift(request.EmployeId, request.StartTime, request.EndTime);

        await _repository.AddAsync(shift, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return shift.Id;
    }
}
