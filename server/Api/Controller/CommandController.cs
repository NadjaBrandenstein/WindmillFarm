using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Mqtt.Controllers;

namespace Api.Controller;

[ApiController]
[Route("api/[controller]")]
public class CommandController(IMqttClientService mqtt) : ControllerBase
{
    [HttpPost("{turbineId}/command")]
    public async Task SendCommand(string turbineId, [FromBody] JsonElement command)
    {
        await mqtt.PublishAsync($"farm/EB_Windmill/windmill/{{turbineId}}/command",
            command.GetRawText());
    }
    
}