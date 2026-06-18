const services = [
    ["01", "Micro / Simple One Page", "New offers and focused campaigns"],
    ["02", "Basic Static Site", "Small businesses needing an online home"],
    ["03", "Business Brochure / Catalog", "Businesses with several services or products"],
    ["04", "Advanced Showcase / Catalog", "Brands with larger portfolios"],
    ["05", "Custom Web App", "Businesses improving daily operations"],
    ["06", "Web Automation & Data Scraping", "Teams reducing repetitive work"]
];

const pricing = [
    ["Micro Site", "₱8,000 – ₱15,000", "One focused page for a service, offer, or campaign.", false],
    ["Basic Static Site", "₱18,000 – ₱35,000", "A professional web presence for a small business.", false],
    ["Business Brochure / Catalog", "₱35,000 – ₱75,000", "Structured services or products with inquiry paths.", true],
    ["Advanced Showcase", "₱70,000 – ₱140,000", "A richer portfolio or catalog with more content.", false],
    ["Custom Web App", "From ₱120,000", "A tailored business system based on your workflow.", false]
];

const projects = [
    { name:"Northline Manufacturing", category:"Company Website", description:"A polished company profile that presents capabilities, certifications, and inquiry paths for prospective partners.", tags:["Responsive","Business Profile","Lead Generation"], features:["Service overview","Project gallery","Quote inquiry"], screenshots:["Homepage","Capabilities","Inquiry Flow"], cost:"₱35,000 – ₱75,000", accent:"project-blue", live:"", source:"" },
    { name:"Harbor & Pine Living", category:"Product Catalog", description:"A calm, image-led furniture catalog designed to make collections easy to browse and compare.", tags:["Product Catalog","Mobile Ready","Visual Showcase"], features:["Category browsing","Product details","Mobile catalog"], screenshots:["Collection View","Product Details","Mobile Catalog"], cost:"₱45,000 – ₱90,000", accent:"project-cyan", live:"", source:"" },
    { name:"LedgerPoint Advisory", category:"Financial Services", description:"A trust-focused service website that explains financial solutions clearly and drives consultation requests.", tags:["Professional Services","Trust Focused","Consultation"], features:["Service pages","Trust indicators","Consultation form"], screenshots:["Service Overview","Advisory Details","Consultation Form"], cost:"₱35,000 – ₱80,000", accent:"project-violet", live:"", source:"" },
    { name:"SoleForm International", category:"Specialty Footwear", description:"An international orthopedic footwear showcase built around comfort, craftsmanship, and distributor support.", tags:["International","Product Showcase","Partner Support"], features:["Product showcase","Partner information","Global inquiries"], screenshots:["Brand Story","Product Range","Partner Portal"], cost:"₱55,000 – ₱110,000", accent:"project-teal", live:"", source:"" },
    { name:"StockPilot", category:"Inventory System", description:"A focused business dashboard concept for monitoring stock, purchase activity, and low-quantity items.", tags:["Web Application","Inventory","Reporting"], features:["Stock overview","Activity tracking","Business reports"], screenshots:["Dashboard","Stock Records","Reports"], cost:"From ₱120,000", accent:"project-indigo", live:"", source:"" },
    { name:"FieldFlow Services", category:"Service Operations", description:"A lightweight operations portal concept that keeps requests, schedules, and job updates organized.", tags:["Operations","Scheduling","Status Tracking"], features:["Request intake","Schedule view","Status updates"], screenshots:["Request Board","Schedule","Job Details"], cost:"From ₱110,000", accent:"project-sky", live:"", source:"" }
];

const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"})[character]);

function renderServices() {
    document.querySelector("#services-grid").innerHTML = services.map(([number, title, bestFor]) => `
        <article class="service-card service-card-compact reveal">
            <div class="service-number">${number}</div>
            <div><h3>${escapeHtml(title)}</h3><p class="best-for"><span>Best for</span> ${escapeHtml(bestFor)}</p></div>
        </article>`).join("");
}

