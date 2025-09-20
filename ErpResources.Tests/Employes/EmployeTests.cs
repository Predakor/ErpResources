using Gateway.Employes;

namespace ErpResources.Tests.Employes;

public class EmployeTests {
    [Fact]
    public void IncreasingSalary_Should_IncreaseSalary() {
        var employe = new Employe();
        employe.ChangeSalary(4600);
        employe.Salary.Should().Be(4600);
    }

    [Fact]
    public void SettingSalaryBelowZero_ShouldNot_ChangeSalary() {
        var employe = new Employe();
        employe.ChangeSalary(-10);
        employe.Salary.Should().Be(0);
    }


    [Fact]
    public void ChangingPosition_Should_ChangePosition() {
        const string position = "HR";
        var employe = new Employe();

        employe.ChangePosition(position);
        employe.Position.Should().Be(position);
    }

    [Fact]
    public void ChangingContractType_Should_ChangeContract() {
        var employe = new Employe();
        employe.ChangeContract(ContractType.Employment);
        employe.Contract.Should().Be(ContractType.Employment);
    }
}
