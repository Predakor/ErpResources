using Core.Abstractions.Events;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Gateway.Entities;

internal class AppUser : IdentityUser<Guid>, IAggregateRoot, IEntity {

    readonly List<IEvent> _domainEvents = new();
    public IReadOnlyCollection<IEvent> Events => _domainEvents.AsReadOnly();


    protected void AddDomainEvent(IEvent @event) => _domainEvents.Add(@event);
    public void ClearEvents() => _domainEvents.Clear();
}
