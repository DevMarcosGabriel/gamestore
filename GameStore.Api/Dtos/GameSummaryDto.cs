namespace GameStore.Api.Dtos;

public record GameSummaryDto(
    int id,
    string Nome,
    string Genero,
    decimal Preco,
    DateOnly DataLancamento,
    string ImageUrl
);
