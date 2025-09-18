using Gateway.TimeShifts;
using Gateway.TimeShifts.Events;

namespace ErpResources.Tests.TimeShifts;

public class ShiftTests {
    Guid employeeId = Guid.NewGuid();

    [Fact]
    public void SchedulingShift_ShouldRaiseShiftScheduledEvent() {
        // Arrange
        var startTime = DateTime.UtcNow.AddHours(1);
        var endTime = startTime.AddHours(8);

        var shift = new TimeShift(employeeId, startTime, endTime);

        shift.Events.Should().ContainSingle().Which.Should().BeOfType<ShiftScheduledEvent>();

        var @event = (ShiftScheduledEvent)shift.Events.First();
        @event.ShiftId.Should().Be(shift.Id);
    }

    [Fact]
    public void CompletingShift_ShouldRaiseShiftCompletedEvent() {
        var shift = new TimeShift(employeeId, DateTime.UtcNow.AddHours(-8), DateTime.UtcNow);

        shift.Complete();

        shift.Events.Should().ContainSingle(e => e is ShiftCompletedEvent);
        var completedEvent = shift.Events.OfType<ShiftCompletedEvent>().First();
        completedEvent.ShiftId.Should().Be(shift.Id);
    }

    [Fact]
    public void CancelingShift_ShouldRaiseShiftCanceledEvent() {
        var shift = new TimeShift(employeeId, DateTime.UtcNow, DateTime.UtcNow.AddHours(8));

        shift.Cancel("Employee requested");

        shift.Events.Should().ContainSingle(e => e is ShiftCanceledEvent);
        var canceledEvent = shift.Events.OfType<ShiftCanceledEvent>().First();
        canceledEvent.ShiftId.Should().Be(shift.Id);
        canceledEvent.reason.Should().Be("Employee requested");
    }
}
