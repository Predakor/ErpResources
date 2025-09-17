using Core.Abstractions;

namespace Core.Results;

public sealed record AppError(ErrorCode Code, string Message) {
    public static AppError Unknown(string? message = null) =>
        new(ErrorCode.Unknown, message ?? "Something went wrong.");

    public static AppError DbError(string message = "A database error occurred.") =>
        new(ErrorCode.DbError, message);

    //Bad Requests
    public static AppError NotFound<T>(
        string resourceName,
        T filterValue,
        string filterName = "id"
    ) => new(ErrorCode.NotFound, $"{resourceName} with {filterName}: {filterValue}");

    public static AppError BadRequest(string message) => new(ErrorCode.BadRequest, message);

    public static AppError EmptyCollection(string context = "Collection") =>
        new(ErrorCode.EmptyCollection, $"{context} is empty.");

    public static AppError RuleViolation(IRule rule) {
        ArgumentNullException.ThrowIfNull(rule);
        return new(ErrorCode.RuleViolation, $"{rule.Name}: {rule.Message}");
    }

    public static AppError NotUnique(string itemName) =>
        new(ErrorCode.NotUnique, $"{itemName} already exists.");

    //Auth
    public static AppError NotAuthorized() =>
        new(ErrorCode.NotAuthorized, "You're not authorized. Please log in.");

    public static AppError InvalidCredentials() =>
        new(ErrorCode.InvalidCredentials, "Invalid login or password.");
}

public enum ErrorCode {
    NotFound,
    BadRequest,
    DbError,
    EmptyCollection,
    Unknown,
    File,
    RuleViolation,
    NotAuthorized,
    InvalidCredentials,
    NotUnique,
}
