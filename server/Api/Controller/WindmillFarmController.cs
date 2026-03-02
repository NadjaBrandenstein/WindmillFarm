using System.Text.Json;
using api.Dtos;
using Api.Service;
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
        telemetryService.AddReadingTelemetry(telemetryData);
        logger.LogInformation($"Turbine: {turbineId}, " +
                              $"TelemetryData: {JsonSerializer.Serialize(new
                              {
                                  telemetryData.TurbineId,
                                  telemetryData.TurbineName,
                                  telemetryData.FarmId,
                                  telemetryData.Timestamp,
                                  telemetryData.WindSpeed,
                                  telemetryData.WindDirection,
                                  telemetryData.AmbientTemperature,
                                  telemetryData.RotorSpeed,
                                  telemetryData.PowerOutput,
                                  telemetryData.NacelleDirection,
                                  telemetryData.BladePitch,
                                  telemetryData.GeneratorTemp,
                                  telemetryData.GearboxTemp,
                                  telemetryData.Vibration,
                                  telemetryData.Status,
                                   })}");
        
    }
    
    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/alert")]
    public async Task HandleAlerts(string turbineId, AlertsDto alerts)
    {
        telemetryService.AddReadingAlert(alerts);
        logger.LogInformation($"Turbine: {turbineId}, " +
                              $"Alerts: {JsonSerializer.Serialize(
                                  new
                                  {
                                      alerts.TurbineId,
                                      alerts.FarmId,
                                      alerts.Timestamp,
                                      alerts.severity,
                                      alerts.message
                                  })}");
    }
}