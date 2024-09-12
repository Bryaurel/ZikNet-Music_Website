document.addEventListener('DOMContentLoaded', () => {
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
        "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
        "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
        "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", 
        "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
        "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
        "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
        "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
        "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", 
        "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
        "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
        "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", 
        "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
        "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", 
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", 
        "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
        "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", 
        "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", 
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
        "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
        "Zambia", "Zimbabwe"
    ];

    const nationalitySelect = document.getElementById('nationality');
    const countrySelect = document.getElementById('country');

    // Reset options
    nationalitySelect.innerHTML = "";
    countrySelect.innerHTML = "";

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.text = country;
        nationalitySelect.appendChild(option);
        countrySelect.appendChild(option.cloneNode(true));
    });

    const form = document.getElementById('profile-setup-form');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('username-error');
    
    // Username validation
    usernameInput.addEventListener('blur', () => {
        const username = usernameInput.value.trim();

        // Simulate an API call to check if the username is taken
        setTimeout(() => {
            const takenUsernames = ['user1', 'user2', 'user3']; // Example of taken usernames
            if (takenUsernames.includes(username)) {
                usernameError.textContent = 'Username is already taken';
                usernameInput.setCustomValidity('Username is already taken');
            } else {
                usernameError.textContent = '';
                usernameInput.setCustomValidity('');
            }
        }, 500);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (usernameInput.checkValidity()) {
            const formData = new FormData(form);

            // Send data to server instead of localStorage
            fetch('http://localhost/ziknet/profile-setup.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = 'profile.html'; // Redirect to profile page
                } else {
                    console.error('Error:', data.message);
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating your profile.');
            });
        } else {
            usernameInput.reportValidity();
        }     
    });

    // Load profile data from server on profile page
    const profileUsername = document.getElementById('profile-username');
    const profileFirstName = document.getElementById('profile-first-name');
    const profileLastName = document.getElementById('profile-last-name');
    const profileBio = document.getElementById('profile-bio');

    // Fetch user data from server
    fetch('http://localhost/ziknet/profile.php')
        .then(response => response.json())
        .then(data => {
            if (profileUsername) profileUsername.textContent = data.username || '';
            if (profileFirstName) profileFirstName.textContent = data.firstName || '';
            if (profileLastName) profileLastName.textContent = data.lastName || '';
            if (profileBio) profileBio.textContent = data.bio || '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
