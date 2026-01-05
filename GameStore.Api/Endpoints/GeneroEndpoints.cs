using GameStore.Api.Data;
using GameStore.Api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GeneroEndpoints
{
    public static void MapGenerosEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/generos");

        //GET /generos
        group.MapGet("/", async (GameStoreContext dbContext) =>
            await dbContext.Generos
                            .Select(genero => new GeneroDto(genero.id, genero.Nome))
                            .AsNoTracking()
                            .ToListAsync()
        );
    }

}
