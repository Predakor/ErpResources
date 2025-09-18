using Core.Abstractions.Events;

namespace Gateway.TimeShifts.Events;

internal record ShiftCanceledEvent(Guid ShiftId, string reason) : AppEvent;
