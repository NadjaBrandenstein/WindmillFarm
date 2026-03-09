using System.Text.Json;
using DataAccess.Entity;
using DataAccess.MyDbContext;
using Microsoft.EntityFrameworkCore;
using Mqtt.Controllers;

public interface ICommandService
{
    Task SendCommandAsync(string turbineId, TurbineCommandDto command);
}