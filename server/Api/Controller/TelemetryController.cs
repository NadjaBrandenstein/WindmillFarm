using Api.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controller;


[ApiController]
[Route("api/[controller]")]
public class TelemetryController(TelemetryService telemetryService) : ControllerBase
{
    [HttpGet(nameof(GetRecent))]
    public IActionResult GetRecent()
    {
        return Ok(telemetryService.GetRecentReadings());
    }
    
    
    
}