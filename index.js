const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to initialize the game
function initToe() {
  currPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box,index)=>{
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList =   `box box${index+1}`;
  })
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currPlayer}`;

//    initialize box with css again
}
initToe();

function swapTurn(){
    if(currPlayer === 'X'){
        currPlayer = "0"
    }
    else{
        currPlayer = "X"
    }
    // UI Update
    gameInfo.innerText =  `Current Player -${currPlayer}`
}
function checkGameOver(){

    let answer = "";

    winPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if winner is X
            if(gameGrid[position[0]] === 'X')
                answer ="X";
            else
                answer = "0";

            
            // disable pointer event

            boxes.forEach((box)=>{
                box.style.pointerEvents  = "none"
            })

            // now we know X/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }


            
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`
        newGameBtn.classList.add("active")
        return;
    }

    // when there is no winner
    let fillCOunt = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCOunt++;

    })

    if(fillCOunt === 9){
        gameInfo.innerText = "Game Tied"
        newGameBtn.classList.add("active")
    }

}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currPlayer;
    gameGrid[index] = currPlayer;
    boxes[index].style.pointerEvents = "none"
    // swap turn
    swapTurn();
    // check whose gonna win
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click",initToe);
