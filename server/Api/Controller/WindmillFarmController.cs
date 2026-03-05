using System.Text.Json;
using api.Dtos;
using Api.Service;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Microsoft.EntityFrameworkCore;
using Mqtt.Controllers;

namespace Api.Controller;

public class WindmillFarmController(
    ILogger<WindmillFarmController> logger, MyDbContext ctx
    ) 
    : MqttController
{

    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/telemetry")]
    public async Task HandleTelemetry(string turbineId, Turbinetelemetry dtoData)
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