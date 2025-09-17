using Core.Abstractions;

namespace Core.Validators.Rules;

internal class NotDefualtRule<T>(T value) : IRule {
    public string Name => "Invalid value";

    public string Message => "Value cannot be null";

    public async Task<Result<bool>> Check() {
        if (EqualityComparer<T>.Default.Equals(value, default!)) {
            return AppError.RuleViolation(this);
        }

        return await Task.FromResult(true);
    }
}
