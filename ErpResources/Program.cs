using Gateway;
using Gateway.Infrastructure;
using Gateway.TimeShifts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("AppDb"));

builder.Services.AddMediatR(configuration => {
    configuration.RegisterServicesFromAssembly(typeof(Program).Assembly);
});

builder.Services.AddAuth();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

builder.Services.AddTimeShiftsModule();

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuth();

app.UseHttpsRedirection();

app.ConfigureTimeShiftsApi();

app.Run();
