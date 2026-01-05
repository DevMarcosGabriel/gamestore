namespace GameStore.Api.Dtos;

public record GameDetailsDto(
    int id,
    string Nome,
    int Generoid,
    decimal Preco,
    DateOnly DataLancamento,
    string ImageUrl
);
