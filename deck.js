
// Load collection and deck from LocalStorage
let collection = JSON.parse(localStorage.getItem("mythoria-collection")) || [];
let deck = JSON.parse(localStorage.getItem("mythoria-deck")) || [];

// HTML elements
const availableCards = document.getElementById("available-cards");
const deckCards = document.getElementById("deck-cards");

const deckCount = document.getElementById("deck-count");
const totalAttack = document.getElementById("total-attack");
const totalDefense = document.getElementById("total-defense");

const collectionEmpty = document.getElementById("collection-empty");
const deckEmpty = document.getElementById("deck-empty");


// Save deck
function saveDeck() {
    localStorage.setItem("mythoria-deck", JSON.stringify(deck));
}


// Display available cards
function displayCollection() {
    collection = JSON.parse(localStorage.getItem("mythoria-collection")) || [];

    availableCards.innerHTML = "";

    // Show each unique card only once
    let uniqueCards = [];

    collection.forEach(card => {
        if (!uniqueCards.some(item => item.id === card.id)) {
            uniqueCards.push(card);
        }
    });

    if (uniqueCards.length === 0) {
        collectionEmpty.classList.remove("hidden");
        return;
    }

    collectionEmpty.classList.add("hidden")

    uniqueCards.forEach(card => {
        let alreadyAdded = deck.some(item => item.id === card.id);

        availableCards.innerHTML += `
            <div class="bg-[#100D14] border border-[#D4B66A]/50 rounded-lg p-3">

                <img src="${card.image}" alt="${card.name}"
                    class="w-full h-40 object-contain bg-black/40 rounded-md">

                <h3 class="mideltank-font text-lg mt-3">
                    ${card.name}
                </h3>

                <p class="text-sm text-gray-400">${card.type}</p>
                <p class="text-sm text-yellow-300">${card.rarity}</p>

                <button
                    onclick="addCard('${card.id}')"
                    ${alreadyAdded || deck.length >= 20 ? "disabled" : ""}
                    class="w-full mt-3 p-2 rounded-md font-bold
                    ${alreadyAdded || deck.length >= 20
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-[#D4B66A] text-black hover:bg-[#EDD693]"}">

                    ${alreadyAdded ? "ADDED" : "ADD TO DECK"}

                </button>

            </div>
        `;
    });
}


// Add a card to the deck
function addCard(id) {

    if (deck.length >= 20) {
        alert("Your deck cannot contain more than 20 cards.");
        return;
    }

    let card = collection.find(item => String(item.id) === id);

    if (!card) return;

    if (deck.some(item => item.id === card.id)) {
        alert("You can only add one copy of each card.");
        return;
    }

    deck.push(card);

    saveDeck();
    displayDeck();
    displayCollection();
}


// Remove a card from the deck
function removeCard(id) {

    deck = deck.filter(card => String(card.id) !== id);

    saveDeck();
    displayDeck();
    displayCollection();
}


// Display the deck
function displayDeck() {

    deckCards.innerHTML = "";

    let attack = 0;
    let defense = 0;

    deck.forEach(card => {

        attack += Number(card.stats?.attack ?? card.attack ?? 0);
        defense += Number(card.stats?.defense ?? card.defense ?? 0);

        deckCards.innerHTML += `
            <div class="bg-[#100D14] border border-[#D4B66A]/50 rounded-lg p-3">

                <img src="${card.image}" alt="${card.name}"
                    class="w-full h-40 object-contain bg-black/40 rounded-md">

                <h3 class="mideltank-font text-lg mt-3">
                    ${card.name}
                </h3>

                <p class="text-sm text-gray-400">${card.type}</p>
                <p class="text-sm text-yellow-300">${card.rarity}</p>

                <button
                    onclick="removeCard('${card.id}')"
                    class="w-full mt-3 p-2 rounded-md border border-red-400 text-red-300 hover:bg-red-950">

                    REMOVE

                </button>

            </div>
        `;
    });

    deckCount.textContent = deck.length;
    totalAttack.textContent = attack;
    totalDefense.textContent = defense;

    deckEmpty.classList.toggle("hidden", deck.length > 0);
}


// Display everything when page opens
displayCollection();
displayDeck();