namespace api.Dtos;

public interface ITurbineEvent
{
    string TurbineId { get; }
    DateTime Timestamp { get; }
}