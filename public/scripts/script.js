let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score"); 
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
var result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const batu_div = document.getElementById("b");
const kertas_div = document.getElementById("k");
const gunting_div = document.getElementById("g");


function getComputerChoice() {
    const choicescom = ['b', 'k', 'g'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choicescom[randomNumber];
    
}



function converttoWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "s") return "Scissors";
    if (letter === "b") return "Rock";
    if (letter === "k") return "Paper";
    return "Scissors";
}

function win(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML =  converttoWord(userChoice) + " beats " + converttoWord(computerChoice) + ". <br> You win!!! ";
    result_p.style.color = 'white';
    result_p.style.fontSize = '35px';
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);  
}


function lose(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML =  converttoWord(userChoice) + " loses to " + converttoWord(computerChoice) + ". <br> You lose!!! ";
    result_p.style.color = 'white';
    result_p.style.fontSize = '35px';
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
}

function draw(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML =  converttoWord(userChoice) + " equals " + converttoWord(computerChoice) + ". <br> It's a DRAW ";
    result_p.style.color = 'white';
    result_p.style.fontSize = '35px';
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 300);
}



function game(userChoice) {
  const computerChoice = getComputerChoice();  // Case when user win, lose, and draw.
  switch (userChoice + computerChoice) {    
    case "rg":
    case "pb":
    case "sk":
        win(userChoice, computerChoice);
        break;
    
    case "rk":
    case "pg":
    case "sb":
        lose(userChoice, computerChoice);
        break;
    
    case "rb": 
    case "pk":
    case "sg":
        draw(userChoice, computerChoice);
        break;   
  }
}


function main () {
    rock_div.addEventListener('click', function() {
        game("r");
        console.log("you clicked on rock");
    })

    paper_div.addEventListener('click', function() {
        game("p");
        console.log("you clicked on paper");
        
    })

    scissors_div.addEventListener('click', function() {
        game("s");
        console.log("you clicked on scissors");
        
    })

}

main();