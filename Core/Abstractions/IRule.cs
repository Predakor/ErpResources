namespace Core.Abstractions;

public interface IRule {
    string Name { get; }
    string Message { get; }
    Task<Result<bool>> Check();
}
