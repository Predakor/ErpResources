using MediatR;

namespace Gateway.TimeShifts.GetAllShifts;

internal class GetShiftsQueryHandler
    : IRequestHandler<GetAllShiftsQuery, Result<IEnumerable<TimeShift>>> {
    readonly ITimeShiftsRepository _repository;

    public GetShiftsQueryHandler(ITimeShiftsRepository repository) {
        _repository = repository;
    }

    public async Task<Result<IEnumerable<TimeShift>>> Handle(
        GetAllShiftsQuery request,
        CancellationToken cancellationToken
    ) {
        return await _repository.ListAsync(null, cancellationToken);
    }
}
