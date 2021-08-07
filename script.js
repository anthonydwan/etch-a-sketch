const container = document.querySelector("#container")
const clearButton = document.querySelector("#clearButton")

function makeDiv(){
    for (let i = 0; i < 32*32;i++){
        const square = document.createElement("div");
        square.classList.add("squareDiv");
        square.addEventListener("mousemove", drawnSquare)
        container.appendChild(square);
    }
}

function drawnSquare(){
    this.classList.add("drawnBlack")
}

makeDiv()

function clearAll(){
    const squares = document.querySelectorAll(".squareDiv");
    for (square of squares){
        square.classList.add("reset");
        square.className = "squareDiv";
    }
}


clearButton.addEventListener('click', clearAll)

