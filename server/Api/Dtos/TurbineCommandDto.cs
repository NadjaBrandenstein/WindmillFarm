public class TurbineCommandDto
{
    public string Action { get; set; } = null!;

    public int? Value { get; set; }      // setInterval
    public string? Reason { get; set; }  // stop
    public double? Angle { get; set; }   // setPitch
}