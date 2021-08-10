const container = document.querySelector("#container");
const clearButton = document.querySelector("#clearButton");
const randColorButton = document.querySelector("#randColorButton");
const blackButton = document.querySelector("#blackButton");
const eraserButton = document.querySelector("#eraserButton");
const originalColor = "rgb(220, 220, 220)";
const eraserEnd = document.querySelector("#eraserEnd")
const penTip = document.querySelector("#penTip")
const colorPicker = document.querySelector("#colorPicker")
let pickedColor = "#000000"

let currentDrawColor = "black";
let currentPenTipColor = "black";

function makeDiv(color, colorHover) {
    for (let i = 0; i < 64 * 88; i++) {
        const square = document.createElement("div");
        square.classList.add("squareDiv");
        square.setAttribute('draggable', 'false');
        square.addEventListener("mousedown", color);
        square.addEventListener("mouseenter", colorHover);
        container.appendChild(square);
    };
};

function draw(color, colorHover) {
    const squares = document.querySelectorAll(".squareDiv");
    for (let i = 0; i < squares.length; i++) {
        removePrevListeners(squares[i])
        if (color != makeEraser){
            removePrevPenTip()
        } else{pausePenTipAnimation()};
        squares[i].addEventListener("mousedown", color);
        squares[i].addEventListener("mouseenter", colorHover);
    };
};

function changeBlackColor(){
    draw(makeBlack, makeBlackHover)
    penTip.classList.add("penTipBlack")
    currentPenTipColor = "black";
};

function changeRandomColor(){
    draw(makeRandColor, makeRandColorHover);
    penTip.classList.add("penTipRandomColor")
    currentPenTipColor = "random";
};

function changePickedColor(){
    draw(makePickedColor, makePickedColorHover);
    penTip.style.borderRight = `30px solid ${pickedColor}`;
    currentPenTipColor = "picked";
};

function erase(){
    eraserEnd.classList.add("eraserActivated");
    draw(makeEraser, makeEraserHover);
};

function clearAll() {
    const squares = document.querySelectorAll(".squareDiv");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = originalColor;
    };
};

function removePrevListeners(obj) {
    switch (currentDrawColor) {
        case "black":
            obj.removeEventListener("mousedown", makeBlack);
            obj.removeEventListener("mouseenter", makeBlackHover);
            break;
        case "random":
            obj.removeEventListener("mousedown", makeRandColor);
            obj.removeEventListener("mouseenter", makeRandColorHover);
            break;
        case "picked":
            obj.removeEventListener("mousedown", makePickedColor);
            obj.removeEventListener("mouseenter", makePickedColorHover);
            break
        case "eraser":
            obj.removeEventListener("mousedown", makeEraser);
            obj.removeEventListener("mouseenter", makeEraserHover);
            eraserEnd.classList.remove("eraserActivated")
            penTip.classList.remove("penTipRandomColorAnimationPause")
            break;
    };
};

function removePrevPenTip(){
    switch (currentPenTipColor) {
        case "black":
            penTip.classList.remove("penTipBlack")
            break;
        case "random":
            penTip.classList.remove("penTipRandomColor")
            break;
        case "picked":
            penTip.style = ""
            break;
    };
};

function pausePenTipAnimation(){
    if (currentPenTipColor === "random"){
        penTip.classList.add("penTipRandomColorAnimationPause")
    };
};

function makeBlack(e) {
    e.preventDefault()
    e.target.style.backgroundColor = "black";
    currentDrawColor = "black";
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
    currentDrawColor = "random";
};

function makeRandColorHover(e) {
    if (e.buttons > 0) {
        makeRandColor(e);
    };
};

function makePickedColor(e) {
    e.preventDefault()
    e.target.style.backgroundColor = pickedColor
    currentDrawColor = "picked";
};

function makePickedColorHover(e) {
    if (e.buttons > 0) {
        makePickedColor(e);
    };
};

function makeEraser(e) {
    e.preventDefault()
    e.target.style.backgroundColor = originalColor;
    currentDrawColor = "eraser";
};

function makeEraserHover(e) {
    if (e.buttons > 0) {
        makeEraser(e);
    };
};

makeDiv(makeBlack, makeBlackHover);

clearButton.addEventListener('click', clearAll);
randColorButton.addEventListener('click', () => changeRandomColor());
eraserButton.addEventListener('click', () => erase());
blackButton.addEventListener('click', () => changeBlackColor());
colorPicker.addEventListener('change', function(){
    pickedColor = colorPicker.value;
    changePickedColor();
});

