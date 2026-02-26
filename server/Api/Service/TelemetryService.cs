using System.Collections.Concurrent;
using Api.Controller;

namespace Api.Service;

public class TelemetryService
{
    private readonly ConcurrentQueue<TurbineTelemetry> _readings = new();
    private const int MaxReadings = 50;

    public void AddReading(TurbineTelemetry telemetry)
    {
        _readings.Enqueue(telemetry);

        if (_readings.Count > MaxReadings)
        {
            _readings.TryDequeue(out _);
        }
    }
    
    public IEnumerable<TurbineTelemetry> GetRecentReadings()
    {
        return _readings.ToArray();
    }
}