function renderPricing() {
    document.querySelector("#pricing-grid").innerHTML = pricing.map(([title, price, summary, featured]) => `
        <article class="pricing-card ${featured ? "pricing-featured" : ""} reveal">
            ${featured ? '<span class="popular-label">Popular</span>' : ""}
            <h3>${escapeHtml(title)}</h3><small>Starting range</small><strong>${escapeHtml(price)}</strong><p>${escapeHtml(summary)}</p>
            <a href="#contact">Discuss your project <span>→</span></a>
        </article>`).join("");
}

function projectCard(project, index) {
    return `<div class="portfolio-grid-item ${index >= 3 ? "is-hidden" : ""}" aria-hidden="${index >= 3}">
        <article class="project-card reveal">
            <div class="project-preview ${project.accent}" aria-hidden="true"><span class="project-window"><i></i><i></i><i></i></span><span class="project-monogram">${escapeHtml(project.name[0])}</span></div>
            <div class="project-content"><span class="project-category">${escapeHtml(project.category)}</span><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p>
                <div class="feature-tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
                <button class="project-view-button" type="button" data-project-index="${index}">View Project <span aria-hidden="true">→</span></button>
            </div>
        </article>
    </div>`;
}

function renderProjects() {
    document.querySelector("#portfolio-grid").innerHTML = projects.map(projectCard).join("");
    document.querySelectorAll("[data-project-index]").forEach(button => button.addEventListener("click", () => openProject(Number(button.dataset.projectIndex))));
}

function setScreenshot(project, index) {
    const modal = document.querySelector(".project-modal");
    if (!modal) return;
    modal.querySelector(".screenshot-layout").className = `screenshot-layout screenshot-layout-${(index % 3) + 1}`;
    modal.querySelector(".screenshot-caption").textContent = project.screenshots[index];
    modal.querySelectorAll(".screenshot-thumbnail").forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

function openProject(index) {
    const project = projects[index];
    const links = [
        project.live ? `<a class="button button-primary" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">Live Project ↗</a>` : "",
        project.source ? `<a class="button button-secondary" href="${escapeHtml(project.source)}" target="_blank" rel="noopener noreferrer">View Source</a>` : ""
    ].join("");

    document.querySelector("#project-modal-root").innerHTML = `<div class="modal-backdrop" role="presentation">
        <section class="project-modal project-modal-detailed" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button class="modal-close" type="button" aria-label="Close project details">×</button>
            <div class="modal-gallery">
                <div class="modal-screenshot ${project.accent}"><span class="project-window"><i></i><i></i><i></i></span>
                    <div class="screenshot-layout screenshot-layout-1"><span class="screenshot-nav"></span><span class="screenshot-title"></span><span class="screenshot-copy"></span><span class="screenshot-panel screenshot-panel-one"></span><span class="screenshot-panel screenshot-panel-two"></span></div>
                    <span class="screenshot-caption">${escapeHtml(project.screenshots[0])}</span>
                </div>
                <div class="screenshot-thumbnails" aria-label="Project screenshots">${project.screenshots.map((shot, shotIndex) => `<button class="screenshot-thumbnail ${project.accent} ${shotIndex === 0 ? "active" : ""}" type="button" data-screenshot-index="${shotIndex}" aria-label="View ${escapeHtml(shot)} screenshot" aria-pressed="${shotIndex === 0}"><span>${shotIndex + 1}</span><small>${escapeHtml(shot)}</small></button>`).join("")}</div>
            </div>
            <div class="modal-copy modal-project-details"><span class="project-category">${escapeHtml(project.category)}</span><h2 id="project-modal-title">${escapeHtml(project.name)}</h2><p>${escapeHtml(project.description)}</p>
                <div class="modal-tags" aria-label="Project tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
                <h3>Key features</h3><ul>${project.features.map(feature => `<li><span>✓</span>${escapeHtml(feature)}</li>`).join("")}</ul>
                <div class="project-cost"><small>Estimated similar project cost</small><strong>${escapeHtml(project.cost)}</strong><div class="pricing-tags"><span>Starting Estimate</span><span>Negotiable</span><span>Discount Available</span><span>Scope-Based</span></div><p>Final pricing may vary depending on scope, timeline, content, features, and support package.</p></div>
                ${links ? `<div class="hero-actions modal-actions">${links}</div>` : ""}
            </div>
        </section>
    </div>`;

    const backdrop = document.querySelector(".modal-backdrop");
    backdrop.addEventListener("click", event => { if (event.target === backdrop) closeProject(); });
    backdrop.querySelector(".modal-close").addEventListener("click", closeProject);
    backdrop.querySelectorAll("[data-screenshot-index]").forEach(button => button.addEventListener("click", () => setScreenshot(project, Number(button.dataset.screenshotIndex))));
    backdrop.querySelector(".modal-close").focus();
}

function closeProject() {
    document.querySelector("#project-modal-root").innerHTML = "";
}

function initializePortfolioToggle() {
    const toggle = document.querySelector("#portfolio-toggle");
    let expanded = false;
    toggle.addEventListener("click", () => {
        expanded = !expanded;
        document.querySelectorAll(".portfolio-grid-item").forEach((item, index) => {
            if (index < 3) return;
            item.classList.toggle("is-hidden", !expanded);
            item.classList.toggle("is-revealed", expanded);
            item.setAttribute("aria-hidden", String(!expanded));
        });
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.innerHTML = `${expanded ? "Show Less" : "Show More"} <span aria-hidden="true">${expanded ? "↑" : "↓"}</span>`;
    });
}

function initializeNavigation() {
    const header = document.querySelector("[data-site-header]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    const headerLinks = [...document.querySelectorAll("[data-nav-link]")];
    const sideLinks = [...document.querySelectorAll("[data-side-nav-link]")];
    const activeLinks = [...headerLinks, ...sideLinks];
    const sections = [...document.querySelectorAll(".section-anchor[id]")];
    const closeNav = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => { const open = nav.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(open)); });
    headerLinks.forEach(link => link.addEventListener("click", closeNav));
    const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        activeLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin:"-25% 0px -60% 0px", threshold:[0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
    window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 20), { passive:true });
}

