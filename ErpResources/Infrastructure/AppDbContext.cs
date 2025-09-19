using Gateway.TimeShifts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Gateway.Infrastructure;

internal class AppDbContext : IdentityDbContext<IdentityUser> {
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<TimeShift> TimeShifts { get; set; }
}
