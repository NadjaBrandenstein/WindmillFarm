namespace api.Dtos;

public record AlertsDto (
    string TurbineId,
    DateTime Timestamp,
    string severity,
    string message
    ): ITurbineEvent;