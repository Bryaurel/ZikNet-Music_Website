document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/ziknet/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(e.target)),
    });

    if (response.ok) {
        window.location.href = 'homepage.html';
    } else if (response.status === 401) {
        const result = await response.json();
        alert(result.message);
    } else {
        alert('An unexpected error occurred.');
    }
});