namespace GajiWorks.Models;

public sealed record ServicePackage(string Title, string BestFor, string Description, string UseCase, string Icon);
public sealed record PricingPackage(string Title, string StartingPrice, string Summary, bool Featured = false);
