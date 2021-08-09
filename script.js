const container = document.querySelector("#container");
const clearButton = document.querySelector("#clearButton");
const randColorButton = document.querySelector("#randColorButton");
const blackButton = document.querySelector("#blackButton");
const eraserButton = document.querySelector("#eraserButton");
const originalColor = "rgb(240, 240, 240)";
const eraserEnd = document.querySelector("#eraserEnd")

let currentColor = "black";

function makeDiv(color, colorHover) {
    for (let i = 0; i < 64 * 88; i++) {
        const square = document.createElement("div");
        square.classList.add("squareDiv");
        square.setAttribute('draggable', 'false');
        square.addEventListener("mousedown", color);
        square.addEventListener("mouseenter", colorHover);
        container.appendChild(square);
    }
}

function draw(color, colorHover) {
    const squares = document.querySelectorAll(".squareDiv");
    for (let i = 0; i < squares.length; i++) {
        removePrevListener(squares[i])
        squares[i].addEventListener("mousedown", color);
        squares[i].addEventListener("mouseenter", colorHover);
    }
}

function erase(){
    eraserEnd.classList.add("eraserActivated");
    draw(makeEraser, makeEraserHover);
}

function clearAll() {
    const squares = document.querySelectorAll(".squareDiv");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = originalColor;
    }
}

function removePrevListener(obj) {
    switch (currentColor) {
        case "black":
            obj.removeEventListener("mousedown", makeBlack);
            obj.removeEventListener("mouseenter", makeBlackHover);
            break;
        case "color":
            obj.removeEventListener("mousedown", makeRandColor);
            obj.removeEventListener("mouseenter", makeRandColorHover);
            break;
        case "eraser":
            obj.removeEventListener("mousedown", makeEraser);
            obj.removeEventListener("mouseenter", makeEraserHover);
            eraserEnd.classList.remove("eraserActivated")
            break;
    };
};

function makeBlack(e) {
    e.preventDefault()
    e.target.style.backgroundColor = "black";
    currentColor = "black";
};

function makeBlackHover(e) {
    if (e.buttons > 0) {
        makeBlack(e);
    };
};

function makeRandColor(e) {
    e.preventDefault()
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgb(${r},${g}, ${b})`;
    e.target.style.backgroundColor = `${color}`
    currentColor = "color";
};

function makeRandColorHover(e) {
    if (e.buttons > 0) {
        makeRandColor(e);
    };
};

function makeEraser(e) {
    e.preventDefault()
    e.target.style.backgroundColor = originalColor;
    currentColor = "eraser";
};

function makeEraserHover(e) {
    if (e.buttons > 0) {
        makeEraser(e);
    };
};

makeDiv(makeBlack, makeBlackHover);

clearButton.addEventListener('click', clearAll);
randColorButton.addEventListener('click', () => draw(makeRandColor, makeRandColorHover));
eraserButton.addEventListener('click', () => erase());
blackButton.addEventListener('click', () => draw(makeBlack, makeBlackHover));


