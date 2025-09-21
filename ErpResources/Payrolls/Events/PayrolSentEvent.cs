using Core.Abstractions.Events;

namespace Gateway.Payrolls.Events;

internal sealed record PayrolSentEvent(Guid PayrolId, Guid EmployeId, decimal NetAmount) : AppEvent;

