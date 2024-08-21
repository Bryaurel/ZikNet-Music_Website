// Sample data for opportunities
const opportunities = [
    {
        title: "Music Teacher",
        category: "job",
        location: "local",
        description: "Looking for a music teacher to teach guitar and piano to students.",
        status: "open"
    },
    {
        title: "Rock Band Audition",
        category: "audition",
        location: "local",
        description: "We are holding auditions for a rock band in the city.",
        status: "open"
    },
    {
        title: "Jazz Competition",
        category: "competition",
        location: "international",
        description: "Join the international jazz competition for a chance to win $5000.",
        status: "open"
    },
    // Add more opportunities as needed
];

// Function to display opportunities
function displayOpportunities(opportunities) {
    const opportunitiesList = document.getElementById('opportunitiesList');
    opportunitiesList.innerHTML = "";

    opportunities.forEach(opportunity => {
        let card = document.createElement('div');
        card.classList.add('opportunity-card');

        card.innerHTML = `
            <h3>${opportunity.title}</h3>
            <p><strong>Category:</strong> ${opportunity.category}</p>
            <p><strong>Location:</strong> ${opportunity.location}</p>
            <p>${opportunity.description}</p>
            <button>Apply Now</button>
        `;

        opportunitiesList.appendChild(card);
    });
}

// Function to filter opportunities
function filterOpportunities() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;

    const filtered = opportunities.filter(opportunity => {
        return (opportunity.title.toLowerCase().includes(searchQuery) || opportunity.description.toLowerCase().includes(searchQuery)) &&
               (category === "" || opportunity.category === category) &&
               (location === "" || opportunity.location === location);
    });

    displayOpportunities(filtered);
}

// Event listeners for filtering
document.getElementById('searchBar').addEventListener('input', filterOpportunities);
document.getElementById('categoryFilter').addEventListener('change', filterOpportunities);
document.getElementById('locationFilter').addEventListener('change', filterOpportunities);

// Initial display of all opportunities
displayOpportunities(opportunities);
