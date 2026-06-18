using GajiWorks.Models;

namespace GajiWorks.Data;

public static class ServicePackages
{
    public static IReadOnlyList<ServicePackage> All { get; } =
    [
        new("Micro / Simple One Page", "New offers and focused campaigns", "A concise page that presents one clear offer and gives visitors an easy next step.", "A launch page for a new local service.", "01"),
        new("Basic Static Site", "Small businesses needing an online home", "A professional multi-section website for essential business information and customer inquiries.", "A website for a consultant or local shop.", "02"),
        new("Business Brochure / Catalog", "Businesses with several services or products", "A structured website that helps visitors understand, browse, and inquire about your offerings.", "A supplier catalog with inquiry options.", "03"),
        new("Advanced Showcase / Catalog", "Brands with larger portfolios", "A richer showcase with detailed categories, filtering, and content designed for confident decisions.", "A manufacturer presenting multiple product lines.", "04"),
        new("Custom Web App", "Businesses improving daily operations", "A purpose-built browser-based system shaped around your workflow, records, and reporting needs.", "A job tracking or inventory portal.", "05"),
        new("Web Automation & Data Scraping", "Teams reducing repetitive work", "Practical automation that gathers, organizes, or moves approved business data more efficiently.", "A recurring market-price monitoring report.", "06")
    ];

    public static IReadOnlyList<PricingPackage> Pricing { get; } =
    [
        new("Micro Site", "₱8,000 – ₱15,000", "One focused page for a service, offer, or campaign."),
        new("Basic Static Site", "₱18,000 – ₱35,000", "A professional web presence for a small business."),
        new("Business Brochure / Catalog", "₱35,000 – ₱75,000", "Structured services or products with inquiry paths.", true),
        new("Advanced Showcase", "₱70,000 – ₱140,000", "A richer portfolio or catalog with more content."),
        new("Custom Web App", "From ₱120,000", "A tailored business system based on your workflow.")
    ];
}
