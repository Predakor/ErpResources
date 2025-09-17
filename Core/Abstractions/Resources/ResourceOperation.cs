namespace Core.Abstractions.Resources;

public sealed record ResourceOperation<TResource>(
    Guid RequesterId,
    Guid ResourceId,
    ResourceAction Action,
    ResourceType Type
);

public enum ResourceAction {
    View,
    Update,
    Delete,
    Approve,
    Reject,
    Submit,
}

public enum ResourceType {
    Employee,
    Document,
    WorkSchedule,
    InventoryItem,
}
