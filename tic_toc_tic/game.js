let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector(".rst");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let sprinkleContainer = document.querySelector(".sprinkle-container");

let turn0 = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    sprinkleContainer.innerHTML = ""; // Clear any previous sprinkles
};

// Disable all boxes after the game ends
const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show the winner message and trigger the sprinkle effect
const showWinner = (winner) => {
    msg.innerText = `Congratulations\n Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    createSprinkleEffect('rose'); // Call with 'star' for star sprinkles or 'rose' for rose-like sprinkles
};

// Check if a player has won
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                showWinner(pos1val);
            }
        }
    }
};

// Handle each box click (Player X and Player O)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0 === true) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Function to create sprinkle effects (star or rose)
const createSprinkleEffect = (type) => {
    let sprinkleCount = 30; // Number of sprinkles
    for (let i = 0; i < sprinkleCount; i++) {
        let sprinkle;

        // Choose the sprinkle type (star or rose)
        if (type === 'star') {
            sprinkle = document.createElement("div");
            sprinkle.classList.add("star-effect");
        } else if (type === 'rose') {
            sprinkle = document.createElement("div");
            sprinkle.classList.add("rose-effect");
        } else {
            sprinkle = document.createElement("div");
            sprinkle.classList.add("sprinkle-effect"); // Default colorful sprinkle
        }

        // Random position for the sprinkles
        sprinkle.style.top = `${Math.random() * window.innerHeight}px`;
        sprinkle.style.left = `${Math.random() * window.innerWidth}px`;
        sprinkleContainer.appendChild(sprinkle);

        // Remove the sprinkle after 1 second (matches animation duration)
        setTimeout(() => sprinkle.remove(), 1000);
    }
};

// Add event listeners for the New Game and Reset buttons
newGamebtn.addEventListener("click", resetGame);
rstbtn.addEventListener("click", resetGame);
