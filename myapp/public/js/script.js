document.getElementById('Registration').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    });

    if (response.ok) {
        window.location.href = 'profile-setup.html';
    } else {
        alert('Registration failed');
    }
});