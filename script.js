document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobileLinks = document.querySelector('.nav-mobile-links');
    const body = document.body;

    // Funzione per controllare se è un dispositivo mobile (larghezza inferiore a 900px)
    const isMobileView = () => window.matchMedia('(max-width: 900px)').matches;

    // Toggle del menu hamburger e gestione click sui link
    if (menuToggle && navMobileLinks) {
        menuToggle.addEventListener('click', () => {
            navMobileLinks.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
            body.classList.toggle('no-scroll');
        });

        navMobileLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                navMobileLinks.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // --- LOGICA FEEDBACK FORM (SOLO SU feedback.html) ---
    const feedbackFormButton = document.getElementById('feedback-form-button'); // Il pulsante sulla pagina feedback.html
    const feedbackToast = document.getElementById('feedback-toast');           // Il nuovo elemento toast

    // Verifichiamo se siamo sulla pagina feedback.html controllando l'esistenza degli elementi specifici
    if (feedbackFormButton && feedbackToast) {
        // Data e ora di fine festa: 10 Agosto 2025, 23:59:59
        // Ricorda che i mesi in JavaScript sono 0-indicizzati (Agosto è 7)
        const festaEndDate = new Date(2025, 7, 10, 23, 59, 59);
        const currentDate = new Date();

        if (currentDate < festaEndDate) {
            // Se la festa NON è ancora finita
            feedbackFormButton.classList.add('disabled'); // Disabilita il pulsante via CSS
            feedbackFormButton.removeAttribute('href');   // Rimuovi l'href per impedire la navigazione diretta
            feedbackFormButton.style.cursor = 'not-allowed'; // Assicura che il cursore sia corretto

            // Aggiungiamo un event listener al pulsante disabilitato
            feedbackFormButton.addEventListener('click', (e) => {
                e.preventDefault(); // Impedisce qualsiasi azione predefinita sul click

                // Mostra il messaggio toast
                feedbackToast.classList.add('show');

                // Imposta un timer per nascondere il messaggio toast dopo 3 secondi
                setTimeout(() => {
                    feedbackToast.classList.remove('show');
                }, 3000); // 3000 millisecondi = 3 secondi
            });

        } else {
            // Se la festa è già finita
            feedbackFormButton.classList.remove('disabled'); // Abilita il pulsante
            feedbackFormButton.style.cursor = 'pointer'; // Ripristina il cursore normale
            // Il toast non verrà mai mostrato in questo caso
        }
    }


    // --- Countdown Timer (SOLO SU index.html) ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const eventDate = new Date('August 8, 2025 18:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                countdownElement.innerHTML = "LA FESTA È INIZIATA!";
            } else {
                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }


    // --- CODICE PER ANIMAZIONE SCROLL SECTION (Intersection Observer) (SOLO SU index.html) ---
    const sections = document.querySelectorAll('.program-item, .item-list');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }
});