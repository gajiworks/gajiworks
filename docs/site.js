const services = [
    ["01", "Quick Launch Page", "need one focused page for an offer or campaign"],
    ["02", "Business Starter Website", "need a professional online home"],
    ["03", "Business Profile / Catalog", "want to present services or products clearly"],
    ["04", "Advanced Showcase", "have a larger portfolio or catalog"],
    ["05", "Business System", "want to improve daily operations"],
    ["06", "Web Automation & Data Scraping", "want to reduce repetitive web tasks"]
];

const pricing = [
    ["Quick Launch Page", "₱5,000 – ₱12,000", "A focused page for a new offer, service, or campaign.", false],
    ["Business Starter Website", "₱12,000 – ₱25,000", "A professional online presence with essential business details.", false],
    ["Business Profile / Catalog", "₱25,000 – ₱45,000", "A structured showcase for your business, services, or products.", true],
    ["Advanced Showcase", "₱45,000 – ₱90,000", "A richer portfolio or catalog for larger content needs.", false],
    ["Business System", "₱80,000+", "A tailored system designed around your business workflow.", false],
    ["Web Automation & Data Scraping", "Quote-based", "A scoped solution for repetitive web tasks and approved data collection.", false]
];

const projects = [
    { name:"Transformer & Electrical Business Website", category:"Business Profile / Catalog", description:"A premium business website for an electrical and transformer-related service provider, built to showcase services, project proof, company information, and quotation/contact options.", tags:["Electrical Business","Transformer Services","Business Website","Service Showcase","Company Profile","Responsive UI","Lead Generation"], features:["Premium hero section","Services navigation","Project showcase","Company profile/about section","Floating contact buttons","Quotation/contact CTA","Responsive desktop, tablet, and mobile layout"], screenshots:["images/projects/transformer-business-1.png","images/projects/transformer-business-2.png","images/projects/transformer-business-3.png","images/projects/transformer-business-preview.mp4"], cardPreview:"images/projects/card-transformer-preview.png", cost:"₱25,000 – ₱45,000", accent:"project-blue", live:"https://gabborcena12.github.io/PularWorks/", source:"" },
    { name:"Real Estate Property Showcase", category:"Advanced Showcase", description:"A responsive real estate showcase website for browsing property listings, details, media updates, progress cards, agent information, and inquiry options.", tags:["Real Estate Website","Property Showcase","Advanced Catalog","Modal Gallery","Inquiry Form","Floating Navigation","Responsive UI"], features:["Featured property cards","Property detail modal with gallery","News / Updates cards","Site Progress cards","Show More / Show Less behavior","Floating side navigation","Inquiry form","Agent/contact section","Responsive desktop, tablet, and mobile layout"], screenshots:["images/projects/real-estate-1.png","images/projects/real-estate-2.png","images/projects/real-estate-3.png","images/projects/real-estate-preview.mp4"], cardPreview:"images/projects/card-real-estate-preview.png", cost:"₱45,000 – ₱90,000", accent:"project-cyan", live:"https://gabborcena12.github.io/DMCIWorks/", source:"" },
    { name:"Digital E-Wallet Platform", category:"Business System", description:"A responsive digital wallet platform designed for secure transfers, QR-based payments, transaction records, account settings, and customer support.", tags:["Digital Wallet","Secure Transfers","QR Payments","Transaction History","Account Security","Responsive UI","Customer Support"], features:["Wallet dashboard","Secure pay and transfer flow","QR request and scan tools","Transaction history and receipts","Profile and security settings","Verification and authenticator options","Responsive tablet and mobile layout"], screenshots:["images/projects/digital-wallet-1.png","images/projects/digital-wallet-2.png","images/projects/digital-wallet-3.png","images/projects/digital-wallet-preview.mp4"], cardPreview:"images/projects/card-digital-wallet-preview.png", cost:"₱80,000+", accent:"project-violet", live:"", source:"" },
    { name:"POS & Inventory Backoffice", category:"Business System", description:"An integrated point-of-sale and inventory backoffice system for product sales, stock monitoring, transaction history, reporting, and day-to-day store operations.", tags:["Point of Sale","Inventory Management","Backoffice System","Transaction Records","Stock Monitoring","Business Reports","Responsive UI"], features:["Product search and cart","Checkout and payment flow","Inventory and batch tracking","Transaction history and void controls","Stock preparation workflow","Reports and user management","Responsive operations dashboard"], screenshots:["images/projects/pos-inventory-1.png","images/projects/pos-inventory-2.png","images/projects/pos-inventory-3.png","images/projects/pos-inventory-preview.mp4"], cardPreview:"images/projects/card-pos-inventory-preview.png", cost:"₱80,000+", accent:"project-teal", live:"", source:"" },
    { name:"Women’s Clinic Website", category:"Healthcare / OB-GYN Clinic Website", description:"A professional women’s clinic website designed to present clinic services, doctor information, schedule, FAQs, testimonials, clinic environment visuals, and appointment/contact inquiry in a clean and patient-friendly layout.", tags:["Clinic Website","Healthcare","Static Website","Responsive Design","Appointment Inquiry","Patient-Focused"], features:["Clinic services overview","Doctor profile and clinic information","Consultation schedule and visit hours","Clinic environment presentation","Patient testimonials and FAQs","Appointment and contact inquiry form","Responsive desktop, tablet, and mobile layout","Frontend/static delivery suitable for GitHub Pages"], screenshots:["images/projects/womens-clinic-1.png","images/projects/womens-clinic-2.png","images/projects/womens-clinic-3.png","images/projects/womens-clinic-preview.mp4"], cardPreview:"images/projects/card-womens-clinic-preview.png", cost:"₱25,000 – ₱45,000", accent:"project-cyan", live:"https://gabborcena12.github.io/ClinicWorks/", source:"" }
];

