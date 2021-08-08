const container = document.querySelector("#container")
const clearButton = document.querySelector("#clearButton")

function makeDiv(color) {
    for (let i = 0; i < 32 * 32; i++) {
        const square = document.createElement("div");
        square.classList.add("squareDiv");
        square.addEventListener("mousemove", color, false)
        container.appendChild(square);
    }
}

function drawBlack() {
    this.style.cssText = "background-color: black; transition: all 0.25s ease-in-out;"
}

function clearAll() {
    const squares = document.querySelectorAll(".squareDiv");
    for(let i = 0; i < squares.length; i++){
        squares[i].style.cssText = "background-color: white; transition: all 0.25s ease-in-out;"
    }
}

clearButton.addEventListener('click', clearAll)


makeDiv(drawBlack);