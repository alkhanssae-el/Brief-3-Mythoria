
// Load collection from LocalStorage
let collection = JSON.parse(localStorage.getItem("mythoria-collection")) || [];

// HTML elements
const grid = document.getElementById("collection-grid");
const count = document.getElementById("card-count");
const emptyMessage = document.getElementById("empty-collection");
const noResults = document.getElementById("no-results");
const pagination = document.getElementById("pagination");

const typeFilter = document.getElementById("type-filter");
const rarityFilter = document.getElementById("rarity-filter");

const previous = document.getElementById("previous-page");
const next = document.getElementById("next-page");
const pageNumber = document.getElementById("page-number");

const details = document.getElementById("card-details");
const detailsContent = document.getElementById("details-content");

// Pagination
let currentPage = 1;
let cardsPerPage = 8;


// Display cards
function displayCards() {
    collection = JSON.parse(localStorage.getItem("mythoria-collection")) || [];

    // Filter cards
    let filtered = collection.filter(card => {
        return (typeFilter.value === "all" || card.type === typeFilter.value) &&
               (rarityFilter.value === "all" || card.rarity === rarityFilter.value);
    });

    let totalPages = Math.ceil(filtered.length / cardsPerPage);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    grid.innerHTML = "";
    count.textContent = collection.length;
    details.classList.add("hidden");

    // Empty collection
    if (collection.length === 0) {
        emptyMessage.classList.remove("hidden");
        noResults.classList.add("hidden");
        pagination.classList.add("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    // No matching cards
    if (filtered.length === 0) {
        noResults.classList.remove("hidden");
        pagination.classList.add("hidden");
        return;
    }

    noResults.classList.add("hidden");
    pagination.classList.remove("hidden");

    // Display 8 cards per page
    let start = (currentPage - 1) * cardsPerPage;
    let cardsToShow = filtered.slice(start, start + cardsPerPage);

    cardsToShow.forEach(card => {
        grid.innerHTML += `
            <button class="bg-[#100D14] border border-[#D4B66A]/60 rounded-lg p-3 text-left"
                onclick="showDetails('${card.instanceId}')">

                <img src="${card.image}" alt="${card.name}"
                    class="w-full h-48 object-contain bg-black/40">

                <h3 class="mideltank-font text-xl mt-3">${card.name}</h3>
                <p class="text-gray-400 text-sm">${card.type}</p>
                <p class="text-yellow-300 text-sm">${card.rarity}</p>
            </button>
        `;
    });

    // Page buttons
    pageNumber.textContent = `PAGE ${currentPage} / ${totalPages}`;
    previous.disabled = currentPage === 1;
    next.disabled = currentPage === totalPages;
}


// Show card details
function showDetails(id) {
    let card = collection.find(card => String(card.instanceId) === id);

    if (!card) return;

    detailsContent.innerHTML = `
        <img src="${card.image}" alt="${card.name}"
            class="w-48 h-64 object-contain bg-black/40">

        <div>
            <h3 class="mideltank-font text-3xl">${card.name}</h3>
            <p class="text-yellow-300 mt-3">${card.rarity} ${card.type}</p>
            <p class="text-gray-300 mt-4">${card.description || "No description available."}</p>
            <p class="mt-3">Attack: ${card.stats?.attack ?? card.attack ?? "N/A"}</p>
            <p class="mt-2">Defense: ${card.stats?.defense ?? card.defense ?? "N/A"}</p>
            ${card.effect ? `<p class="mt-2">${card.effect}</p>` : ""}
        </div>
    `;

    details.classList.remove("hidden");
    details.scrollIntoView({ behavior: "smooth" });
}


// Filters
typeFilter.addEventListener("change", () => {
    currentPage = 1;
    displayCards();
});

rarityFilter.addEventListener("change", () => {
    currentPage = 1;
    displayCards();
});

// Reset filters
document.getElementById("reset-filters").addEventListener("click", () => {
    typeFilter.value = "all";
    rarityFilter.value = "all";
    currentPage = 1;
    displayCards();
});

// Previous page
previous.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCards();
    }
});

// Next page
next.addEventListener("click", () => {
    currentPage++;
    displayCards();
});

// Close details
document.getElementById("close-details").addEventListener("click", () => {
    details.classList.add("hidden");
});

// First display
displayCards();
