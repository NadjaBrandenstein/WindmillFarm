using System.Text.Json;
using api.Dtos;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Mqtt.Controllers;
using StateleSSE.AspNetCore.EfRealtime;

namespace Api.Controller;

public class WindmillFarmController(
    ILogger<WindmillFarmController> logger, 
    MyDbContext ctx,
    IRealtimeManager  realtimeManager
    ) 
    : MqttController
{

    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/telemetry")]
    public async Task SaveTelemetry(string turbineId, Turbinetelemetry dtoData)
    {
        logger.LogInformation(JsonSerializer.Serialize(dtoData));
        dtoData.TurbineId = turbineId;
        ctx.Turbinetelemetries.Add(dtoData);
        await ctx.SaveChangesAsync();
    }
    
    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/alert")]
    public async Task HandleAlerts(string turbineId, AlertsDto alerts)
    {
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