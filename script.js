document.addEventListener('DOMContentLoaded', function() {
    // Gestione del Countdown
    const countdownElement = document.getElementById('countdown');
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

    // Gestione Hamburger Menu
    const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-mobile-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
});