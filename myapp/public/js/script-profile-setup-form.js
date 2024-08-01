document.getElementById('profile-setup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/profile-setup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            birthdate: document.getElementById('birthdate').value,
            nationality: document.getElementById('nationality').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            favoriteGenres: document.getElementById('favoriteGenres').value,
            bio: document.getElementById('bio').value,
            profilePhoto: document.getElementById('profilePicture').value,
        }),
    });

    if (response.ok) {
        window.location.href = 'profile.html';
    } else {
        alert('Profile setup failed');
    }
});