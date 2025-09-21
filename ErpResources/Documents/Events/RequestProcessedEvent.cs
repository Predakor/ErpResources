using Core.Abstractions.Events;

namespace Gateway.Documents.Events;

internal sealed record RequestProcessedEvent(Guid DocumentId, DocumentDecision Decision) : AppEvent;
