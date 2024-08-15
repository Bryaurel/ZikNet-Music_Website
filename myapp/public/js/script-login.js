document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:80/ziknet/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(e.target)),
    });

    if (response.ok) {
        window.location.href = 'homepage.html';
    } else {
        alert('Login failed');
    }
});