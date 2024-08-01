document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname: document.querySelector('[name="firstname"]').value,
            lastname: document.querySelector('[name="lastname"]').value,
            email: document.querySelector('[name="email"]').value,
            password: document.querySelector('[name="password"]').value,
        }),
    });

    if (response.ok) {
        window.location.href = 'profile-setup.html';
    } else {
        alert('Registration failed');
    }
});