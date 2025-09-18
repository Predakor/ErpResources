using Core.Abstractions.Events;

namespace Gateway.TimeShifts.Events;

internal record ShiftScheduledEvent(Guid ShiftId) : AppEvent;
