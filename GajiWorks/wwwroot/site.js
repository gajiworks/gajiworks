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

export function initializeInquiryForm() {
    const form = document.querySelector('#inquiry-form');
    const success = document.querySelector('#inquiry-success');
    const errorBox = document.querySelector('#inquiry-error');
    const resetButton = document.querySelector('#reset-inquiry');
    if (!form || !success) return;

    const requiredMessages = {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address.',
        message: 'Please tell me a little about your project.'
    };

    const setError = (name, message) => {
        const field = form.elements[name];
        const error = document.querySelector(`[data-error="${name}"]`);
        if (error) error.textContent = message;
        if (field) field.classList.toggle('invalid', Boolean(message));
    };

    const clearStatus = () => {
        if (errorBox) {
            errorBox.textContent = '';
            errorBox.classList.remove('is-visible');
        }
    };

    const validate = () => {
        let valid = true;

        Object.entries(requiredMessages).forEach(([name, message]) => {
            const field = form.elements[name];
            const value = String(field?.value || '').trim();
            let error = value ? '' : message;

            if (name === 'email' && value && !field.checkValidity()) {
                error = message;
            }

            if (name === 'message' && value && value.length < 10) {
                error = 'Please add a little more detail.';
            }

            setError(name, error);
            valid = valid && !error;
        });

        return valid;
    };

    const buildMessage = formData => {
        const projectType = String(formData.get('projectType') || 'Not sure yet').trim() || 'Not sure yet';
        const budget = String(formData.get('budget') || 'Optional / To be discussed').trim() || 'Optional / To be discussed';
        const contact = String(formData.get('contact') || 'Not provided').trim() || 'Not provided';
        const message = String(formData.get('message') || '').trim();

        formData.set('message', [
            `Project Type: ${projectType}`,
            `Budget Range: ${budget}`,
            `Phone / Messenger: ${contact}`,
            '',
            message
        ].join('\n'));
    };

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (form.dataset.submitting === 'true') return;

        clearStatus();
        if (!validate()) return;

        const formData = new FormData(form);
        if (String(formData.get('honeypot') || '').trim()) {
            form.reset();
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const submitLabel = submitButton?.dataset.submitLabel || 'Send Inquiry';

        form.dataset.submitting = 'true';
        form.classList.add('is-submitting');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            buildMessage(formData);
            const response = await fetch(form.action, {
                method: form.method || 'POST',
                headers: { Accept: 'application/json' },
                body: formData
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || result.success === false) {
                throw new Error(result.message || 'The inquiry could not be sent.');
            }

            form.reset();
            form.classList.add('static-hidden');
            success.classList.remove('static-hidden');
            if (submitButton) submitButton.textContent = 'Sent';
        } catch (error) {
            console.error(error);
            if (errorBox) {
                errorBox.textContent = 'Something went wrong while sending. Please try again.';
                errorBox.classList.add('is-visible');
            }
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = submitLabel;
            }
        } finally {
            delete form.dataset.submitting;
            form.classList.remove('is-submitting');
        }
    });

    form.addEventListener('input', event => {
        const target = event.target;
        if (!target?.name || !(target.name in requiredMessages)) return;
        if (String(target.value || '').trim()) setError(target.name, '');
        clearStatus();
    });

    resetButton?.addEventListener('click', () => {
        form.reset();
        form.querySelectorAll('.validation-message').forEach(item => item.textContent = '');
        form.querySelectorAll('.invalid').forEach(item => item.classList.remove('invalid'));
        success.classList.add('static-hidden');
        form.classList.remove('static-hidden');
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.submitLabel || 'Send Inquiry';
        }
        clearStatus();
    });
}
