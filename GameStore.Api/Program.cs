using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// 🔹 CORS (local + produção)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
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

// 🔹 PORTA dinâmica (Render)
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://0.0.0.0:{port}");

app.Run();
