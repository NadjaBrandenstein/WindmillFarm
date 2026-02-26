using System.Text.Json;
using System.Text.Json.Serialization;
using Api.Service;
using Microsoft.AspNetCore.Mvc;
using Mqtt.Controllers;

namespace Api.Controller;

public class WindmillFarmController(
    ILogger<WindmillFarmController> logger,
    TelemetryService telemetryService
    ) 
    : MqttController
{
    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/telemetry")]
    public async Task HandleTelemetry(string turbineId, TurbineTelemetry telemetryData)
    {
        telemetryService.AddReading(telemetryData);
        logger.LogInformation($"Turbine: {turbineId}, TelemetryData: {JsonSerializer.Serialize(telemetryData.WindSpeed)}");
        
    }
    
    
    
    
}