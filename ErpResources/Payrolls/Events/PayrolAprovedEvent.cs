using Core.Abstractions.Events;

namespace Gateway.Payrolls.Events;

internal sealed record PayrolAprovedEvent(Guid PayrolId, Guid EmployeId, Guid AproverId) : AppEvent;

