
// BOOSTER DATA

const boosters = {
    "Beginner Pack": {
        image: "img/mythoria_starter_pack.png",
        cards: 4,
        types: ["Hero", "Creature", "Servant", "Spell"],
        probabilities: {
            Common: 65,
            Rare: 25,
            Epic: 8,
            Legendary: 2
        }
    },

    "Summoning of the Legends": {
        image: "img/mythoria_premium_pack.png",
        cards: 5,
        types: ["Hero", "Creature", "Servant", "Spell"],
        probabilities: {
            Common: 10,
            Rare: 30,
            Epic: 35,
            Legendary: 25
        }
    },

    "Dark Summoning": {
        image: "img/mythoria_dark_invocation.png",
        cards: 5,
        types: ["Creature", "Servant", "Spell"],
        probabilities: {
            Common: 35,
            Rare: 30,
            Epic: 25,
            Legendary: 10
        }
    },

    "Lucky Pack": {
        image: "img/mythoria_lucky_pack.png",
        cards: 5,
        types: ["Hero", "Creature", "Servant", "Spell"],
        probabilities: {
            Common: 45,
            Rare: 25,
            Epic: 20,
            Legendary: 10
        }
    }
};


// CARD CATALOG

const cardCatalog = [

    {
        id: 1,
        name: "Forest Guardian",
        type: "Creature",
        rarity: "Common",
        image: "img/card_creature.png",
        description: "A guardian protecting the ancient forests.",
        attack: 3,
        health: 5
    },

    {
        id: 2,
        name: "Light Apprentice",
        type: "Hero",
        rarity: "Common",
        image: "img/card_hero.png",
        description: "A young warrior learning the ways of light.",
        attack: 2,
        health: 4
    },

    {
        id: 3,
        name: "Shadow Minion",
        type: "Servant",
        rarity: "Common",
        image: "img/card_servant.png",
        description: "A loyal servant of the darkness.",
        attack: 2,
        health: 3
    },

    {
        id: 4,
        name: "Fireball",
        type: "Spell",
        rarity: "Common",
        image: "img/card_spell.png",
        description: "Launch a burning fireball at your enemy.",
        effect: "Deal 3 damage."
    },

    {
        id: 5,
        name: "Silver Knight",
        type: "Hero",
        rarity: "Rare",
        image: "img/card_hero.png",
        description: "A brave knight defending the kingdom.",
        attack: 5,
        health: 6
    },

    {
        id: 6,
        name: "Dark Wolf",
        type: "Creature",
        rarity: "Rare",
        image: "img/card_creature.png",
        description: "A dangerous beast lurking in the shadows.",
        attack: 6,
        health: 4
    },

    {
        id: 7,
        name: "Dark Priest",
        type: "Servant",
        rarity: "Rare",
        image: "img/card_servant.png",
        description: "A servant who worships forbidden powers.",
        attack: 3,
        health: 6
    },

    {
        id: 8,
        name: "Healing Light",
        type: "Spell",
        rarity: "Rare",
        image: "img/card_spell.png",
        description: "A magical light restoring your strength.",
        effect: "Restore 5 health."
    },

    {
        id: 9,
        name: "Dragon Lord",
        type: "Creature",
        rarity: "Epic",
        image: "img/card_creature.png",
        description: "An ancient dragon with immense power.",
        attack: 9,
        health: 8
    },

    {
        id: 10,
        name: "Celestial Warrior",
        type: "Hero",
        rarity: "Epic",
        image: "img/card_hero.png",
        description: "A warrior blessed by celestial forces.",
        attack: 8,
        health: 9
    },

    {
        id: 11,
        name: "Demon Commander",
        type: "Servant",
        rarity: "Epic",
        image: "img/card_servant.png",
        description: "A commander leading the armies of darkness.",
        attack: 7,
        health: 8
    },

    {
        id: 12,
        name: "Meteor Storm",
        type: "Spell",
        rarity: "Epic",
        image: "img/card_spell.png",
        description: "Summon burning meteors from the sky.",
        effect: "Deal 8 damage."
    },

    {
        id: 13,
        name: "Ancient Phoenix",
        type: "Creature",
        rarity: "Legendary",
        image: "img/card_creature.png",
        description: "A legendary phoenix reborn from eternal flames.",
        attack: 10,
        health: 10
    },

    {
        id: 14,
        name: "King of Light",
        type: "Hero",
        rarity: "Legendary",
        image: "img/card_hero.png",
        description: "The ultimate protector of the realm.",
        attack: 12,
        health: 12
    },

    {
        id: 15,
        name: "Lord of Shadows",
        type: "Servant",
        rarity: "Legendary",
        image: "img/card_servant.png",
        description: "The most feared servant of darkness.",
        attack: 11,
        health: 10
    },

    {
        id: 16,
        name: "Apocalypse",
        type: "Spell",
        rarity: "Legendary",
        image: "img/card_spell.png",
        description: "Unleash the ultimate forbidden magic.",
        effect: "Deal 15 damage."
    }

];


// HTML ELEMENTS

const availableBoosters = document.getElementById("available-boosters");
const emptyBoosters = document.getElementById("empty-boosters");
const openingSection = document.getElementById("opening-section");
const revealedCards = document.getElementById("revealed-cards");
const specialMessage = document.getElementById("special-message");
const openingTitle = document.getElementById("opening-title");


// LOAD SAVED DATA

let inventory = JSON.parse(localStorage.getItem("mythoria-boosters")) || {};

let collection = JSON.parse(localStorage.getItem("mythoria-collection")) || [];

let isOpening = false;


// SAVE DATA

