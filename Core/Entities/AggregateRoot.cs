namespace Core.Entities;

public abstract class AggregateRoot : Entity {
    private readonly List<IEvent> _domainEvents = new();
    public IReadOnlyCollection<IEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void AddDomainEvent(IEvent @event) => _domainEvents.Add(@event);

    public void ClearDomainEvents() => _domainEvents.Clear();
}
