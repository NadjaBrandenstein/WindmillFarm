using System.Text.Json;
using api.Dtos;
using Api.Service;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Mqtt.Controllers;

namespace Api.Controller;

public class WindmillFarmController(
    ILogger<WindmillFarmController> logger,
    TelemetryService telemetryService, MyDbContext ctx
    ) 
    : MqttController
{
    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/telemetry")]
    public async Task HandleTelemetry(string turbineId, TurbineDto dtoData)
    {
        telemetryService.AddReadingTelemetry(dtoData);
        
        logger.LogInformation($"Turbine: {turbineId}, Telemetry received");

        var turbineEntity = new Turbinetelemetry()
        {
            TurbineId = dtoData.TurbineId,
            TurbineName = dtoData.TurbineName,
            FarmId = dtoData.FarmId,
            Timestamp = dtoData.Timestamp,
            WindSpeed = dtoData.WindSpeed,
            WindDirection = dtoData.WindDirection,
            AmbientTemp = dtoData.AmbientTemperature,
            RotorSpeed = dtoData.RotorSpeed,
            PowerOutput = dtoData.PowerOutput,
            NacelleDirection = dtoData.NacelleDirection,
            BladePitch = dtoData.BladePitch,
            GeneratorTemp = dtoData.GeneratorTemp,
            GearboxTemp = dtoData.GearboxTemp,
            Vibration = dtoData.Vibration,
            Status = dtoData.Status
        };
        
        ctx.Turbinetelemetries.Add(turbineEntity);
        await ctx.SaveChangesAsync();
        
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