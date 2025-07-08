let cart = [];

const products = [
    { id: 1, name: "Product 1", price: 10.00 },
    { id: 2, name: "Product 2", price: 15.00 },
    { id: 3, name: "Product 3", price: 20.00 }
];

// Function to update the cart UI
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";  // Clear the cart list

    let subtotal = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(listItem);
        subtotal += item.price * item.quantity;
    });

    // Update the totals
    const taxes = subtotal * 0.1;  // Assume a 10% tax rate
    const total = subtotal + taxes;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("taxes").textContent = taxes.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Event listener for add to cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.closest(".product").getAttribute("data-id"));
        addToCart(productId);
    });
});

// Event listener for remove buttons in the cart
document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        removeFromCart(productId);
    }
});

// Checkout button (just a placeholder for now)
document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Proceeding to checkout...");
});