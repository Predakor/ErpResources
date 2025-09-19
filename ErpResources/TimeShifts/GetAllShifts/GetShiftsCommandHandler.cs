using MediatR;

namespace Gateway.TimeShifts.GetAllShifts;

internal class GetShiftsCommandHandler
    : IRequestHandler<GetAllShiftsCommand, Result<IEnumerable<TimeShift>>> {
    readonly ITimeShiftsRepository _repository;

    public GetShiftsCommandHandler(ITimeShiftsRepository repository) {
        _repository = repository;
    }

    public async Task<Result<IEnumerable<TimeShift>>> Handle(
        GetAllShiftsCommand request,
        CancellationToken cancellationToken
    ) {
        return await _repository.ListAsync(null, cancellationToken);
    }
}
