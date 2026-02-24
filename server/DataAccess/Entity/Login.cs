using System;
using System.Collections.Generic;

namespace DataAccess.Entity;

public partial class Login
{
    public int LoginId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int RoleId { get; set; }

    public int UserId { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
