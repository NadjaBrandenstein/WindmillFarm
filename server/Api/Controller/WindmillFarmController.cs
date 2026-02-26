using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Mqtt.Controllers;

namespace Api.Controller;

public class WindmillFarmController(ILogger<WindmillFarmController> logger) 
    : MqttController
{
    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/telemetry")]
    public async Task HandleTelemetry(string turbineId, TurbineTelemetry telemetryData)
    {
        logger.LogInformation($"Turbine: {turbineId}, TelemetryData: {JsonSerializer.Serialize(telemetryData)}");
        
    }
    
}

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