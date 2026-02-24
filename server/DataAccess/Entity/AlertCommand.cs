using System;
using System.Collections.Generic;

namespace DataAccess.Entity;

public partial class AlertCommand
{
    public int AlertId { get; set; }

    public string Name { get; set; } = null!;

    public DateTime Timestamp { get; set; }

    public string? Description { get; set; }
}
