using Mathmixin.Server.Entities;
using Mathmixin.Server.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace Mathmixin.Server.Database;

public class Context : DbContext
{
    public DbSet<Notebook> Notebooks { get; set; }
    public DbSet<Page> Pages { get; set; }

    public Context(DbContextOptions<Context> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
            if (connectionString == null)
            {
                throw new Exception("Connection string is not defined. Please set env variable DB_CONNECTION_STRING");
            }

            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Notebook>().HasQueryFilter(n => n.DeletedDateUtc == null || n.DeletedDateUtc > DateTime.UtcNow);
        modelBuilder.Entity<Page>().HasQueryFilter(n => n.DeletedDateUtc == null || n.DeletedDateUtc > DateTime.UtcNow);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ChangeTracker.DetectChanges();

        var now = DateTime.UtcNow;

        foreach (var item in ChangeTracker.Entries<BaseEntity>().Where(e => e.State == EntityState.Added))
        {
            item.Property("CreatedDateUtc").CurrentValue = now;
            item.Property("ModifiedDateUtc").CurrentValue = now;
        }

        foreach (var item in ChangeTracker.Entries<BaseEntity>().Where(e => e.State == EntityState.Modified))
        {
            item.Property("ModifiedDateUtc").CurrentValue = now;
        }

        foreach (var item in ChangeTracker.Entries<BaseEntity>().Where(e => e.State == EntityState.Deleted))
        {
            item.Property("DeletedDateUtc").CurrentValue = now;
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}