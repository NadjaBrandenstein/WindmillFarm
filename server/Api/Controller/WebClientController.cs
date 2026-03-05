using System.Reflection;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Microsoft.AspNetCore.Mvc;
using StateleSSE.AspNetCore;
using StateleSSE.AspNetCore.EfRealtime;
using StateleSSE.AspNetCore.GroupRealtime;

namespace Api.Controller;

public class WebClientController(
    ISseBackplane backplane,
    IRealtimeManager realtimeManager,
    MyDbContext ctx,
    IGroupRealtimeManager groupRealtimeManager) : RealtimeControllerBase(backplane)
{
    [HttpGet(nameof(GetMeasurements))]
    public async Task<RealtimeListenResponse<List<Turbinetelemetry>>> GetMeasurements(string connectionId)
    {
        var group = "Turbinetelemetries";
        await backplane.Groups.AddToGroupAsync(connectionId, group);
        realtimeManager.Subscribe<MyDbContext>(connectionId, group,
            criteria: snapshot =>
            {
                return snapshot.HasChanges<Turbinetelemetry>();
            },
            query: async context =>
            {
                return ctx.Turbinetelemetries.ToList();
            }
            );
        return new RealtimeListenResponse<List<Turbinetelemetry>>(group, ctx.Turbinetelemetries.ToList());
    }
}