using System;
using System.Collections.Generic;

namespace DataAccess.Entity;

public partial class User
{
    public int UserId { get; set; }

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public int RoleId { get; set; }

    public virtual ICollection<Login> Logins { get; set; } = new List<Login>();

    public virtual Role Role { get; set; } = null!;
}
