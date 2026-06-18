using GajiWorks.Models;

namespace GajiWorks.Data;

public static class PortfolioProjects
{
    public static IReadOnlyList<PortfolioProject> All { get; } =
    [
        new("Northline Manufacturing", "Company Website", "A polished company profile that presents capabilities, certifications, and inquiry paths for prospective partners.", ["Responsive", "Business Profile", "Lead Generation"], ["Service overview", "Project gallery", "Quote inquiry"], ["Homepage", "Capabilities", "Inquiry Flow"], "₱35,000 – ₱75,000", "project-blue"),
        new("Harbor & Pine Living", "Product Catalog", "A calm, image-led furniture catalog designed to make collections easy to browse and compare.", ["Product Catalog", "Mobile Ready", "Visual Showcase"], ["Category browsing", "Product details", "Mobile catalog"], ["Collection View", "Product Details", "Mobile Catalog"], "₱45,000 – ₱90,000", "project-cyan"),
        new("LedgerPoint Advisory", "Financial Services", "A trust-focused service website that explains financial solutions clearly and drives consultation requests.", ["Professional Services", "Trust Focused", "Consultation"], ["Service pages", "Trust indicators", "Consultation form"], ["Service Overview", "Advisory Details", "Consultation Form"], "₱35,000 – ₱80,000", "project-violet"),
        new("SoleForm International", "Specialty Footwear", "An international orthopedic footwear showcase built around comfort, craftsmanship, and distributor support.", ["International", "Product Showcase", "Partner Support"], ["Product showcase", "Partner information", "Global inquiries"], ["Brand Story", "Product Range", "Partner Portal"], "₱55,000 – ₱110,000", "project-teal"),
        new("StockPilot", "Inventory System", "A focused business dashboard concept for monitoring stock, purchase activity, and low-quantity items.", ["Web Application", "Inventory", "Reporting"], ["Stock overview", "Activity tracking", "Business reports"], ["Dashboard", "Stock Records", "Reports"], "From ₱120,000", "project-indigo"),
        new("FieldFlow Services", "Service Operations", "A lightweight operations portal concept that keeps requests, schedules, and job updates organized.", ["Operations", "Scheduling", "Status Tracking"], ["Request intake", "Schedule view", "Status updates"], ["Request Board", "Schedule", "Job Details"], "From ₱110,000", "project-sky")
    ];
}
