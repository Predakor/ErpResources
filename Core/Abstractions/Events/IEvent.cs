namespace Core.Abstractions.Events;

public interface IEvent {
    DateTime OccuredOn { get; }
}

public interface IDomainEvent : IEvent;

public interface IIntegrationEvent : IEvent {
    Guid Id { get; }
}
