using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using E_Speaking.Data;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<E_SpeakingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("E_SpeakingContext") ?? throw new InvalidOperationException("Connection string 'E_SpeakingContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("ReactPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
