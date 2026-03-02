namespace api.Dtos;

public record AlertsDto (
    string TurbineId,
    string FarmId,
    DateTime Timestamp,
    string severity,
    string message
    ): ITurbineEvent;