using Core.Entities;
using Gateway.Employes;
using Gateway.Payrolls.Events;
using Gateway.TimeShifts;

namespace Gateway.Payrolls;

internal class Payroll : AggregateRoot {
    const short FullTimeMonth = 168;

    public DateOnly Month { get; private set; }
    public PayrollStatus Status { get; private set; }

    public DateTime CalculatedAt { get; private set; }
    public DateTime ApprovedAt { get; private set; }
    public DateTime SentAt { get; private set; }

    public decimal GrossSalary { get; private set; }
    public decimal NetSalary { get; private set; }
    public Guid AproverId { get; private set; }
    public Guid EmployeId { get; private set; }

    public Employe? AprovedBy { get; private set; }
    public Employe Employe { get; private set; } = default!;


    public Payroll(Employe employe, DateOnly? time = null) {
        Employe = employe;
        EmployeId = employe.Id;
        Month = time ?? DateOnly.FromDateTime(DateTime.UtcNow);
        Status = PayrollStatus.Initial;
    }

    public Payroll Calculate(ICollection<TimeShift> shifts) {
        var totalHours = (decimal)shifts.Sum(s => s.Duration);
        var hourlyRate = Employe.Salary / FullTimeMonth;
        GrossSalary = Math.Round(totalHours * hourlyRate, 2);
        Status = PayrollStatus.Calculating;

        return this;
    }

    public Payroll CalculateNetSallary() {
        NetSalary = GrossSalary * (decimal)0.8d;
        return this;
    }

    public Payroll EditPay(decimal newPay) {
        GrossSalary = newPay;
        return this;
    }

    public Payroll Aprove(Guid aproverId) {
        if (Status != PayrollStatus.Calculating) {
            throw new ArgumentException("Only Calculated Payrols can be aproved");
        }

        AproverId = aproverId;
        ApprovedAt = DateTime.UtcNow;
        Status = PayrollStatus.Aproved;
        AddEvent(new PayrolAprovedEvent(Id, EmployeId, aproverId));
        return this;
    }

    public Payroll Send(DateTime? time = null) {
        if (Status != PayrollStatus.Aproved) {
            throw new ArgumentException("Only Aproved payrols can be send");
        }

        SentAt = time ?? DateTime.UtcNow;
        Status = PayrollStatus.Sent;
        AddEvent(new PayrolSentEvent(Id, EmployeId, NetSalary));
        return this;
    }
}

internal enum PayrollStatus {
    Initial,
    Calculating,
    Aproved,
    Sent,
    Finished,
}
