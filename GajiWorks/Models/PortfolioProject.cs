namespace GajiWorks.Models;

public sealed record PortfolioProject(
    string Name,
    string Category,
    string Description,
    IReadOnlyList<string> Tags,
    IReadOnlyList<string> Features,
    IReadOnlyList<string> Screenshots,
    string EstimatedCost,
    string AccentClass,
    string LiveDemoUrl = "#",
    string GitHubUrl = "#",
    string CardPreviewImage = "");
