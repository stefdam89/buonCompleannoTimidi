document.addEventListener('DOMContentLoaded', function() {
    // Gestione del Countdown
    const countdownElement = document.getElementById('countdown');
    // La data target è il 8 agosto 2025 alle 16:00:00
    const targetDate = new Date('2025-08-08T16:00:00').getTime(); 

    if (countdownElement) {
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = "LA FESTA È IN CORSO O È GIÀ STATA!";
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}g ${hours}h ${minutes}m ${seconds}s`;
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Gestione del Menu Hamburger (RIPRISTINATO COMPORTAMENTO SEPARATO)
    const menuToggle = document.querySelector('.menu-toggle');
    // Seleziona la lista di navigazione MOBILE (NON quella unificata)
    const navMobileLinks = document.querySelector('.nav-mobile-links'); 
    const body = document.body; // Per impedire lo scroll del body

    if (menuToggle && navMobileLinks) { // Controlla che entrambi gli elementi esistano
        menuToggle.addEventListener('click', function() {
            navMobileLinks.classList.toggle('is-open');
            this.classList.toggle('is-active'); // Per animare l'hamburger a X
            body.classList.toggle('no-scroll'); // Blocca lo scroll del body
        });

        // Chiudi il menu quando un link viene cliccato (su mobile)
        navMobileLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMobileLinks.classList.contains('is-open')) {
                    navMobileLinks.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    // Animazione all'ingresso per i box (program-item, item-list)
    const observerOptions = {
        root: null, // Si riferisce alla viewport come root
        rootMargin: '0px', // Nessun margine extra attorno alla root
        threshold: 0.8 // L'elemento deve essere visibile per almeno l'80% per attivare l'osservatore
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'elemento è entrato nella viewport
                entry.target.classList.add('in-view');
                // Disconnetti l'observer per questo elemento specifico dopo che è stato animato
                // Questo fa sì che l'animazione avvenga solo una volta per elemento.
                observer.unobserve(entry.target); 
            } 
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleziona tutti i box che vuoi animare (sia program-item che item-list)
    const animatedBoxes = document.querySelectorAll('.program-item, .item-list');

    animatedBoxes.forEach(box => {
        observer.observe(box);
    });
});