document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/ziknet/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(e.target)),
    });

    if (response.ok) {
        window.location.href = 'profile-setup.html';
    } else {
        const errorText = await response.text(); // Récupère le texte de l'erreur
        alert('Registration failed: ' + errorText); // Affiche un message d'erreur plus détaillé
    }
});