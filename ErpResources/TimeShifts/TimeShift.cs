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
        if (startTime > endTime) {
            throw new ArgumentException("end time can't be greater than start time");
        }

        EmplyoerId = emplyoerId;
        StartTime = startTime;
        EndTime = endTime;
        Status = TimeShiftStatus.Initial;
    }

    public TimeShift Schedule() {
        Status = TimeShiftStatus.Scheduled;
        AddEvent(new ShiftScheduledEvent(Id));
        return this;
    }

    public TimeShift Complete() {
        Status = TimeShiftStatus.Completed;
        AddEvent(new ShiftCompletedEvent(Id));
        return this;
    }

    public TimeShift Cancel(string reason) {
        Status = TimeShiftStatus.Canceled;
        AddEvent(new ShiftCanceledEvent(Id, reason));
        return this;
    }

    public decimal Duration => (EndTime - StartTime).ToTotalHoursRounded();
}

enum TimeShiftStatus {
    Initial,
    Scheduled,
    Completed,
    Canceled,
}
