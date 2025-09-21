using Gateway.Employes;
using Gateway.Payrolls;
using Gateway.Payrolls.Events;
using Gateway.TimeShifts;

namespace ErpResources.Tests.Payrolls;

public class PayrollTests {
    const decimal MockupSalary = 4000;
    static Employe employe = new Employe().ChangeSalary(MockupSalary);
    static DateTime Today => DateTime.Now;
    static TimeShift[] mockShifts =>
        [
            new(employe.Id, Today, Today + TimeSpan.FromHours(8)),
            new(employe.Id, Today.AddDays(1), Today.AddDays(1).AddHours(8)),
        ];

    static TimeShift[] FullTimeShifts = Enumerable
        .Range(0, 21)
        .Select(i => new TimeShift(employe.Id, Today.AddDays(i), Today.AddDays(i).AddHours(8)))
        .ToArray();

    [Fact]
    public void CalculatingPayrol_Should_SetStatusAndSalary() {
        var payrol = new Payroll(employe).Calculate(FullTimeShifts);
        payrol.GrossSalary.Should().Be(MockupSalary);
    }

    [Fact]
    public void AprovingNotCalculatedPayrol_Should_Throw() {
        var payrol = new Payroll(employe);

        Action act = () => payrol.Aprove(Guid.NewGuid());

        act.Should().Throw();
    }

    [Fact]
    public void Aproving_Should_AproveAndEmitEvent() {
        var payrol = new Payroll(employe).Calculate(mockShifts).Aprove(Guid.NewGuid());

        payrol.Status.Should().Be(PayrollStatus.Aproved);
        payrol.Events.Should().HaveCount(1);
    }

    [Fact]
    public void SendingNotAproved_Should_Throw() {
        var payrol = new Payroll(employe).Calculate(mockShifts);

        Action act = () => payrol.Send();

        act.Should().Throw();
    }

    [Fact]
    public void SendingAproved_Should_ChangeStatusAndRaiseEvent() {
        var payroll = new Payroll(employe).Calculate(mockShifts).Aprove(Guid.NewGuid()).Send();

        payroll.Status.Should().Be(PayrollStatus.Sent);
        payroll.Events.Last().Should().BeOfType<PayrolSentEvent>();
    }
}
