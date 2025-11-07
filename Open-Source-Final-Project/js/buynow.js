// Populate BuyNow page from localStorage
function loadBuyNowProduct() {
    const raw = localStorage.getItem('buyNowProduct');
    const container = document.getElementById('productSummary');
    const totalEl = document.getElementById('summaryTotal');
    const confirmation = document.getElementById('confirmation');

    if (!raw) {
        container.innerHTML = `<div class="no-product">No product selected for immediate purchase. <a href="Product.html">Go to products</a></div>`;
        totalEl.textContent = '$0.00';
        return;
    }

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch (e) {
        console.error('Failed to parse buyNowProduct', e);
        container.innerHTML = `<div class="no-product">Unexpected product data. <a href="Product.html">Go to products</a></div>`;
        totalEl.textContent = '$0.00';
        return;
    }

    // Normalize to array of products
    const products = Array.isArray(parsed) ? parsed : [parsed];

    // Ensure each has a quantity
    products.forEach(p => { p.quantity = p.quantity || 1; });

    let total = 0;
    const parts = products.map(p => {
        const price = parseFloat(p.price) || 0;
        const subtotal = (price * p.quantity);
        total += subtotal;
        return `
        <div class="product-summary">
            <img src="${p.image || 'images/cactus.jpg'}" alt="${p.name || 'Product'}" loading="lazy">
            <div class="pinfo">
                <h3 title="${p.name || 'Product'}">${p.name || 'Product'}</h3>
                <p>${p.description || ''}</p>
                <p style="margin-top:10px; font-weight:600; color:#2d5d3b;">
                    $${price.toFixed(2)} × ${p.quantity}
                    <span style="margin-left:8px; color:#447454;">= $${subtotal.toFixed(2)}</span>
                </p>
            </div>
        </div>
        `;
    });

    container.innerHTML = parts.join('');
    totalEl.textContent = `$${total.toFixed(2)}`;

    // set default values on form (optional)
    document.getElementById('fullName').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('postal').value = '';
    document.getElementById('cardName').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';

    // attach form submit handler
    const form = document.getElementById('checkoutForm');
    form.onsubmit = function (e) {
        e.preventDefault();
        // pass the normalized products array and total
        placeOrder(products, total.toFixed(2));
    };
}

function placeOrder(productOrProducts, subtotal) {
    // Simulated order success
    const confirmation = document.getElementById('confirmation');
    confirmation.hidden = false;
    let message = '';
    if (Array.isArray(productOrProducts)) {
        const names = productOrProducts.map(p => p.name).join(', ');
        message = `Thank you! Your order for (${names}) has been placed. Total: $${subtotal}`;
    } else {
        message = `Thank you! Your order for "${productOrProducts.name}" has been placed. Total: $${subtotal}`;
    }
    confirmation.textContent = message;

    // Clear buyNowProduct from localStorage
    localStorage.removeItem('buyNowProduct');

    // redirect after short delay
    setTimeout(() => {
        window.location.href = 'Home.html';
    }, 2500);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBuyNowProduct();
    // ensure cart count is updated on this page too
    if (typeof updateCartCount === 'function') updateCartCount();
});