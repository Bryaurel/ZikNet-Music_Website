document.getElementById("profile-setup-form").addEventListener("submit", function (event) {
    // Empêcher l'envoi par défaut pour la gestion JavaScript
    event.preventDefault();

    console.log("DOM entirely loaded and analysed");

    // Liste des pays
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

    // Réinitialiser les options
    nationalitySelect.innerHTML = "";
    countrySelect.innerHTML = "";

    countries.forEach(country => {
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        nationalitySelect.appendChild(option.cloneNode(true));
        countrySelect.appendChild(option.cloneNode(true));
    });

    // Récupération des valeurs des champs du formulaire
    let firstname = document.getElementById("firstname")?.value || "";
    let lastname = document.getElementById("lastname")?.value || "";
    let email = document.getElementById("email")?.value || "";
    let phone = document.getElementById("phone")?.value || "";
    let nationality = document.getElementById("nationality")?.value || "";
    let country = document.getElementById("country")?.value || "";
    let city = document.getElementById("city")?.value || "";
    let birthday = document.getElementById("birthday")?.value || "";
    let bio = document.getElementById("bio")?.value || "";
    let username = document.getElementById("username")?.value || "";
    let contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || "";
    let gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    let profilePhoto = document.getElementById("profilePhoto").files[0];
    let cv = document.getElementById("cv").files[0];

    // Validation simple du formulaire
    if (!phone || !nationality || !country || !city || !username) {
        alert("Please fill in all required fields.");
        return;
    }

    // Création d'un objet FormData pour l'envoi des données
    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("nationality", nationality);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("birthday", birthday);
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("contactMethod", contactMethod);
    formData.append("gender", gender);

    // Ajout des fichiers au FormData
    if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
    }
    if (cv) {
        formData.append("cv", cv);
    }

    // Envoi des données via fetch API
    fetch("http://localhost/ziknet/profile-setup.php", {
        method: "POST",
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Redirige vers le profil après la sauvegarde réussie
            window.location.href = "profile.html";
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => console.error("Error:", error));
});
