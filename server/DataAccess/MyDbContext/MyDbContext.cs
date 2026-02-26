using System;
using System.Collections.Generic;
using DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.MyDbContext;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AlertCommand> AlertCommands { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Turbine> Turbines { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AlertCommand>(entity =>
        {
            entity.HasKey(e => e.AlertId).HasName("alert_command_pkey");

            entity.ToTable("alert_command", "windmill");

            entity.Property(e => e.AlertId)
                .HasDefaultValueSql("nextval('alert_command_alert_id_seq'::regclass)")
                .HasColumnName("alert_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("timestamp");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.LoginId).HasName("login_pkey");

            entity.ToTable("login", "windmill");

            entity.HasIndex(e => e.Username, "login_username_key").IsUnique();

            entity.Property(e => e.LoginId)
                .HasDefaultValueSql("nextval('login_login_id_seq'::regclass)")
                .HasColumnName("login_id");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Username).HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fk_login_role");

            entity.HasOne(d => d.User).WithMany(p => p.Logins)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_login_user");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("role_pkey");

            entity.ToTable("role", "windmill");

            entity.Property(e => e.RoleId)
                .HasDefaultValueSql("nextval('role_role_id_seq'::regclass)")
                .HasColumnName("role_id");
            entity.Property(e => e.RoleName).HasColumnName("role_name");
        });

        modelBuilder.Entity<Turbine>(entity =>
        {
            entity.HasKey(e => e.TurbineId).HasName("turbine_pkey");

            entity.ToTable("turbine", "windmill");

            entity.Property(e => e.TurbineId)
                .HasDefaultValueSql("nextval('turbine_turbine_id_seq'::regclass)")
                .HasColumnName("turbine_id");
            entity.Property(e => e.AmbientTemp).HasColumnName("ambient_temp");
            entity.Property(e => e.BladePitch).HasColumnName("blade_pitch");
            entity.Property(e => e.FarmId).HasColumnName("farm_id");
            entity.Property(e => e.GearboxTemp).HasColumnName("gearbox_temp");
            entity.Property(e => e.GeneratorTemp).HasColumnName("generator_temp");
            entity.Property(e => e.NacelleDirection).HasColumnName("nacelle_direction");
            entity.Property(e => e.PowerOutput).HasColumnName("power_output");
            entity.Property(e => e.RotorSpeed).HasColumnName("rotor_speed");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("timestamp");
            entity.Property(e => e.TurbineName).HasColumnName("turbine_name");
            entity.Property(e => e.Vibration).HasColumnName("vibration");
            entity.Property(e => e.WindDirection).HasColumnName("wind_direction");
            entity.Property(e => e.WindSpeed).HasColumnName("wind_speed");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("user_pkey");

            entity.ToTable("user", "windmill");

            entity.Property(e => e.UserId)
                .HasDefaultValueSql("nextval('user_user_id_seq'::regclass)")
                .HasColumnName("user_id");
            entity.Property(e => e.Fname).HasColumnName("fname");
            entity.Property(e => e.Lname).HasColumnName("lname");
            entity.Property(e => e.RoleId).HasColumnName("role_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fk_user_role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
