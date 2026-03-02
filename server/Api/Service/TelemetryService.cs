using System.Collections.Concurrent;
using Api.Controller;
using api.Dtos;

namespace Api.Service;

public class TelemetryService
{
    private readonly ConcurrentQueue<ITurbineEvent> _readings = new();
    
    private const int MaxReadings = 50;

    public void AddReadingTelemetry(TurbineTelemetry telemetry)
    {
        _readings.Enqueue(telemetry);

        if (_readings.Count > MaxReadings)
        {
            _readings.TryDequeue(out _);
        }
    }
    public void AddReadingAlert(AlertsDto alerts)
    {
        _readings.Enqueue(alerts);

        if (_readings.Count > MaxReadings)
        {
            _readings.TryDequeue(out _);
        }
    }
    
    public IEnumerable<ITurbineEvent> GetRecentReadings()
    {
        return _readings.ToArray();
    }
}