using System.Text.Json;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Microsoft.EntityFrameworkCore;
using Mqtt.Controllers;


public class CommandService (
    IMqttClientService mqtt,
    MyDbContext ctx)
    : ICommandService
{
    public async Task SendCommandAsync(string turbineId, TurbineCommandDto command)
    {
        var exists = await ctx.Turbineregistries
            .AnyAsync(t => t.TurbineId == turbineId);

        if (!exists)
            throw new Exception("Turbine not found");
        
        ValidateCommand(command);
        
        var topic = $"farm/EB_Windmill/windmill/{turbineId}/command";

        var payload = JsonSerializer.Serialize(command);
        
        await mqtt.PublishAsync(topic, payload);
        
        var log = new AlertCommand
        {
            Name = command.Action,
            Timestamp = DateTime.Now,
            Description = payload
        };

        ctx.AlertCommands.Add(log);
        await ctx.SaveChangesAsync();
    }

    private void ValidateCommand(TurbineCommandDto command)
    {
        switch (command.Action?.ToLower())
        {
            case "setinterval":
                if (command.Value is null or < 1 or > 60)
                    throw new Exception("Value must be between 1-60");
                break;

            case "setbladepitch":
                if (command.Angle is null or < 0 or > 30)
                    throw new Exception("Angle must be between 0-30");
                break;

            case "stop":
                break;

            case "start":
                break;

            default:
                throw new Exception("Unknown action");
        }
    }
}