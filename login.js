const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Vérifie si l'email est déjà stocké
window.onload = function() {
    if (localStorage.getItem('rememberMe') === 'true') {
        emailInput.value = localStorage.getItem('email');
        rememberMeCheckbox.checked = true; // Coche la case
    }
};

// Écouteur d'événements pour le formulaire
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation des champs
    if (!emailInput.value || !passwordInput.value) {
        alert('Tous les champs doivent être remplis.');
        return;
    }

    // Envoi des données de connexion à l'API JSON-server
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);

            if (user) {
                // Stocker le token d'authentification dans le localStorage
                localStorage.setItem('authToken', user.token); // Assurez-vous que l'API retourne un token
                localStorage.setItem('isLoggedIn', 'true'); // Mémorise l'état de connexion
                localStorage.setItem('role', user.role); // Stocke le type d'utilisateur

                // Gérer le "Se souvenir de moi"
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('email', emailInput.value);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('rememberMe');
                }

                // Récupérer la page de redirection après la connexion
                const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
                if (redirectAfterLogin) {
                    localStorage.removeItem('redirectAfterLogin'); // Supprimer la clé après utilisation
                    window.location.href = redirectAfterLogin; // Rediriger vers la page d'origine
                } else {
                    // Rediriger en fonction du rôle de l'utilisateur
                    if (user.role === 'admin') {
                        window.location.href = 'file:///C:/Users/Simo/Desktop/E-Book%20Store/Dashboard/SitePages/dashboard.html'; // Redirige vers le tableau de bord
                    } else {
                        window.location.href = 'file:///C:/Users/Simo/Desktop/E-Book%20Store/Website/index.html'; // Redirige vers le site
                    }
                }
            } else {
                alert('Identifiants incorrects. Veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur s\'est produite lors de la connexion.');
        });
});