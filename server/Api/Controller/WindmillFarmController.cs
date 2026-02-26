using System.Text.Json;
using Mqtt.Controllers;

namespace Api.Controller;

public class WindmillFarmController(ILogger<WindmillFarmController> logger) 
    : MqttController
{
    [MqttRoute("farm/+/windmill/{turbineId}/telemetry")]
    public async Task HandleTelemetry(string turbineId, TurbineTelemetry telemetryData)
    {
        logger.LogInformation("Turbine: "+turbineId+", telemetryData: "+JsonSerializer.Serialize(telemetryData));
        
    }
    
}

public abstract record TurbineTelemetry(
    int TurbineId,
    string TurbineName,
    int FarmId,
    DateTime Timestamp,
    decimal WindSpeed,
    decimal WindDirection,
    decimal AmbientTemp,
    decimal RotorSpeed,
    decimal PowerOutput,
    decimal NacelleDirection,
    decimal BladePitch,
    decimal GeneratorTemp,
    decimal GearboxTemp,
    decimal Vibration,
    string Status
    
    );