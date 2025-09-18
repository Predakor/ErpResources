namespace Core.Abstractions.Events;

public abstract record AppEvent : IEvent {
    public DateTime OccuredOn { get; init; } = DateTime.UtcNow;
}
