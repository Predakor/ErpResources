using Core.Entities;
using Gateway.Employes;

namespace Gateway.Payrolls;

internal class Payroll : AggregateRoot {
    public DateOnly Month { get; private set; }
    public PayrollStatus Status { get; private set; }

    public DateTime CalculatedAt { get; private set; }
    public DateTime AprovedAt { get; private set; }
    public DateTime SendAt { get; private set; }

    public decimal GrossSalary { get; private set; }
    public decimal NetSalary { get; private set; }
    public Guid AproverId { get; private set; }
    public Guid EmployeID { get; private set; }

    public Employe? AprovedBy { get; private set; }
    public Employe? Employe { get; private set; }
}

internal enum PayrollStatus {
    Initial,
    Calculating,
    Pending,
    Finished,
}