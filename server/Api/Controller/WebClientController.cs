using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Mqtt.Controllers;

namespace Api.Controller;

[ApiController]
[Route("api/[controller]")]
public class WebClientController(IMqttClientService mqtt) : ControllerBase
{
    [HttpPost("{turbineId}/command")]
    public async Task SendCommand(string turbineId, [FromBody] JsonElement command)
    {
        await mqtt.PublishAsync($"farm/88ce66f0-6571-4b46-93ca-0cd71b376a33/windmill/{turbineId}/command",
            command.GetRawText());
    }
    
}