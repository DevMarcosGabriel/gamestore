namespace GameStore.Api.Models;

public class Game
{
    public int id { get; set; }

    public required string Nome { get; set; }

    public Genero? Genero { get; set; }

    public int Generoid { get; set; }

    public decimal Preco { get; set; }

    public DateOnly DataLancamento { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

}
