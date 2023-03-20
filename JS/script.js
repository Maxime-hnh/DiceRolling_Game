//// WINDOW.ONLOAD FENETRE MODAL - RULES GAME \\\\
const rulesGame = document.querySelector('#rulesGame')
const showRulesGame = new bootstrap.Modal(rulesGame);
showRulesGame.show();


//// AUDIO \\\\
const rollingDiceAudio = document.querySelector('#rollingDiceAudio')
const holdButtonAudio = document.querySelector('#holdButtonAudio')
const winnerAudio = document.querySelector('#winnerAudio')


//// ARRAY PLAYERS \\\\
const players = [
  {name : "Player 1", globalScore : 0},
  {name : "Player 2", globalScore : 0}
]


  
//// START NEXT PLAYER TURN \\\\
const circleOne = document.querySelector('#circleOne')
const circleTwo = document.querySelector('#circleTwo')
circleTwo.style.display = "none"
let currentPlayerIndex = 0;

function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  if (currentPlayerIndex === 0) {
    circleOne.style.display = "block"
    circleTwo.style.display = "none"
  } else {
      circleTwo.style.display = "block"
      circleOne.style.display = "none"
    }
  console.log('tour du joueur : ' + players[currentPlayerIndex].name)
}
//// END NEXT PLAYER TURN  \\\\
  
  

//// START ROLL DICE \\\\
const rollDiceButton = document.querySelector('#rollDiceButton')
const currentTotalScore1 = document.querySelector('#scorePlayerOne')
const currentTotalScore2 = document.querySelector('#scorePlayerTwo')
let round = 0
let previousResultSrc = "";

// DECLARATION DE L EVENT CLICK SUR LE BOUTON ROLL DICE
rollDiceButton.addEventListener('click', () => {

  // PLAY AUDIO
  rollingDiceAudio.play()

  // DECLARATION DE LA FONCTION RAND
  function rand(nb) {
  return Math.floor(Math.random() * Math.floor(nb));
  }

  //// START FUNCTION ROLL DICE \\\\
  function rollDice() {
    let diceRoll = rand(6) + 1;

    //// ADAPTATION DE L'IMAGE AU RESULTAT DU LANCE \\\\
    let i = diceRoll
    diceResult.src = `assets/${i}.jpg`;
    const previousResultImage = new Image();
    previousResultImage.src = previousResultSrc;
    previousResultSrc = `assets/${i}.jpg`;

    //// DECLARATION DE LA REGLE DU JEU - RESULTAT 1
    if (diceRoll !== 1) {
      console.log('Résultat du lancé de dé : ' + diceRoll)
      return round += diceRoll;
    } else {
        //PLAY AUDIO
        losingAudio.play()

        console.log('FIN DE TOUR lancé de dé : ' + diceRoll)
        nextPlayer()
        return round = 0 
      }
    //// END FUNCTION ROLL DICE \\\\
}
//// END ROLL DICE \\\\



//// START STOCKAGE RESULTAT \\\\
if (players[currentPlayerIndex].name  === "Player 1") {
  result = rollDice();
  currentTotalScore1.textContent = result
  console.log("score total : " + result);
} else {
    result = rollDice();
    currentTotalScore2.textContent = result
    console.log("score total : " + result);
  }
})
//// END STOCKAGE RESULTAT \\\\

  

//// START HOLD BUTTON \\\\
const holdButton = document.querySelector('#hold')
const globalScoreId1 = document.querySelector('#globalScoreOne')
const globalScoreId2 = document.querySelector('#globalScoreTwo')
players[currentPlayerIndex].globalScore = 0

// DECLARATION DE L EVENT CLICK SUR LE BOUTON HOLD
holdButton.addEventListener('click', () => {
    // PLAY AUDIO
    holdButtonAudio.play()

  if (players[currentPlayerIndex].name === "Player 1") {
    globalScoreId1.textContent = (players[currentPlayerIndex].globalScore  += result)
    round = 0
    result = 0
    currentTotalScore1.textContent = round
    winnerGame()
    nextPlayer()
  } else {
      globalScoreId2.textContent = (players[currentPlayerIndex].globalScore  += result)
      round = 0
      result = 0
      currentTotalScore2.textContent = round
      winnerGame()
      nextPlayer()
    }
})
//// END HOLD BUTTON \\\\
  
  

//// START FONCTION WINNER \\\\
const winnerGameModal = document.querySelector('#winnerGameModal')
const winnerGameShow = new bootstrap.Modal(winnerGameModal)
const textContentWinner = document.querySelector('#textContentWinner')
const newElement = document.createElement('p')

function winnerGame() {
  if ( players[currentPlayerIndex].globalScore >= 100) {
    newElement.textContent = `Félicitations à ${players[currentPlayerIndex].name} qui remporte la partie !!!`
    textContentWinner.appendChild(newElement)
    // MODAL WINNER PLAYER
    winnerGameShow.show()
    // PLAY AUDIO
    winnerAudio.play()
  } else {
      return ;
    }
}
//// END FONCTION WINNER \\\\

  

//// START NEW GAME BUTTON \\\\
const newGameButton = document.querySelector('#NewGame')

const newGameModal = document.querySelector('#newGameModal')
const newGameShow = new bootstrap.Modal(newGameModal)

const startNewGameButton = document.querySelector('#startNewGame')
const returnGameButton = document.querySelector('#returnGame')

// DECLARATION DE L EVENT CLICK SUR LE BOUTON NEW GAME
newGameButton.addEventListener('click', () => {
  newGameShow.show()

  // START NEW GAME BUTTON
  startNewGameButton.addEventListener('click', () => {
    currentTotalScore2.textContent = 0
    currentTotalScore1.textContent = 0
    globalScoreId1.textContent = 0
    globalScoreId2.textContent = 0
    players[0].globalScore = 0
    players[1].globalScore = 0
    circleTwo.style.display = "none"
  })
  
  // RETURN GAME BUTTON
  returnGameButton.addEventListener('click', () => {
    return;
  })
})
//// END NEW GAME BUTTON \\\\
