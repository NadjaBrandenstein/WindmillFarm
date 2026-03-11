using System;
using System.Collections.Generic;

namespace DataAccess.Entity;

public partial class Turbinetelemetry
{
    public int Id { get; set; }

    public string? TurbineId { get; set; }

    public string TurbineName { get; set; } = null!;

    public string? FarmId { get; set; }

    public DateTime Timestamp { get; set; }

    public decimal? WindSpeed { get; set; }

    public decimal? WindDirection { get; set; }

    public decimal? AmbientTemperature { get; set; }

    public decimal? RotorSpeed { get; set; }

    public decimal? PowerOutput { get; set; }

    public decimal? NacelleDirection { get; set; }

    public decimal? BladePitch { get; set; }

    public decimal? GeneratorTemp { get; set; }

    public decimal? GearboxTemp { get; set; }

    public decimal? Vibration { get; set; }

    public string? Status { get; set; }
}
