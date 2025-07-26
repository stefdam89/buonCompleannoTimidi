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

        // Rimuovi la classe 'disabled' all'avvio se presente dall'HTML per errore o da un precedente test
        feedbackFormButton.classList.remove('disabled');
        feedbackFormButton.style.cursor = 'pointer'; // Assicurati che il cursore sia sempre pointer di default

        // Aggiungiamo un event listener al pulsante per gestire il click
        feedbackFormButton.addEventListener('click', (e) => {
            if (currentDate < festaEndDate) {
                // Se la festa NON è ancora finita (cioè la data attuale è PRIMA del 10 Agosto 2025)
                e.preventDefault(); // Impedisce la navigazione al link!

                // Mostra il messaggio toast
                feedbackToast.classList.add('show');

                // Imposta un timer per nascondere il messaggio toast dopo 3 secondi
                setTimeout(() => {
                    feedbackToast.classList.remove('show');
                }, 3000); // 3000 millisecondi = 3 secondi

            } else {
                // Se la festa è già finita (cioè la data attuale è DOPO o UGUALE al 10 Agosto 2025)
                // Il default action (navigazione al link) avviene. Non dobbiamo fare nulla qui,
                // perché non chiamiamo preventDefault().
                // È anche una buona pratica assicurarsi che l'href sia impostato, anche se dovrebbe esserlo dall'HTML.
                // feedbackFormButton.setAttribute('href', "https://docs.google.com/forms/d/e/1FAIpQLScbrzrMI2wyaM-qbWC9LSgURdGn1hh796EhvlVEGu72zTQenQ/viewform?usp=dialog");
            }
        });
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
