using System.Diagnostics.CodeAnalysis;

namespace Core.Results;

#pragma warning disable CA1000 // Do not declare static members on generic types

public class Result<TResult> {
    public TResult? Value { get; }
    public AppError? Error { get; }
    public bool IsSuccess => Error is null;

    protected Result(AppError error) {
        Error = error;
        Value = default;
    }

    protected Result(TResult value) {
        Value = value;
        Error = default;
    }

    public static Result<TResult> Success(TResult value) => new(value);

    public static Result<TResult> Failure(AppError error) => new(error);

    public static Result<TResult> FromTResult(TResult value) => Success(value);

    public static Result<TResult> FromAppError(AppError error) => Failure(error);

    public static implicit operator Result<TResult>(TResult value) => Success(value);

    public static implicit operator Result<TResult>(AppError Error) => Failure(Error);

    public bool HasErrors([NotNullWhen(true)] out AppError? error) {
        if (Error is not null) {
            error = Error!;
            return true;
        }
        error = null;
        return false;
    }

    [SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "<Pending>")]
    public TReturn Match<TReturn>(
        Func<TResult, TReturn> onSuccess,
        Func<AppError, TReturn> onFailure
    ) {
        if (!IsSuccess || Value is null) {
            return onFailure(Error!);
        }

        return onSuccess(Value);
    }
}


#pragma warning restore CA1000 // Do not declare static members on generic types
