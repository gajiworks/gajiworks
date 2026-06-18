export function initializeSiteNavigation() {
    const header = document.querySelector('[data-site-header]');
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    const headerLinks = [...document.querySelectorAll('[data-nav-link]')];
    const sideLinks = [...document.querySelectorAll('[data-side-nav-link]')];
    const activeLinks = [...headerLinks, ...sideLinks];
    const sections = [...document.querySelectorAll('.section-anchor[id]')];
    const closeNav = () => { nav?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); };
    toggle?.addEventListener('click', () => { const open = nav?.classList.toggle('is-open') ?? false; toggle.setAttribute('aria-expanded', String(open)); });
    headerLinks.forEach(link => link.addEventListener('click', closeNav));
    const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        activeLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 20), { passive: true });
}
