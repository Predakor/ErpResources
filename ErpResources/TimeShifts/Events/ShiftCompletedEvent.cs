using Core.Abstractions.Events;

namespace Gateway.TimeShifts.Events;

internal record ShiftCompletedEvent(Guid ShiftId) : AppEvent;
