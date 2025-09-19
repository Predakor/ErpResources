
namespace Gateway.TimeShifts;

internal interface ITimeShiftsRepository : IRepository<TimeShift> {
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken);
}