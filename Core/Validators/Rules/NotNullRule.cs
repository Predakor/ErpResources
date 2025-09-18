using Core.Abstractions;

namespace Core.Validators.Rules;

internal sealed class NotNullRule<T>(T value) : IRule {
    public string Name => "Invalid value";

    public string Message => "Value cannot be null";


    public async Task<Result<bool>> Check() {
        if (value is null) {
            return AppError.RuleViolation(this);
        }

        return await Task.FromResult(true);
    }
}