const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"})[character]);
const isImageScreenshot = screenshot => /\.(png|jpe?g|webp)$/i.test(screenshot);
const isVideoPreview = screenshot => /\.(mp4|webm)$/i.test(screenshot);
const screenshotLabel = (screenshot, index) => isVideoPreview(screenshot) ? "Video preview" : isImageScreenshot(screenshot) ? `Project image ${index + 1}` : screenshot;
const compactEstimatedCost = cost => cost.replace(/,000/g, "k");

function screenshotMarkup(project, index) {
    const screenshot = project.screenshots[index];
    if (isImageScreenshot(screenshot)) {
        return `<img class="modal-screenshot-image" src="${escapeHtml(screenshot)}" alt="${escapeHtml(`${project.name} - ${screenshotLabel(screenshot, index)}`)}"><span class="screenshot-caption">${escapeHtml(screenshotLabel(screenshot, index))}</span>`;
    }
    if (isVideoPreview(screenshot)) {
        const poster = project.screenshots.find(isImageScreenshot) || "";
        return `<video class="modal-video" controls autoplay muted preload="metadata" playsinline poster="${escapeHtml(poster)}"><source src="${escapeHtml(screenshot)}" type="video/mp4">Your browser does not support video playback.</video><span class="screenshot-caption">Video preview</span>`;
    }

    return `<span class="project-window"><i></i><i></i><i></i></span><div class="screenshot-layout screenshot-layout-${(index % 3) + 1}"><span class="screenshot-nav"></span><span class="screenshot-title"></span><span class="screenshot-copy"></span><span class="screenshot-panel screenshot-panel-one"></span><span class="screenshot-panel screenshot-panel-two"></span></div><span class="screenshot-caption">${escapeHtml(screenshot)}</span>`;
}

