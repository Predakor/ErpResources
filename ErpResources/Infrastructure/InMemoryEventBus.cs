using Core.Abstractions.Events;

namespace Gateway.Infrastructure;

internal class InMemoryEventBus : IEventBus {
    public Task PublishAsync<TEvent>(TEvent @event, CancellationToken cancellationToken = default)
        where TEvent : IEvent {
        throw new NotImplementedException();
    }

    public Task PublishAsync<TEvent>(
        IEnumerable<TEvent> events,
        CancellationToken cancellationToken = default
    )
        where TEvent : IEvent {
        throw new NotImplementedException();
    }
}
