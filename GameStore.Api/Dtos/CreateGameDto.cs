using System.ComponentModel.DataAnnotations;

namespace GameStore.Api.Dtos;

public record CreateGameDto(
    [Required][StringLength(50)] string Nome,
    [Range(1, 50)] int Generoid,
    [Range(1, 100)] decimal Preco,
    DateOnly DataLancamento,
    string ImageUrl
);