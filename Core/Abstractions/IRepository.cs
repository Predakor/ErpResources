using Core.Entities;

namespace Core.Abstractions;

public interface IRepository<T>
    where T : AggregateRoot {
    Task<Result<T>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result<T>> AddAsync(T entity, CancellationToken cancellationToken = default);
    Task<Result<T>> UpdateAsync(T entity, CancellationToken cancellationToken = default);
    Task<Result<T>> DeleteAsync(
        T entity,
        bool hardDelete = false,
        CancellationToken cancellationToken = default
    );
    Task<Result<IEnumerable<T>>> ListAsync(
        ISpecification<T>? spec = null,
        CancellationToken cancellationToken = default
    );
}
