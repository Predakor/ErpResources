using System.Linq.Expressions;

namespace Core.Abstractions;

public interface ISpecification<T> {
    Expression<Func<T, bool>> Criteria { get; }
}