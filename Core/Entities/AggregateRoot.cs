namespace Core.Entities;

public interface IAggregateRoot {
    IReadOnlyCollection<IEvent> Events { get; }
    void ClearEvents();
}

public abstract class AggregateRoot : Entity, IAggregateRoot {
    readonly List<IEvent> _domainEvents = new();
    public IReadOnlyCollection<IEvent> Events => _domainEvents.AsReadOnly();

    protected void AddEvent(IEvent @event) => _domainEvents.Add(@event);

    public void ClearEvents() => _domainEvents.Clear();
}
