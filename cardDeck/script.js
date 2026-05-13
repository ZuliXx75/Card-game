const deck = document.querySelector(".deck");
const cards = Array.from(document.querySelectorAll(".card"));
const guess = document.getElementById("guess");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset");

let locked = false;

// shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// render shuffled cards
function renderDeck() {
    deck.innerHTML = "";
    shuffle(cards);

    cards.forEach(card => {
        card.classList.remove("flipped");
        deck.appendChild(card);
    });

    locked = false;
    result.textContent = "Make your guess...";
}

// click logic
cards.forEach(card => {
    card.addEventListener("click", () => {

        if (locked) return;

        const guessValue = guess.value;
        if (!guessValue) {
            result.textContent = "Pick a card first!";
            return;
        }

        const actual = card.getAttribute("data-name");

        card.classList.add("flipped");
        locked = true;

        if (guessValue === actual) {
            result.textContent = "🎉 Correct! It was " + actual;
        } else {
            result.textContent = "❌ Wrong! It was " + actual;
        }

    });
});

// restart
resetBtn.addEventListener("click", renderDeck);

// start game
renderDeck();