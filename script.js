document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobileLinks = document.querySelector('.nav-mobile-links');
    const body = document.body;

    // Funzione per controllare se è un dispositivo mobile (larghezza inferiore a 900px)
    // Non strettamente necessaria per la logica attuale, ma utile per future estensioni
    const isMobileView = () => window.matchMedia('(max-width: 900px)').matches;

    // Toggle del menu hamburger e gestione click sui link
    if (menuToggle && navMobileLinks) {
        // Event listener per il click sull'icona hamburger
        menuToggle.addEventListener('click', () => {
            navMobileLinks.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
            body.classList.toggle('no-scroll');
        });

        // Event listener per ogni link nel menu mobile
        navMobileLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Su mobile, il menu si chiude immediatamente al click del link.
                // La navigazione avviene subito, senza ritardi JavaScript.
                navMobileLinks.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                body.classList.remove('no-scroll');
                // Nessun e.preventDefault(), nessun setTimeout per la navigazione.
                // La navigazione è nativa e istantanea.
            });
        });
    }

    // --- CODICE PER ANIMAZIONE SCROLL SECTION (Intersection Observer) ---
    // Questo blocco rimane invariato e funzionante, dato che non ha causato problemi.
    const sections = document.querySelectorAll('.program-item, .item-list');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Percentuale di visibilità per attivare
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Se vuoi che l'animazione avvenga una sola volta, decommenta la riga sotto
                // observer.unobserve(entry.target);
            } else {
                // Se vuoi che l'animazione si ripeta quando la sezione esce ed entra dalla vista
                // entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});