const form = document.getElementById('registerForm');
const name = document.getElementById('name');
const gender = document.getElementById('gender');
const email = document.getElementById('email');
const num = document.getElementById('num');
const address = document.getElementById('address');
const dob = document.getElementById('dob'); // Nouveau champ Date of Birth
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const termsAccepted = document.getElementById('terms');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!name.value || !gender.value || !email.value || !num.value || !address.value || !dob.value || !password1.value || !password2.value) {
        alert('Tous les champs doivent être remplis.');
        return;
    }

    // Validation des mots de passe
    if (password1.value !== password2.value) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    // Validation du numéro de téléphone (exemple simple)
    if (num.value.length < 10 || isNaN(num.value)) {
        alert('Veuillez entrer un numéro de téléphone valide (au moins 10 chiffres).');
        return;
    }

    // Validation des conditions d'utilisation
    if (!termsAccepted.checked) {
        alert('Vous devez accepter les conditions d\'utilisation.');
        return;
    }

    // Fonction pour générer un ID unique
    function generateId() {
        return Math.floor(Math.random() * 10000); // Génère un nombre aléatoire entre 0 et 9999
    }

    // Crée un objet utilisateur
    const user = {
        id: generateId(), // Utilisation de la fonction pour générer un ID
        name: name.value,
        gender: gender.value,
        dob: dob.value, // Ajout de la date de naissance
        typeClient: "nouveaux", // Définition par défaut du type de client
        email: email.value,
        num: num.value,
        address: address.value,
        password: password1.value,
        role: "user",
        
        orderHistory: []
    };

    // Envoi des données à l'API JSON-server
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        console.log('Response:', response); // Ajouté pour le débogage
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error('Erreur lors de l\'inscription : ' + (err.message || 'Réponse non valide du serveur'));
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Nouvel utilisateur enregistré :', data);
        alert('Inscription réussie !');
        window.location.href = 'login.html'; // Redirection vers la page de connexion
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
    });
}); 