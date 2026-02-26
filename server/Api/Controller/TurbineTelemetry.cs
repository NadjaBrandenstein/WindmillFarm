namespace Api.Controller;

public record TurbineTelemetry(
    string TurbineId,
    string TurbineName,
    string FarmId,
    DateTime Timestamp,
    decimal WindSpeed,
    decimal WindDirection,
    decimal AmbientTemperature, // <-- Changed this from AmbientTemp!
    decimal RotorSpeed,
    decimal PowerOutput,
    decimal NacelleDirection,
    decimal BladePitch,
    decimal GeneratorTemp,
    decimal GearboxTemp,
    decimal Vibration,
    string Status
);