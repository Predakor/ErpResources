using Gateway.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Gateway.TimeShifts;

internal class TimeShiftsRepository : ITimeShiftsRepository {
    readonly AppDbContext _dbContext;
    readonly DbSet<TimeShift> _timeShifts;

    public TimeShiftsRepository(AppDbContext context) {
        _dbContext = context;
        _timeShifts = context.Set<TimeShift>();
    }

    public async Task<Result<TimeShift>> AddAsync(
        TimeShift entity,
        CancellationToken cancellationToken
    ) {
        if (entity is null) {
            return AppError.Unknown("Entity was null");
        }

        await _timeShifts.AddAsync(entity, cancellationToken);

        return entity;
    }

    public async Task<Result<TimeShift>> DeleteAsync(
        TimeShift entity,
        bool hardDelete,
        CancellationToken cancellationToken
    ) {
        if (entity is null) {
            return null;
        }

        _timeShifts.Remove(entity);
        return await Task.FromResult(entity);
    }

    public Task<Result<TimeShift>> GetByIdAsync(Guid id, CancellationToken cancellationToken) {
        throw new NotImplementedException();
    }

    public async Task<Result<IEnumerable<TimeShift>>> ListAsync(
        ISpecification<TimeShift>? spec,
        CancellationToken cancellationToken
    ) {

        if (spec is null) {
            return await _timeShifts.ToListAsync(cancellationToken);
        }

        throw new NotImplementedException();
    }

    public async Task<Result<TimeShift>> UpdateAsync(
        TimeShift entity,
        CancellationToken cancellationToken
    ) {
        _timeShifts.Update(entity);
        return await Task.FromResult(entity);
    }

    public async Task<bool> SaveChangesAsync(CancellationToken cancellationToken) {
        //TODO
        //track if all changes succed
        return await _dbContext.SaveChangesAsync(cancellationToken) > 0;
    }
}
