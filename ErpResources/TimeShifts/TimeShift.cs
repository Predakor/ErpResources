using Core.Entities;
using Gateway.Entities;
using Gateway.TimeShifts.Events;

namespace Gateway.TimeShifts;

internal class TimeShift : AggregateRoot {
    public Guid EmplyoerId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public TimeSpan Breakes { get; set; }
    public TimeShiftStatus Status { get; set; }

    //Nav props
    public AppUser? Emplyoer { get; set; }

    public TimeShift(Guid emplyoerId, DateTime startTime, DateTime endTime) {
        EmplyoerId = emplyoerId;
        StartTime = startTime;
        EndTime = endTime;
        Status = TimeShiftStatus.Initial;
    }

    public void Schedule() {
        Status = TimeShiftStatus.Scheduled;
        AddEvent(new ShiftScheduledEvent(Id));
    }

    public void Complete() {
        Status = TimeShiftStatus.Completed;
        AddEvent(new ShiftCompletedEvent(Id));
    }

    public void Cancel(string reason) {
        Status = TimeShiftStatus.Canceled;
        AddEvent(new ShiftCanceledEvent(Id, reason));
    }

    public TimeSpan Duration => StartTime - EndTime;
}

enum TimeShiftStatus {
    Initial,
    Scheduled,
    Completed,
    Canceled,
}
