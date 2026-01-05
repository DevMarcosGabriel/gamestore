using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";
    
    public static void MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/games");
        
        // GET /games
        group.MapGet("/", async (GameStoreContext dbContext) 
            => await dbContext.Games
                              .Include(game => game.Genero)  
                              .Select(game => new GameSummaryDto(
                                game.id,
                                game.Nome,
                                game.Genero!.Nome,
                                game.Preco,
                                game.DataLancamento,
                                game.ImageUrl
                              ))
                              .AsNoTracking()
                              .ToListAsync());

        // GET /games/1
        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            var game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound() : Results.Ok(
                new GameDetailsDto(
                game.id,
                game.Nome,
                game.Generoid,
                game.Preco,
                game.DataLancamento,
                game.ImageUrl
                )
            );
        })
            .WithName(GetGameEndpointName);

        //POST /games
        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) =>
        {

            Game game = new()
            {
                Nome = newGame.Nome,
                Generoid = newGame.Generoid,
                Preco = newGame.Preco,
                DataLancamento = newGame.DataLancamento,
                ImageUrl = newGame.ImageUrl
            };

            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            GameDetailsDto gameDto = new(
                game.id,
                game.Nome,
                game.Generoid,
                game.Preco,
                game.DataLancamento,
                game.ImageUrl
            );

            return Results.CreatedAtRoute(GetGameEndpointName, new {id = gameDto.id}, gameDto);
        });

        // PUT games/1
        group.MapPut("/{id}", async (int id, UpdateGameDto updateGame, GameStoreContext dbContext) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);

            if (existingGame is null)
            {
                return Results.NotFound();
            }

            existingGame.Nome = updateGame.Nome;
            existingGame.Generoid = updateGame.Generoid;
            existingGame.Preco = updateGame.Preco;
            existingGame.DataLancamento = updateGame.DataLancamento;
            existingGame.ImageUrl = updateGame.ImageUrl;

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        // DELETE /games/1
        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            await dbContext.Games
                            .Where(game => game.id == id)
                            .ExecuteDeleteAsync();

            return Results.NoContent();
        });
    }
}
