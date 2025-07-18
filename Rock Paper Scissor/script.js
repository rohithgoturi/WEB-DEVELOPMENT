let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () =>
{

// rock papper scissors
const options = ["rock","paper","scissor"];
const randIdx = Math.floor(Math.random() * 3);
return options[randIdx];
}

const drawGame = ()=> {
    console.log("game was draw");
    msg.innerText = "It's a DRAW, Play Again!";
    msg.style.backgroundColor = "orange";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        console.log("you win");
        msg.innerText = `YOU WIN! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        console.log("you lose");
        msg.innerText = `YOU LOST! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    console.log("user choice = ",userChoice);
    // computer choice
    const compChoice = genCompChoice();
    console.log("computer choice = ",compChoice);

    if (userChoice === compChoice) {

        // game is draw
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {

            // comp choices = scissor, papper
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper") {

            // comp choices = rock, scissor
            userWin = compChoice === "scissor" ? false : true;
        } else {
           userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
        

    });
});