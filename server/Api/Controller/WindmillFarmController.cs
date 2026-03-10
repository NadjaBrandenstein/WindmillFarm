using System.Text.Json;
using api.Dtos;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Microsoft.EntityFrameworkCore;
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
        
        var exists = await ctx.Turbineregistries
            .AnyAsync(t => t.TurbineId == turbineId);

        if (!exists)
        {
            var registry = new Turbineregistry()
            {
                TurbineId = turbineId,
                TurbineName = turbineId,
                FarmId = dtoData.FarmId,
            };
            ctx.Turbineregistries.Add(registry);
        }
        
        ctx.Turbinetelemetries.Add(dtoData);
        await ctx.SaveChangesAsync();
    }
    
    [MqttRoute("farm/EB_Windmill/windmill/{turbineId}/alert")]
    public async Task HandleAlerts(string turbineId, AlertsDto alerts)
    {
        logger.LogInformation($"Turbine: {turbineId}, Alerts: {alerts.severity} - {alerts.message} ");

        var alertEntity = new AlertCommand()
        {
            TurbineId = turbineId,
            Name = alerts.severity,
            Timestamp = DateTime.SpecifyKind(alerts.Timestamp, DateTimeKind.Unspecified),
            Description = alerts.message
        };

        ctx.AlertCommands.Add(alertEntity);
        await ctx.SaveChangesAsync();

    }
}