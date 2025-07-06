// Gestion du panier
let cartItems = [];

// Fonction pour vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Fonction pour rediriger vers la page de connexion
function redirectToLogin() {
    // Sauvegarder la page actuelle pour rediriger après la connexion
    localStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.href = 'file:///C:/Users/Simo/Desktop/E-Book%20Store/login/login.html';
}

// Fonction pour ajouter un produit au panier
function addToCart(title, price) {
    if (!isUserLoggedIn()) {
        alert('Veuillez vous connecter pour ajouter des articles au panier.');
        redirectToLogin();
        return;
    }

    cartItems.push({ title, price: parseFloat(price) });
    updateCartDisplay();
    saveCart();
    document.getElementById('cartModal').style.display = 'block';
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Mise à jour du compteur sur l'icône du panier
    const cartCount = document.querySelector('.cart-count');
    if (cartItems.length > 0) {
        if (!cartCount) {
            const count = document.createElement('span');
            count.className = 'cart-count';
            count.textContent = cartItems.length;
            document.querySelector('#cartIcon').appendChild(count);
        } else {
            cartCount.textContent = cartItems.length;
        }
    } else if (cartCount) {
        cartCount.remove();
    }

    // Mise à jour du contenu du panier
    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.title}</span>
            <div class="flex items-center">
                <span>${item.price} DH</span>
                <button onclick="removeFromCart(${index})" class="ml-2 text-red-500">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Mise à jour du total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = `Total: ${total.toFixed(2)} DH`;
}

// Fonction pour supprimer un article du panier
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
    saveCart();
}

// Fonction pour sauvegarder le panier dans le localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Fonction pour charger le panier depuis le localStorage
function loadCart() {
    if (!isUserLoggedIn()) {
        return; // Ne pas charger le panier si l'utilisateur n'est pas connecté
    }
    
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Gestionnaire d'événements pour le bouton de validation
document.getElementById('checkoutButton').addEventListener('click', () => {
    if (!isUserLoggedIn()) {
        alert('Veuillez vous connecter pour finaliser votre commande.');
        redirectToLogin();
        return;
    }

    if (cartItems.length > 0) {
        alert('Commande validée !');
        cartItems = [];
        updateCartDisplay();
        saveCart();
        document.getElementById('cartModal').style.display = 'none';
    } else {
        alert('Votre panier est vide !');
    }
});

// Gestionnaire pour ouvrir/fermer le panier
document.getElementById('cartIcon').addEventListener('click', () => {
    if (!isUserLoggedIn()) {
        alert('Veuillez vous connecter pour accéder au panier.');
        redirectToLogin();
        return;
    }
    document.getElementById('cartModal').style.display = 'block';
});

document.querySelector('.close-cart').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// Fermer le panier si on clique en dehors
window.addEventListener('click', (event) => {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Ajouter les gestionnaires d'événements aux boutons "Ajouter au panier"
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add_to_cart_btn').forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const price = this.getAttribute('data-price');
            addToCart(title, price);
        });
    });

    // Charger le panier au démarrage seulement si l'utilisateur est connecté
    if (isUserLoggedIn()) {
        loadCart();
    }
});