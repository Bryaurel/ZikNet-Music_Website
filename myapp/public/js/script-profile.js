document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/me', {
        headers: {
            'Authorization': token,
        },
    });

    if (response.ok) {
        const user = await response.json();
        document.getElementById('profile-info').innerHTML = `
            <img src="${user.profilePhoto}" alt="Profile photo">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Name: ${user.firstname} ${user.lastname}</p>
            <p>Birthdate: ${user.birthdate}</p>
            <p>Nationality: ${user.nationality}</p>
            <p>City: ${user.city}</p>
            <p>Country: ${user.country}</p>
            <p>Favorite genres: ${user.favoriteGenres.join(', ')}</p>
            <p>Bio: ${user.bio}</p>
        `;
    } else {
        alert('Failed to load profile');
    }
});