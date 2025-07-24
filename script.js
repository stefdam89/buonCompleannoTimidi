document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');

    // Data dell'evento: 8 Agosto 2025
    const eventDate = new Date('2025-08-08T00:00:00'); // Anno-Mese-GiornoTHH:MM:SS (Mese è 0-based in JS, ma qui è YYYY-MM-DD)

    function updateCountdown() {
        const now = new Date();
        const timeLeft = eventDate - now; // Differenza in millisecondi

        if (timeLeft <= 0) {
            countdownElement.innerHTML = "La festa è iniziata!";
            clearInterval(interval); // Ferma l'aggiornamento del countdown
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}g ${hours}h ${minutes}m ${seconds}s`;
    }

    // Aggiorna il countdown ogni secondo
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Esegui subito per evitare un ritardo iniziale
});