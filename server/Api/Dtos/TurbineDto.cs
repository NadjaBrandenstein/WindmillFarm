using api.Dtos;

namespace Api.Controller;

public record TurbineDto(
    Guid Id,
    string TurbineId,
    string TurbineName,
    string FarmId,
    DateTime Timestamp,
    decimal WindSpeed,
    decimal WindDirection,
    decimal AmbientTemperature,
    decimal RotorSpeed,
    decimal PowerOutput,
    decimal NacelleDirection,
    decimal BladePitch,
    decimal GeneratorTemp,
    decimal GearboxTemp,
    decimal Vibration,
    string Status
): ITurbineEvent;