function renderServices() {
    document.querySelector("#services-grid").innerHTML = services.map(([number, title, bestFor]) => `
        <article class="service-card service-card-compact reveal">
            <div class="service-number">${number}</div>
            <div><h3>${escapeHtml(title)}</h3><p class="best-for"><span>For clients who</span> ${escapeHtml(bestFor)}</p></div>
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
    return `<div class="portfolio-grid-item ${index >= 4 ? "is-hidden" : ""}" aria-hidden="${index >= 4}">
        <article class="project-card reveal">
            <div class="project-card-preview"><img src="${escapeHtml(project.cardPreview)}" alt="${escapeHtml(`${project.name} preview`)}"></div>
            <div class="project-content"><span class="project-category">${escapeHtml(project.category)}</span><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p>
                <div class="feature-tags">${project.tags.slice(0, 3).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
                <div class="project-price-hint"><span>Similar project: <strong>${escapeHtml(compactEstimatedCost(project.cost))}</strong></span><em>Negotiable</em></div>
                <button class="project-view-button" type="button" data-project-index="${index}">View Project <span aria-hidden="true">→</span></button>
            </div>
        </article>
    </div>`;
}

function renderProjects() {
    document.querySelector("#portfolio-grid").innerHTML = projects.map(projectCard).join("");
    document.querySelectorAll("[data-project-index]").forEach(button => button.addEventListener("click", () => openProject(Number(button.dataset.projectIndex))));
}

let mediaAdvanceTimer;

function stopMediaCycle() {
    window.clearTimeout(mediaAdvanceTimer);
    mediaAdvanceTimer = undefined;
    document.querySelector(".modal-video")?.pause();
}

function startMediaCycle(project, index) {
    stopMediaCycle();
    const screenshot = project.screenshots[index];
    if (isImageScreenshot(screenshot)) {
        mediaAdvanceTimer = window.setTimeout(() => setScreenshot(project, (index + 1) % project.screenshots.length), 2500);
        return;
    }

    if (isVideoPreview(screenshot)) {
        const video = document.querySelector(".modal-video");
        if (!video) return;
        video.muted = true;
        video.addEventListener("ended", () => setScreenshot(project, (index + 1) % project.screenshots.length), { once: true });
        video.play().catch(() => { });
    }
}

function setScreenshot(project, index) {
    const modal = document.querySelector(".project-modal");
    if (!modal) return;
    stopMediaCycle();
    const screenshot = project.screenshots[index];
    const preview = modal.querySelector(".modal-screenshot");
    preview.className = `modal-screenshot ${project.accent} ${isImageScreenshot(screenshot) ? "has-image" : isVideoPreview(screenshot) ? "has-video" : ""}`;
    preview.innerHTML = screenshotMarkup(project, index);
    modal.querySelectorAll(".screenshot-thumbnail").forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
    startMediaCycle(project, index);
}

function openProject(index) {
    const project = projects[index];
    const links = [
        project.live ? `<a class="button button-primary" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">${project.name.includes("Clinic") ? "View Live Project" : "Live Project"} ↗</a>` : "",
        project.source ? `<a class="button button-secondary" href="${escapeHtml(project.source)}" target="_blank" rel="noopener noreferrer">View Source</a>` : ""
    ].join("");

    document.querySelector("#project-modal-root").innerHTML = `<div class="modal-backdrop" role="presentation">
        <section class="project-modal project-modal-detailed" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button class="modal-close" type="button" aria-label="Close project details">×</button>
            <div class="modal-gallery">
                <div class="modal-screenshot ${project.accent} ${isImageScreenshot(project.screenshots[0]) ? "has-image" : isVideoPreview(project.screenshots[0]) ? "has-video" : ""}">${screenshotMarkup(project, 0)}</div>
                <div class="screenshot-thumbnails" aria-label="Project media">${project.screenshots.map((shot, shotIndex) => `<button class="screenshot-thumbnail ${project.accent} ${shotIndex === 0 ? "active" : ""}" type="button" data-screenshot-index="${shotIndex}" aria-label="View ${escapeHtml(screenshotLabel(shot, shotIndex))}" aria-pressed="${shotIndex === 0}">${isImageScreenshot(shot) ? `<img src="${escapeHtml(shot)}" alt="">` : isVideoPreview(shot) ? `<span class="video-thumbnail-icon" aria-hidden="true">▶</span>` : `<span>${shotIndex + 1}</span>`}<small>${escapeHtml(screenshotLabel(shot, shotIndex))}</small></button>`).join("")}</div>
            </div>
            <div class="modal-copy modal-project-details"><span class="project-category">${escapeHtml(project.category)}</span><h2 id="project-modal-title">${escapeHtml(project.name)}</h2><p>${escapeHtml(project.description)}</p>
                <div class="modal-tags" aria-label="Project tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
                <h3>Key features</h3><ul>${project.features.map(feature => `<li><span>✓</span>${escapeHtml(feature)}</li>`).join("")}</ul>
                <div class="project-cost"><small>Estimated similar project cost</small><strong>${escapeHtml(project.cost)}</strong><div class="pricing-tags"><span>Starting Estimate</span><span>Negotiable</span><span>Scope-Based</span><span>Discount Available</span></div><p>Final pricing may vary depending on scope, timeline, content, features, and support package.</p></div>
                ${links ? `<div class="hero-actions modal-actions">${links}</div>` : ""}
            </div>
        </section>
    </div>`;

    const backdrop = document.querySelector(".modal-backdrop");
    backdrop.addEventListener("click", event => { if (event.target === backdrop) closeProject(); });
    backdrop.querySelector(".modal-close").addEventListener("click", closeProject);
    backdrop.querySelectorAll("[data-screenshot-index]").forEach(button => button.addEventListener("click", () => setScreenshot(project, Number(button.dataset.screenshotIndex))));
    backdrop.querySelector(".modal-close").focus();
    startMediaCycle(project, 0);
}

function closeProject() {
    stopMediaCycle();
    document.querySelector("#project-modal-root").innerHTML = "";
}

function initializePortfolioToggle() {
    const toggle = document.querySelector("#portfolio-toggle");
    let expanded = false;
    toggle.addEventListener("click", () => {
        expanded = !expanded;
        document.querySelectorAll(".portfolio-grid-item").forEach((item, index) => {
            if (index < 4) return;
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
    const errorBox = document.querySelector("#inquiry-error");
    const resetButton = document.querySelector("#reset-inquiry");
    if (!form || !success) return;
    const messages = { name:"Please enter your name.", email:"Please enter a valid email address.", message:"Please tell me a little about your project." };
    const setError = (name, message) => {
        const field = form.elements[name];
        const error = document.querySelector(`[data-error="${name}"]`);
        if (error) error.textContent = message;
        if (field) field.classList.toggle("invalid", Boolean(message));
    };
    const clearStatus = () => {
        if (!errorBox) return;
        errorBox.textContent = "";
        errorBox.classList.remove("is-visible");
    };
    const validate = () => {
        let valid = true;
        Object.entries(messages).forEach(([name, message]) => {
            const field = form.elements[name];
            const value = String(field?.value || "").trim();
            let error = value ? "" : message;
            if (name === "email" && value && !field.checkValidity()) error = message;
            if (name === "message" && value && value.length < 10) error = "Please add a little more detail.";
            setError(name, error);
            valid = valid && !error;
        });
        return valid;
    };
    const buildMessage = formData => {
        const projectType = String(formData.get("projectType") || "Not sure yet").trim() || "Not sure yet";
        const budget = String(formData.get("budget") || "Optional / To be discussed").trim() || "Optional / To be discussed";
        const contact = String(formData.get("contact") || "Not provided").trim() || "Not provided";
        const message = String(formData.get("message") || "").trim();
        formData.set("message", [`Project Type: ${projectType}`, `Budget Range: ${budget}`, `Phone / Messenger: ${contact}`, "", message].join("\n"));
    };
    form.addEventListener("submit", async event => {
        event.preventDefault();
        if (form.dataset.submitting === "true") return;
        clearStatus();
        if (!validate()) return;
        const formData = new FormData(form);
        if (String(formData.get("honeypot") || "").trim()) {
            form.reset();
            return;
        }
        const submitButton = form.querySelector("button[type='submit']");
        const submitLabel = submitButton?.dataset.submitLabel || "Send Inquiry";
        form.dataset.submitting = "true";
        form.classList.add("is-submitting");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }
        try {
            buildMessage(formData);
            const response = await fetch(form.action, { method:form.method || "POST", headers:{ Accept:"application/json" }, body:formData });
            const result = await response.json().catch(() => ({}));
            if (!response.ok || result.success === false) throw new Error(result.message || "The inquiry could not be sent.");
            form.reset();
            form.classList.add("static-hidden");
            success.classList.remove("static-hidden");
            if (submitButton) submitButton.textContent = "Sent";
        } catch (error) {
            console.error(error);
            if (errorBox) {
                errorBox.textContent = "Something went wrong while sending. Please try again.";
                errorBox.classList.add("is-visible");
            }
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = submitLabel;
            }
        } finally {
            delete form.dataset.submitting;
            form.classList.remove("is-submitting");
        }
    });
    form.addEventListener("input", event => {
        if (event.target.name in messages && event.target.value.trim()) setError(event.target.name, "");
        clearStatus();
    });
    resetButton?.addEventListener("click", () => {
        form.reset();
        form.querySelectorAll(".validation-message").forEach(item => item.textContent = "");
        form.querySelectorAll(".invalid").forEach(item => item.classList.remove("invalid"));
        success.classList.add("static-hidden");
        form.classList.remove("static-hidden");
        const submitButton = form.querySelector("button[type='submit']");
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.submitLabel || "Send Inquiry";
        }
        clearStatus();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderServices(); renderProjects(); renderPricing();
    initializePortfolioToggle(); initializeNavigation(); initializeRevealAnimations(); initializeInquiryForm();
    document.querySelector("#copyright-year").textContent = new Date().getFullYear();
    document.querySelectorAll("[data-placeholder-link]").forEach(link => link.addEventListener("click", event => event.preventDefault()));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeProject(); });
});
