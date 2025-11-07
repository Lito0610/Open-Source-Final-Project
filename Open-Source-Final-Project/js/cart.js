// Store cart items in localStorage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Update cart count in the navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(element => {
        element.textContent = cart.length;
        element.style.display = cart.length > 0 ? 'flex' : 'none';
    });
}

// Update cart page content
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>The cart is currently empty. Add products from the Product page.</p>';
        return;
    }

    let total = 0;
    let cartHTML = '<div class="cart-list">';
    
    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        cartHTML += `
            <div class="cart-item">
                <label class="select-checkbox">
                    <input type="checkbox" class="checkout-select" data-index="${index}" aria-label="Select ${item.name} for checkout">
                </label>
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
    });

    cartHTML += `</div>
        <div class="cart-summary">
            <div class="total">
                <span>Total:</span>
                <span id="cartSelectedTotal">$0.00</span>
            </div>
            <button onclick="proceedToCheckout()" class="checkout-btn">
                Proceed to Checkout
            </button>
        </div>`;

    cartContainer.innerHTML = cartHTML;

    // After rendering, attach change listeners to checkboxes so the selected total updates
    const checkboxes = cartContainer.querySelectorAll('.checkout-select');
    checkboxes.forEach(cb => cb.addEventListener('change', updateSelectedTotal));

    // update selected total initially (in case some boxes are pre-checked)
    updateSelectedTotal();
}

// Update the displayed total to reflect only selected items
function updateSelectedTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkboxes = document.querySelectorAll('.checkout-select');
    let selectedTotal = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const idx = parseInt(cb.getAttribute('data-index'), 10);
            if (!Number.isNaN(idx) && cart[idx]) {
                const price = parseFloat(cart[idx].price) || 0;
                selectedTotal += price;
            }
        }
    });
    const totalEl = document.getElementById('cartSelectedTotal');
    if (totalEl) totalEl.textContent = `$${selectedTotal.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Navigate to checkout
// Get selected items from the cart page
function getSelectedItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selected = [];
    const checkboxes = document.querySelectorAll('.checkout-select');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const idx = parseInt(cb.getAttribute('data-index'), 10);
            if (!Number.isNaN(idx) && cart[idx]) selected.push(cart[idx]);
        }
    });
    return selected;
}

// Navigate to checkout
function proceedToCheckout() {
    const selected = getSelectedItems();
    if (!selected || selected.length === 0) {
        alert('Please select at least one product to checkout.');
        return;
    }

    // If one product selected, store object; if multiple selected, store array
    if (selected.length === 1) {
        localStorage.setItem('buyNowProduct', JSON.stringify(selected[0]));
    } else {
        localStorage.setItem('buyNowProduct', JSON.stringify(selected));
    }

    window.location.href = 'BuyNow.html';
}

// Function to handle buy now button
function buyNow(product) {
    localStorage.setItem('buyNowProduct', JSON.stringify(product));
    window.location.href = 'BuyNow.html';
}

// Initialize cart display and count when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('Cart.html')) {
        updateCartDisplay();
    }
});