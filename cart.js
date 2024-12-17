// Hämta från localStorage (om det finns några produkter lagrade)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
});

// Lägg till en produkt i kundvagnen
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Spara till localStorage
    updateCartUI();
}

// Ta bort en produkt från kundvagnen
function removeFromCart(index) {
    cart.splice(index, 1); // Ta bort produkten från arrayen
    localStorage.setItem('cart', JSON.stringify(cart)); // Uppdatera localStorage
    updateCartUI();
}

// Uppdatera kundvagnens gränssnitt
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    cartContainer.innerHTML = ''; // Töm kundvagnslistan
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceContainer.innerHTML = 'Total: 0 SEK';
        return;
    }

    let totalPrice = 0;
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>Price: ${product.price} SEK</p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(productElement);
        totalPrice += product.price;
    });

    totalPriceContainer.innerHTML = `Total: ${totalPrice} SEK`;
}
