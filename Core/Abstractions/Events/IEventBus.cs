namespace Core.Abstractions.Events;

public interface IEventBus {
    Task PublishAsync<TEvent>(TEvent @event, CancellationToken cancellationToken = default)
        where TEvent : IEvent;
    Task PublishAsync<TEvent>(
        IEnumerable<TEvent> @events,
        CancellationToken cancellationToken = default
    )
        where TEvent : IEvent;
}