function initializeRevealAnimations() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
    }), { threshold:0.08 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

function initializeInquiryForm() {
    const form = document.querySelector("#inquiry-form");
    const success = document.querySelector("#inquiry-success");
    const messages = { name:"Please enter your name.", contact:"Please add an email or Messenger contact.", projectType:"Please select a project type.", budget:"Please select a budget range.", message:"Please tell me a little about your project." };
    const validate = () => {
        let valid = true;
        Object.entries(messages).forEach(([name, message]) => {
            const field = form.elements[name];
            let error = field.value.trim() ? "" : message;
            if (name === "message" && field.value.trim() && field.value.trim().length < 10) error = "Please add a little more detail.";
            document.querySelector(`[data-error="${name}"]`).textContent = error;
            field.classList.toggle("invalid", Boolean(error));
            valid = valid && !error;
        });
        return valid;
    };
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validate()) return;
        form.classList.add("static-hidden");
        success.classList.remove("static-hidden");
    });
    form.addEventListener("input", event => {
        const error = document.querySelector(`[data-error="${event.target.name}"]`);
        if (error && event.target.value.trim()) { error.textContent = ""; event.target.classList.remove("invalid"); }
    });
    document.querySelector("#reset-inquiry").addEventListener("click", () => {
        form.reset();
        form.querySelectorAll(".validation-message").forEach(item => item.textContent = "");
        success.classList.add("static-hidden");
        form.classList.remove("static-hidden");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderServices(); renderProjects(); renderPricing();
    initializePortfolioToggle(); initializeNavigation(); initializeRevealAnimations(); initializeInquiryForm();
    document.querySelector("#copyright-year").textContent = new Date().getFullYear();
    document.querySelectorAll("[data-placeholder-link]").forEach(link => link.addEventListener("click", event => event.preventDefault()));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeProject(); });
});
