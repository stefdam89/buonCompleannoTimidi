document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobileLinks = document.querySelector('.nav-mobile-links');
    const body = document.body;

    // Funzione per controllare se è un dispositivo mobile (larghezza inferiore a 900px)
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
                if (isMobileView()) { // Se siamo in vista mobile
                    e.preventDefault(); // Impedisce la navigazione immediata

                    // Applica la classe per l'animazione persistente
                    link.classList.add('is-tapped');

                    // Chiude il menu mobile (per dare visibilità all'animazione del link)
                    navMobileLinks.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                    // Rimuovi no-scroll solo quando la navigazione sta per avvenire
                    // body.classList.remove('no-scroll'); // COMMENTATO: Rimuoviamo il no-scroll dopo un micro-ritardo

                    // Ritarda la navigazione e la rimozione della classe 'is-tapped'
                    setTimeout(() => {
                        link.classList.remove('is-tapped'); // Rimuovi l'effetto 'tapped'
                        window.location.href = link.href; // Esegui la navigazione
                        body.classList.remove('no-scroll'); // Rimuovi il no-scroll qui
                    }, 300); // Durata dell'animazione persistente (0.3 secondi)

                    // Opzionale: Se vuoi che il menu si chiuda con un leggero ritardo dopo il tap
                    // Se lo vuoi subito, puoi rimuovere il setTimeout qui sotto
                    // setTimeout(() => {
                    //     navMobileLinks.classList.remove('is-open');
                    //     menuToggle.classList.remove('is-active');
                    //     body.classList.remove('no-scroll');
                    // }, 500); // Chiude il menu un po' dopo l'inizio della navigazione
                } else {
                    // Per desktop, non ritardiamo la navigazione
                    // Assicurati che il menu sia chiuso (nel caso strano sia aperto)
                    navMobileLinks.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- CODICE PER ANIMAZIONE SCROLL SECTION (Intersection Observer) ---
    // Se avevi già questo codice, assicurati che sia qui o che il tuo file JS lo mantenga.
    // Questo è un esempio da uncommentare se lo hai rimosso.
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