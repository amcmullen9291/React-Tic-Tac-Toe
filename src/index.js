import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Swal from 'sweetalert2';


var playersChoice;
var computersChoice;

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({ onClick }) {

  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
}


async function chooseTokenFunction (){
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'X': 'X',
        'O': 'O',
      })
    }, 1000)
  })
  
  const { value: token } = await Swal.fire({
    title: 'Select a token',
    input: 'radio',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to choose something!'
      }
    }
  })
  
  if (token) {
    Swal.fire({ html: `You selected: ${token}` });
    if(token ==="X"){
      window.playersChoice = "X";
      window.computersChoice = "O";

      console.log("player 1 wil be: " + playersChoice);
    }else{
      window.playersChoice = "O";
      window.computersChoice = "X";
      console.log("player 1 wil be: " + playersChoice);
    }
  }
}


var chooseToken = "false";

function Game() {
  if(chooseToken === "false"){
chooseTokenFunction();
  }
 chooseToken = true;
  const [ variableWeWantToKeepTrackOf, functionToSetSaidVariable ] = useState();
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  // const [ isXNext, setIsXNext ] = useState(true);
  const [ isXNext, setIsXNext ] = useState(true);
  const nextSymbol = isXNext ? window.playersChoice : window.computersChoice;
  const winner = calculateWinner(squares);

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

    function renderSquare(i) {
      let color = (isXNext ? "#E74C3C" : "#F4D03F");
      return (
        <Square 
          value={squares[i]}
          onClick={(event) => {
            event.target.style.color = color;
            event.target.className = "transition"; 
            event.target.disabled = "disabled";
            if (squares[i] != null || winner != null) {
              return;
            }
            const nextSquares = squares.slice();
            nextSquares[i] = (isXNext ? window.playersChoice : window.computersChoice);
            setSquares(nextSquares);
            setIsXNext(!isXNext); 
          }}
        />
      );
    }
    
    function getStatus() {
      // let playAgainButton = document.getElementsByClassName("restart");

      if(window.playersChoice == null){
        return "Let's play!"
      }
      if (winner) {
        return "Winner: " + winner;
      } else if (isBoardFull(squares)) {
        return "Draw!";
      } else {
        return "Player " + nextSymbol + "'s turn.";
      }
    }
    return (
      <>
      <h1 id="titleFrame"><center >ʀᴇᴀᴄᴛ ᴛɪᴄ-ᴛᴀᴄ-ᴛᴏᴇ</center></h1>
      <div className="container">
        <div className="game">
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="game-info">{getStatus()}</div>
          <div className="restart-button">{renderRestartButton()}</div>
        </div>
      </div>
      </>
    );
}

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

ReactDOM.render(<Game />, document.getElementById("root"));

