namespace Core.Abstractions;
public interface IUserContext {
    Guid Id { get; }
    IEnumerable<string> Roles { get; }
}
