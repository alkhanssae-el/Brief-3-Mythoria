let cart = JSON.parse(localStorage.getItem("mythoria-cart")) || {};

// HTML elements
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout");

// Save cart
function saveCart() {
    localStorage.setItem("mythoria-cart", JSON.stringify(cart));
}

// Display cart
function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = '<p class="text-gray-400">Your cart is empty.</p>';
    }

    for (let name in cart) {
        let item = cart[name];
        let subtotal = item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-yellow-100/20 pb-4">

                <div>
                    <p class="text-yellow-100 font-semibold">${name}</p>
                    <p class="text-sm text-yellow-100/60">${item.price} DH each</p>
                </div>

                <div class="flex items-center gap-3">
                    <button onclick="changeQuantity('${name}', -1)"
                        class="border border-yellow-100/50 px-3 py-1 text-yellow-100 hover:bg-yellow-100 hover:text-black">
                        −
                    </button>

                    <span class="text-yellow-100">${item.quantity}</span>

                    <button onclick="changeQuantity('${name}', 1)"
                        class="border border-yellow-100/50 px-3 py-1 text-yellow-100 hover:bg-yellow-100 hover:text-black">
                        +
                    </button>
                </div>

                <span class="font-bold text-yellow-100">${subtotal} DH</span>

                <button onclick="removeItem('${name}')"
                    class="text-red-400 hover:text-red-300 text-sm">
                    Remove
                </button>

            </div>
        `;
    }

    cartTotal.textContent = total + " DH";
    checkoutButton.disabled = Object.keys(cart).length === 0;
}

// Change quantity
function changeQuantity(name, amount) {
    cart[name].quantity += amount;

    if (cart[name].quantity <= 0) {
        delete cart[name];
    }

    saveCart();
    renderCart();
}

// Remove an item
function removeItem(name) {
    delete cart[name];
    saveCart();
    renderCart();
}

// Add boosters to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        let article = button.closest("article");
        let quantity = Number(article.querySelector(".quantity").value);

        let name = button.dataset.name;
        let price = Number(button.dataset.price);

        if (quantity < 1 || quantity > 99 || !Number.isInteger(quantity)) {
            alert("Choose a quantity between 1 and 99.");
            return;
        }

        if (cart[name]) {
            cart[name].quantity += quantity;
        } else {
            cart[name] = { price, quantity };
        }

        saveCart();
        renderCart();
    });
});

// Empty cart
document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to empty your cart?")) {
        cart = {};
        saveCart();
        renderCart();
    }
});

// Validate order
checkoutButton.addEventListener("click", () => {
    let total = 0;

    for (let name in cart) {
        total += cart[name].price * cart[name].quantity;
    }

    if (total === 0) return;

    if (confirm("Confirm your order for " + total + " DH?")) {

    // Save purchased boosters
    let inventory = JSON.parse(localStorage.getItem("mythoria-boosters")) || {};

    for (let name in cart) {
        inventory[name] = (inventory[name] || 0) + cart[name].quantity;
    }

    localStorage.setItem("mythoria-boosters", JSON.stringify(inventory));

    alert("Order validated successfully!\nTotal: " + total + " DH\n\nNo payment was taken.");

    cart = {};
    saveCart();
    renderCart();
}
});

// Display cart when page opens
renderCart();