function saveData() {
    localStorage.setItem("mythoria-boosters", JSON.stringify(inventory));

    localStorage.setItem("mythoria-collection", JSON.stringify(collection));
}


// DISPLAY AVAILABLE BOOSTERS

function renderBoosters() {

    availableBoosters.innerHTML = "";

    let hasBoosters = false;

    for (let name in inventory) {

        let quantity = inventory[name];

        if (quantity <= 0) continue;

        hasBoosters = true;

        availableBoosters.innerHTML += `
            <div class="flex flex-col items-center gap-5 w-64 p-6 bg-[#211A29] border border-[#D4B66A] rounded-md">

                <img src="${boosters[name].image}"
                    alt="${name}"
                    class="h-64 max-w-full object-contain">

                <h3 class="mideltank-font text-xl text-[#EDD693] text-center">
                    ${name}
                </h3>

                <p class="text-gray-300">
                    Available: ${quantity}
                </p>

                <button
                    onclick="openBooster('${name}')"
                    ${isOpening ? "disabled" : ""}
                    class="stormfaze-font bg-[#EDD693] text-black w-full p-3 rounded-md hover:bg-[#D4B66A] disabled:opacity-50 cursor-pointer">

                    OPEN BOOSTER

                </button>

            </div>
        `;
    }

    emptyBoosters.classList.toggle("hidden", hasBoosters);
}


// SELECT A RANDOM RARITY

function getRandomRarity(probabilities) {

    let random = Math.random() * 100;

    let total = 0;

    for (let rarity in probabilities) {

        total += probabilities[rarity];

        if (random < total) {
            return rarity;
        }
    }
}


// SELECT A RANDOM CARD

function getRandomCard(booster) {

    let rarity = getRandomRarity(booster.probabilities);

    let eligibleCards = cardCatalog.filter(card =>

        card.rarity === rarity &&
        booster.types.includes(card.type)

    );

    let randomIndex = Math.floor(Math.random() * eligibleCards.length);

    return eligibleCards[randomIndex];
}


// OPEN BOOSTER

function openBooster(name) {

    if (isOpening || !inventory[name] || !boosters[name]) return;

    isOpening = true;

    let booster = boosters[name];

    // Remove one booster from inventory

    inventory[name]--;

    if (inventory[name] === 0) {
        delete inventory[name];
    }

    saveData();

    renderBoosters();


    // Select random cards

    let obtainedCards = [];

    for (let i = 0; i < booster.cards; i++) {

        let card = getRandomCard(booster);

        let obtainedCard = {
            ...card,
            instanceId: Date.now() + Math.random()
        };

        obtainedCards.push(obtainedCard);

        collection.push(obtainedCard);
    }

    saveData();


    // Prepare the reveal section

    openingSection.classList.remove("hidden");

    openingTitle.textContent = `You opened ${name}!`;

    specialMessage.textContent = "";

    revealedCards.innerHTML = "";

    // Create the card elements

    obtainedCards.forEach((card, index) => {

        let stats = card.type === "Spell"
            ? `<p class="text-sm text-purple-200">${card.effect}</p>`
            : `<p class="text-sm text-gray-300">Attack: ${card.attack} | Health: ${card.health}</p>`;

        let rarityColor = {
            Common: "text-gray-300",
            Rare: "text-blue-400",
            Epic: "text-purple-400",
            Legendary: "text-yellow-300"
        };

        revealedCards.innerHTML += `
            <article id="card-${index}"
                class="flex flex-col items-center gap-3 w-56 p-4 bg-[#211A29] border border-[#D4B66A] rounded-md opacity-0 translate-y-6 transition-all duration-500">

                <img src="${card.image}"
                    alt="${card.name}"
                    class="w-40 h-56 object-contain">

                <h3 class="mideltank-font text-xl text-[#EDD693] text-center">
                    ${card.name}
                </h3>

                <p class="text-sm text-gray-400">
                    ${card.type}
                </p>

                <p class="font-bold ${rarityColor[card.rarity]}">
                    ${card.rarity}
                </p>

                <p class="text-sm text-gray-300 text-center">
                    ${card.description}
                </p>

                ${stats}

            </article>
        `;
    });


    // Reveal cards one by one

    obtainedCards.forEach((card, index) => {

        setTimeout(() => {

            let element = document.getElementById(`card-${index}`);

            element.classList.remove("opacity-0", "translate-y-6");

        }, index * 600);

    });


    // Special rarity message

    let legendaryCards = obtainedCards.filter(card => card.rarity === "Legendary");

    let epicCards = obtainedCards.filter(card => card.rarity === "Epic");

    let rareCards = obtainedCards.filter(card => card.rarity === "Rare");


    if (legendaryCards.length > 0) {

        specialMessage.textContent = "LEGENDARY DISCOVERED! A POWERFUL SOUL HAS AWAKENED!";

    } else if (epicCards.length > 0) {

        specialMessage.textContent = "EPIC DISCOVERY! YOUR POWER IS GROWING!";

    } else if (rareCards.length > 0) {

        specialMessage.textContent = "RARE DISCOVERY! A NEW TREASURE HAS BEEN FOUND!";

    }


    // Finish opening animation

    setTimeout(() => {

        isOpening = false;

        renderBoosters();

    }, obtainedCards.length * 600 + 500);


    // Scroll to revealed cards

    openingSection.scrollIntoView({
        behavior: "smooth"
    });

}


// OPEN ANOTHER BOOSTER BUTTON

document.getElementById("open-another").addEventListener("click", () => {

    openingSection.classList.add("hidden");

    revealedCards.innerHTML = "";

    specialMessage.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// INITIAL DISPLAY

renderBoosters();
