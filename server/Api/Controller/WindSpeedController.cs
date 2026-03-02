using Api.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controller;

[ApiController]
[Route("api/[controller]")]
public class WindSpeedController(WindSpeedService windSpeedService) : ControllerBase
{
    [HttpGet(nameof(GetRecent))]
    public IActionResult GetRecent()
    {
        return Ok(windSpeedService.GetRecentReadings());
    }
}