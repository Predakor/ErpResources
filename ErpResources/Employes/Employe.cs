using Gateway.TimeShifts;

namespace Gateway.Employes;

internal class Employe {
    public string Position { get; protected set; }
    public decimal Salary { get; protected set; }
    public DateTime HireDate { get; protected set; }
    public short HolidaysPerYear { get; protected set; }
    public short HolidaysLeft { get; protected set; }
    public ContractType Contract { get; protected set; }

    public ICollection<TimeShift> Shifts { get; protected set; } = new List<TimeShift>();

    public Employe ChangePosition(string newPosition) {
        Position = newPosition;
        return this;
    }

    public Employe ChangeSalary(decimal newSalary) {
        Salary = Math.Max(newSalary, 0);
        return this;
    }

    public Employe ChangeContract(ContractType newContract) {
        if (newContract != Contract) {
            Contract = newContract;
        }

        return this;
    }
}

internal enum ContractType {
    None,
    Employment,
    Mandate,
    B2B,
    Contract,
    Retired,
}
