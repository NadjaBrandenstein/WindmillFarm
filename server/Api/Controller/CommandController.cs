using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CommandController(
    ICommandService service)
    : ControllerBase
{
    [HttpPost("{turbineId}")]
    public async Task<IActionResult> SendCommand(
        string turbineId,
        [FromBody] TurbineCommandDto command)
    {
        try
        {
            await service.SendCommandAsync(turbineId, command);
            return Ok(new { message = "Command sent successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = ex.Message,
                stackTrace = ex.StackTrace
            });
        }
    }
}