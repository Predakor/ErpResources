namespace Core.Extentions;

public static class TimeSpanExtentions {
    public static decimal ToTotalHoursRounded(this TimeSpan timeSpan, int decimals = 2) {
        return (decimal)Math.Abs(Math.Round(timeSpan.TotalHours, decimals));
    }
}
