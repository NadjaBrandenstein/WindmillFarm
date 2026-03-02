using System;
using System.Collections.Generic;

namespace DataAccess.Entity;

public partial class Turbineregistry
{
    public int Id { get; set; }

    public string? TurbineId { get; set; }

    public string TurbineName { get; set; } = null!;

    public string? FarmId { get; set; }
}
