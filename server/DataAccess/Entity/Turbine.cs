using System;
using System.Collections.Generic;

namespace DataAccess.Entity;

public partial class Turbine
{
    public int TurbineId { get; set; }

    public string TurbineName { get; set; } = null!;

    public int? FarmId { get; set; }

    public DateTime Timestamp { get; set; }

    public decimal? WindSpeed { get; set; }

    public decimal? WindDirection { get; set; }

    public decimal? AmbientTemp { get; set; }

    public decimal? RotorSpeed { get; set; }

    public decimal? PowerOutput { get; set; }

    public decimal? NacelleDirection { get; set; }

    public decimal? BladePitch { get; set; }

    public decimal? GeneratorTemp { get; set; }

    public decimal? GearboxTemp { get; set; }

    public decimal? Vibration { get; set; }

    public string? Status { get; set; }
}
