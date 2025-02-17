const boxes = document.querySelectorAll(".box");
const statusLine = document.querySelector("#statusLine");
const resetBTN = document.querySelector("#resetBTN");
const playerXScore = document.querySelector("#scoreX")
const playerOScore = document.querySelector("#scoreO")
const winGIF = "assets/won.gif" ;
const lostGIF = "assets/lost.gif";
const gifBoxX = document.querySelector("#xgif")
const gifBoxO = document.querySelector("#ogif")
const winConditions = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]
];
const picX = document.querySelector("#picX");
const picO = document.querySelector("#picO");
const ting = new Audio("assets/ting.mp3");
const draw = new Audio("assets/draw.mp3");
const win = new Audio("assets/success.mp3")
let values = Array(9).fill("");
let currentPlayer = "O";
let running = false ;
let profileID = picO;
let scoreX = 0;
let scoreO = 0;

startGame();


function startGame(){
    running=true;
    boxes.forEach(box => box.addEventListener("click",boxClicked))
    resetBTN.addEventListener("click",resetGame)
    statusLine.innerText=`Player ${currentPlayer}'s turn`;
    startGlow(profileID);
}

function boxClicked(){
    const boxIndex = this.getAttribute("boxIndex");
    if(values[boxIndex]!=""||!running){
        return;
    }
    ting.play();
    updateBox(this,boxIndex);
    winnerCheck();
}

function updateBox(boxes,index){
    values[index]=currentPlayer;
    boxes.innerText=currentPlayer;
}

function playerChange(){
    currentPlayer= (currentPlayer=="X")?"O":"X";
    stopGlow(profileID);
    profileID=(currentPlayer=="X")?picX:picO;
    startGlow(profileID);
    
    statusLine.innerText=`Player ${currentPlayer}'s turn`;

}


function winnerCheck(){
    let roundWon =false;
     for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const boxI = values[condition[0]];
        const boxII = values[condition[1]];
        const boxIII = values[condition[2]];
        if(boxI==""||boxII==""||boxIII==""){
            continue;

        }
        if (boxI==boxII && boxII==boxIII) {
            roundWon=true;
            break;
        }
    }    
    if(roundWon){
        win.play();
        statusLine.innerText=`Player ${currentPlayer} Won !`
        scoreUpdater(currentPlayer);
        gifTroller();
        running=false;
    }
    else if (!values.includes("")){
        statusLine.innerText=`OOPS ! Draw`;
        draw.play();
    }   
    else{
        playerChange();
    } 
}

function resetGame() {
    currentPlayer = "X";
    values = Array(9).fill("");
    statusLine.innerText=`Player ${currentPlayer}'s turn`;
    boxes.forEach(box => box.textContent = "");
    running = true;
}



function restartGame(){
    currentPlayer= (currentPlayer=="X")?"O":"X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function startGlow(pic) {
    pic.classList.add('animate-glow'); // Add animation class
  }

function stopGlow(pic) {
    pic.classList.remove('animate-glow'); // Remove animation class
}
function scoreUpdater(currentPlayer){
    if (currentPlayer==="X") {
        scoreX++;
        playerXScore.innerText = `SCORE : ${scoreX}`;
    }
    else{
        scoreO++;
        playerOScore.innerText = `SCORE : ${scoreO}`;
}
}
function gifTroller(){
    if (currentPlayer==="X"){
        gifBoxX.style.backgroundImage = `url(${winGIF})`
        gifBoxO.style.backgroundImage = `url(${lostGIF})`
    }
    else{
        gifBoxX.style.backgroundImage = `url(${lostGIF})`
        gifBoxO.style.backgroundImage = `url(${winGIF})`

    }

}

console.log(scoreX  , scoreO);

