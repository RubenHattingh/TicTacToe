startOfGame = true
const cellStates = {
  EMPTY: 0,
  O: 1,
  X: 2,
}

const ticTacToeBoard = [{
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
  {
    state: cellStates.EMPTY
  },
]

const winCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [6, 7, 8],
  [8, 5, 2],
  [3, 4, 5],
  [0, 4, 8],
  [6, 4, 2],
  [1, 4, 7],
]


var oSelectionArray = []
var xSelectionArray = []
const winOrLooseObj = {
  won: 1,
  lost: 2,
  draw: 0,
}
var wonOrLost
var currentPlayerToken = cellStates.O



let nextGameButton =
document.createElement('button')
nextGameButton.id = 'replayButton'
nextGameButton.style.position = 'fixed'
nextGameButton.style.backgroundColor = 'green'
nextGameButton.innerHTML = 'Play Again'
nextGameButton.classList.add('buttonReplay')

let listeners = {};
const cells = document.querySelectorAll(".cell")

function createClickHandlers() {
if (startOfGame === true) {
cells.forEach(function(cell) {
  const listener = onCellClicked.bind(this, cell.id)
  listeners[cell.id] = listener;
  cell.addEventListener('click', listener);
})
}
}

createClickHandlers()

 function onCellClicked(cellID) {
  const cellEmpty = isCellEmpty(cellID);

  if (cellEmpty === true) {
    ticTacToeBoard[cellID].state = currentPlayerToken
  } else if (cellEmpty === false) {
    alert('you cannot click there again')
  }
    if (currentPlayerToken === cellStates.O) {
      oSelectionArray.push(parseInt(cellID, 10))
    } else if (currentPlayerToken === cellStates.X) {
      xSelectionArray.push(parseInt(cellID, 10))
    }
    insertPlayerImage(cellID)

    if (startOfGame === true){
      runBotsTurn()
    }
    decideWinner()
  }

function decideWinner() {
  if (checkForWin(oSelectionArray) === true) {
  startOfGame = false
    insertWinOrLossImage('ticTacToeAssets/Assets/you win image.png', 'youWin', 'playerScore', wonOrLost = winOrLooseObj.won)


  } else if (checkForWin(xSelectionArray) === true) {
startOfGame = false
    insertWinOrLossImage('ticTacToeAssets/Assets/you loose image.png', 'youLoose', 'CPUscore', wonOrLost = winOrLooseObj.lost)


  } else if (oSelectionArray.length === 5) {
startOfGame = false
      insertWinOrLossImage('ticTacToeAssets/Assets/noWinner.png', 'draw', 'drawScore', wonOrLost = winOrLooseObj.draw)

   }
 }


 function runBotsTurn() {
   currentPlayerToken = cellStates.X
   let availableCells = []
   for (let i = 0; i < ticTacToeBoard.length; i++) {
     if (ticTacToeBoard[i].state === 0) {
       availableCells.push(i)
     }
   }
   let botNumSelectionForX = availableCells[Math.floor(Math.random() * availableCells.length)]
   botSelectiionStringID = `${botNumSelectionForX}`
if (availableCells.length > 0) {
   ticTacToeBoard[botSelectiionStringID].state = cellStates.X
   insertPlayerImage(botSelectiionStringID)
}
xSelectionArray.push(botNumSelectionForX)
console.log(xSelectionArray);
 }

function isCellEmpty(cellID) {

  if (ticTacToeBoard[cellID].state === cellStates.EMPTY) {
    return true
  } else {
    return false
  }
}

function insertPlayerImage(cellID) {
  let image = document.createElement('img')
  image.height = 100
  image.width = 100

  if (currentPlayerToken === cellStates.O) {
    image.src = "ticTacToeAssets/Assets/o.png"
    image.id = "Oimage"
    image.classList.add('oImage')
    document.getElementById(cellID).appendChild(image)
    currentPlayerToken = cellStates.X
  } else if (currentPlayerToken === cellStates.X) {
    image.src = "ticTacToeAssets/Assets/x.png"
    image.id = "Ximage"
    image.classList.add('xImage')
    document.getElementById(cellID).appendChild(image)
    currentPlayerToken = cellStates.O
  }
}

function checkForWin(selectedArray) {
  for (let j = 0; j < winCombos.length; j++) {
    let correctPosCounter = 0
    for (let i = 0; i < winCombos[j].length; i++) {
      if (selectedArray.indexOf(winCombos[j][i]) > -1) {
        correctPosCounter++
      }
    }
    if (correctPosCounter === 3) {
      return true
        correctPosCounter = 0
   }
  }
}

function insertWinOrLossImage(src, ID, scoreID, gameState) {
  let image = document.createElement('img')
  image.classList.add('result-image')
  image.src = src
  image.id = ID
  image.height = 150
  image.width = 150



  document.getElementById('drawGameBox').appendChild(nextGameButton)
  document.getElementById('replayButton').onclick = function() {
    onClickOfReplayButtton(gameState)
  }

  document.getElementById('table').appendChild(image)
  document.getElementById(scoreID).innerHTML++

  if (startOfGame === false) {
    removeClickHandelrs()
   }
}

function removeClickHandelrs() {
  const cellsToRemoveEventhandlers = document.querySelectorAll(".cell")
  cellsToRemoveEventhandlers.forEach(function(cell) {
      const listener = listeners[cell.id];
      cell.removeEventListener('click', listener);
  })
}

function onClickOfReplayButtton(gameState) {
startOfGame = true
  if (wonOrLost === winOrLooseObj.won) {
    removeResultedImage('youWin')
  } else if (wonOrLost === winOrLooseObj.lost) {
    removeResultedImage('youLoose')
  } else if (wonOrLost === winOrLooseObj.draw) {
    removeResultedImage('draw')
  }
  removeResultedImage('replayButton')
  removeXandO()

  ticTacToeBoard.forEach(function(cellElement) {
    cellElement.state = cellStates.EMPTY
  })
  currentPlayerToken = cellStates.O
  oSelectionArray = []
  xSelectionArray = []

createClickHandlers()
}

function removeXandO() {
  ticTacToeBoard.forEach(function(element) {
    if (element.state === cellStates.X) {
      let imageX = document.getElementById('Ximage')
      imageX.parentNode.removeChild(imageX)
    } else if (element.state === cellStates.O) {
      let imageO = document.getElementById('Oimage')
      imageO.parentNode.removeChild(imageO)
    }
  })
}

function removeResultedImage(ImageId) {
  let resultImage = document.getElementById(ImageId)
  resultImage.parentNode.removeChild(resultImage)
}
