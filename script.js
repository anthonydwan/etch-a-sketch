const container = document.querySelector("#container");
const clearButton = document.querySelector("#clearButton");
const colorButton = document.querySelector("#colorButton");
const blackButton = document.querySelector("#blackButton");
const eraserButton = document.querySelector("#eraserButton");
let currentColor = "black";

function makeDiv(color) {
    for (let i = 0; i < 32 * 32; i++) {
        const square = document.createElement("div");
        square.classList.add("squareDiv");
        square.addEventListener("mousemove", color)
        container.appendChild(square);
    }
}

function draw(color) {
    const squares = document.querySelectorAll(".squareDiv");
    for (let i = 0; i < squares.length; i++) {
        removePrevListener(squares[i])
        squares[i].addEventListener("mousemove", color)
    }
}



function clearAll() {
    const squares = document.querySelectorAll(".squareDiv");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.cssText = "background-color: white; transition: all 0.25s ease-in-out;"
    }
}

function removePrevListener(obj) {
    switch (currentColor) {
        case "black":
            obj.removeEventListener("mousemove", makeBlack);
            break;
        case "color":
            obj.removeEventListener("mousemove", makeRandColor);
            break;
        case "white":
            obj.removeEventListener("mousemove", makeWhite);
            break;
    };
};

function makeBlack() {
    this.style.cssText = "background-color: black; transition: all 0.25s ease-in-out;"
    currentColor = "black"
};

function makeRandColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgb(${r},${g}, ${b})`;
    this.style.cssText = `background-color: ${color}; transition: all 0.25s ease-in-out;`
    currentColor = "color";
}

function makeWhite() {
    this.style.cssText = "background-color: white; transition: all 0.25s ease-in-out;"
    currentColor = "white";
}

makeDiv(makeBlack);

clearButton.addEventListener('click', clearAll);
colorButton.addEventListener('click', () => draw(makeRandColor));
eraserButton.addEventListener('click', () => draw(makeWhite));
blackButton.addEventListener('click', () => draw(makeBlack));
