using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<GameStoreContext>();
        dbContext.Database.Migrate();
    }

    public static void AddGameStoreDb (this WebApplicationBuilder builder)
    {
        
        var connString = builder.Configuration.GetConnectionString("GameStore");
        builder.Services.AddSqlite<GameStoreContext>(
            connString,
            optionsAction: options => options.UseSeeding((context, _) =>
            {
            if (!context.Set<Genero>().Any())
                {
                context.Set<Genero>().AddRange(
                        new Genero {Nome = "Luta"},
                        new Genero {Nome = "RPG"},
                        new Genero {Nome = "Plataforma"},
                        new Genero {Nome = "Corrida"},
                        new Genero {Nome = "Esportes"}
                );

                context.SaveChanges();
                }
            })
        );
        
    }
}
