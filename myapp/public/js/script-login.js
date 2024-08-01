document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.querySelector('[name="email"]').value,
            password: document.querySelector('name="password"]').value,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = 'profile.html';
    } else {
        alert('Login failed');
    }
});