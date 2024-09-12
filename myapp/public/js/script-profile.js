document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost/ziknet/profile.php'); // Met à jour le chemin pour accéder au fichier PHP

        if (response.ok) {
            const user = await response.json();

            // Utiliser l'URL complète ou le chemin stocké dans la base de données
            document.getElementById('profile-photo').src = user.profilePhoto ? user.profilePhoto : 'default.jpg';
            document.getElementById('username').innerText = user.username;
            document.getElementById('fullname').innerText = `${user.firstname} ${user.lastname}`;
            document.getElementById('bio').innerText = user.bio;

            document.getElementById('followers-count').innerText = `${user.followersCount} followers`;
            document.getElementById('following-count').innerText = `${user.followingCount} following`;
            document.getElementById('posts-count').innerText = `${user.postsCount} posts`;

            const highlightsContainer = document.getElementById('highlights-container');
            user.highlights.forEach(highlight => {
                const highlightItem = document.createElement('div');
                highlightItem.className = 'highlight-item';
                highlightItem.innerText = highlight;
                highlightsContainer.appendChild(highlightItem);
            });

            const postsGrid = document.getElementById('posts-grid');
            user.posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'post-item';
                postItem.innerText = post;
                postsGrid.appendChild(postItem);
            });
        } else {
            alert('Failed to load profile');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addPostButton = document.getElementById('add-post-button');

    if (addPostButton) {
        addPostButton.addEventListener('click', () => {
            window.location.href = 'create-post.html'; // Redirige vers la page de création de publication
        });
    }
});
