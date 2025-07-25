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

    // Gestione del Menu Hamburger
    const menuToggle = document.querySelector('.menu-toggle');
    // MODIFICA QUI: Ora selezioniamo la singola lista di navigazione
    const navLinks = document.querySelector('.nav-links'); 
    const body = document.body; // Per impedire lo scroll del body

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('is-open');
            this.classList.toggle('is-active'); // Per animare l'hamburger a X
            body.classList.toggle('no-scroll'); // Blocca lo scroll del body
        });

        // Chiudi il menu quando un link viene cliccato (su mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('is-open')) {
                    navLinks.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }
});