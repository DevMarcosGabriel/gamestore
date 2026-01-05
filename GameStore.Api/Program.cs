using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddValidation();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapGamesEndpoints();
app.MapGenerosEndpoints();

app.MigrateDb();

app.Run();
