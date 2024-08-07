document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const user = await response.json();
        document.getElementById('profile-photo').src = user.profilePhoto;
        document.getElementById('username').innerText = user.username;
        document.getElementById('fullname').innerText = `${user.firstname} ${user.lastname}`;
        document.getElementById('bio').innerText = user.bio;

        // Mock data for followers, following, posts, and highlights
        const followersCount = 120; // Replace with real data
        const followingCount = 150; //Replace with real data
        const postsCount = 10; // Replace with real data
        const highlights = ['Highlight 1', 'Highlight 2']; // Replace with real data
        const posts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];

        document.getElementById('followers-count').innerText = `${followersCount} followers`;
        document.getElementById('following-count').innerText = `${followingCount} following`;
        document.getElementById('posts-count').innerText = `${postsCount} posts`;

        const highlightsContainer = document.getElementById('highlights-container');
        highlights.forEach(highlight => {
            const highlightItem = document.createElement('div');
            highlightItem.className = 'highlight-item';
            highlightItem.innerText = highlight;
            highlightsContainer.appendChild(highlightItem);
        });

        const postsGrid = document.getElementById('posts-grid');
        posts.forEach(post => {
            const postItem = document.getElementById('div');
            postItem.className = 'post-item';
            postItem.innerText = post;
            postsGrid.appendChild(postItem);
        });
    } else {
        alert('Failed to load profile');
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