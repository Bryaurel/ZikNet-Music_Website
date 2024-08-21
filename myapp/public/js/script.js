// Handle registration form submission
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
        const errorText = await response.text(); // Retrieve the error text
        alert('Registration failed: ' + errorText); // Display a more detailed error message
    }
});

// Handle message window toggle
document.querySelector('nav ul li a[href="messages.html"]').addEventListener('click', (e) => {
    e.preventDefault();
    
    const messageWindow = document.getElementById('message-window');
    
    if (messageWindow.classList.contains('hidden')) {
        messageWindow.classList.remove('hidden');
        messageWindow.classList.add('visible');
    } else {
        messageWindow.classList.remove('visible');
        messageWindow.classList.add('hidden');
    }
});