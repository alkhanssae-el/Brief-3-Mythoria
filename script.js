
let cart = {};

// Load the saved cart from LocalStorage
try {
    const savedCart = JSON.parse(
        localStorage.getItem("mythoria-cart") || "{}"
    );

    if (savedCart && typeof savedCart === "object" && !Array.isArray(savedCart)) {
        for (const [name, item] of Object.entries(savedCart)) {
            if (
                item &&
                Number.isFinite(item.price) &&
                item.price >= 0 &&
                Number.isSafeInteger(item.quantity) &&
                item.quantity > 0
            ) {
                cart[name] = {
                    price: item.price,
                    quantity: item.quantity
                };
            }
        }
    }
} catch (error) {
    cart = {};
}

// Get the HTML elements
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout");

// Save the cart
function saveCart() {
    try {
        localStorage.setItem("mythoria-cart", JSON.stringify(cart));
    } catch (error) {
        alert("Could not save your cart.");
    }
}

// Display cart items and calculate the total
function renderCart() {
    cartItems.replaceChildren();

    let total = 0;
    const entries = Object.entries(cart);

    if (entries.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "text-gray-400";
        emptyMessage.textContent = "Your cart is empty.";
        cartItems.appendChild(emptyMessage);
    }

    entries.forEach(([name, item]) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("div");
        row.className =
            "flex flex-wrap items-center justify-between gap-4 border-b border-yellow-100/20 pb-4";

        const info = document.createElement("div");
        info.className = "flex-1 min-w-32";

        const title = document.createElement("p");
        title.className = "text-yellow-100 font-semibold";
        title.textContent = name;

        const price = document.createElement("p");
        price.className = "text-sm text-gray-400";
        price.textContent = item.price + " DH each";

        info.append(title, price);

        // Decrease and increase quantity
        const controls = document.createElement("div");
        controls.className = "flex items-center gap-3";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.className =
            "border border-yellow-100/50 px-3 py-1 hover:bg-yellow-100 hover:text-black";
        minus.setAttribute("aria-label", "Decrease " + name);

        minus.addEventListener("click", () => {
            cart[name].quantity--;

            if (cart[name].quantity <= 0) {
                delete cart[name];
            }

            saveCart();
            renderCart();
        });

        const quantity = document.createElement("span");
        quantity.className = "min-w-4 text-center";
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.className =
            "border border-yellow-100/50 px-3 py-1 hover:bg-yellow-100 hover:text-black";
        plus.setAttribute("aria-label", "Increase " + name);

        plus.addEventListener("click", () => {
            if (cart[name].quantity < 99) {
                cart[name].quantity++;
                saveCart();
                renderCart();
            }
        });

        controls.append(minus, quantity, plus);

        // Item subtotal
        const itemTotal = document.createElement("span");
        itemTotal.className =
            "font-bold text-yellow-100 whitespace-nowrap";
        itemTotal.textContent = subtotal + " DH";

        // Remove the entire item
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove";
        remove.className = "text-red-400 hover:text-red-300 text-sm";

        remove.addEventListener("click", () => {
            delete cart[name];
            saveCart();
            renderCart();
        });

        row.append(info, controls, itemTotal, remove);
        cartItems.appendChild(row);
    });

    cartTotal.textContent = total + " DH";
    checkoutButton.disabled = entries.length === 0;
}

// Add boosters to the cart
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const article = button.closest("article");
        const input = article.querySelector(".quantity");
        const quantity = Number(input.value);

        if (
            !Number.isSafeInteger(quantity) ||
            quantity < 1 ||
            quantity > 99
        ) {
            alert("Choose a quantity between 1 and 99.");
            input.value = 1;
            return;
        }

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        if (!name || !Number.isFinite(price) || price < 0) {
            alert("Invalid booster information.");
            return;
        }

        const currentQuantity = cart[name]?.quantity || 0;

        if (currentQuantity + quantity > 99) {
            alert("Maximum 99 of each booster.");
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

// Empty the entire cart
document.getElementById("clear-cart").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
        return;
    }

    if (confirm("Are you sure you want to empty your cart?")) {
        cart = {};
        saveCart();
        renderCart();
    }
});

// Validate the order (demo only, no payment)
checkoutButton.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
        return;
    }

    const total = Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (confirm("Confirm your order for " + total + " DH?")) {
        alert(
            "Order validated successfully!\n\n" +
            "Total: " + total + " DH\n\n" +
            "This is a demonstration. No payment was taken."
        );

        cart = {};
        saveCart();
        renderCart();
    }
});

// Display the cart when the page opens
renderCart();
