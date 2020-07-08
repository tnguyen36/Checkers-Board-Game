import React from 'react';
import Board from './components/Board';
import Particles from './components/Particles';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    document.title = 'Checkers Board Game';   
    this.state = this.getInitialState;
  }

  get getInitialState() {
    const colors = ['black', 'red'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      board: [
        ['black',null,'black',null,'black',null,'black',null],
        [null,'black',null,'black',null,'black',null,'black'],
        ['black',null,'black',null,'black',null,'black',null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,'red',null,'red',null,'red',null,'red'],
        ['red',null,'red',null,'red',null,'red',null,],
        [null,'red',null,'red',null,'red',null,'red']
      ],
      selectedOptions: [],
      deletePiece: [],
      selection: '',
      playerTurn: color,
      score: {
        red: 0,
        black: 0
      },
      gameOver: false
    }
  }

  resetGame = () => {
    this.setState(this.getInitialState);
  }

 

  checkPromotion = (row, playerTurn, board, prevRow, prevCol) => {
    if (playerTurn === 'red' && row === 0) {
      return true;
    } else if (playerTurn === 'black' && row === 7) {
      return true
    } else if (board[prevRow][prevCol].includes('King')) {
      return true
    } else {
      return false
    }
  }

  

  makeMove = (id, row, col) => {
    const {selectedOptions, deletePiece, board, score, playerTurn} = this.state
    if (selectedOptions.includes(id)) {
      const prevRow = parseInt(this.state.selection.charAt(0));
      const prevCol = parseInt(this.state.selection.charAt(1));
      this.checkPromotion(row, playerTurn, board, prevRow, prevCol) ? board[row][col] = playerTurn + 'King' : board[row][col] = playerTurn;
      if (deletePiece.length > 0) {
        for (var i = 0; i < deletePiece.length; i++) {
          var deleteRow = parseInt(deletePiece[i].charAt(0));
          var deleteCol = parseInt(deletePiece[i].charAt(1));
          if (Math.abs(row - deleteRow) === 1 && Math.abs(col - deleteCol) === 1) {
            playerTurn === 'red' ? score.red++ : score.black++
            board[deleteRow][deleteCol] = null;
          }
        }      
      }
      board[prevRow][prevCol] = null;
      if (score.red !== 12 && score.black !== 12) {
        this.setState(prevState => ({playerTurn: prevState.playerTurn === 'red' ? 'black' : 'red'}))
      }
      this.setState({
        board,
        deletePiece: [],
        score,
        gameOver: (score.red === 12 || score.black === 12) ? true : false
      })
      
    }
    this.setState({deletePiece: []});
      
    
  }

  onSelect = (event) => {
    if (!this.state.gameOver) {
      const color = event.target.className;
      const {board, playerTurn} = this.state;
      const row = parseInt(event.target.id.charAt(0));
      const col = parseInt(event.target.id.charAt(1));
      const isKing = color.includes('King');
        this.setState({selection: event.target.id});
        this.makeMove(event.target.id, row, col);
        this.setState({selectedOptions: []})
        if (playerTurn === color || color.includes(playerTurn)) {
          if (col === 0 && row === 0) {
            if (board[row + 1][col + 1] === null && board[row + 1][col + 1] !== playerTurn) {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col + 1)]
              }));
            } else {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row + 2) + (col + 2)],
                deletePiece: [...prevState.deletePiece, "" + (row + 1) + (col + 1)]
              }));
            }
          } else if (col === 7 && row === 0) {
            if (board[row + 1][col - 1] === null && board[row + 1][col - 1] !== playerTurn) {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col - 1)]
              }));
            } else {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row + 2) + (col - 2)],
                deletePiece: [...prevState.deletePiece, "" + (row + 1) + (col - 1)]
              }));
            }
          } else if (col === 7 && row === 7){
            if (board[row - 1][col - 1] === null && board[row - 1][col - 1] !== playerTurn) {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col - 1)]
              }));
            } else {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row - 2) + (col - 2)],
                deletePiece: [...prevState.deletePiece, "" + (row - 1) + (col - 1)]
              }));
            }
          } else if (col === 0 && row === 7) {
            if (board[row - 1][col + 1] === null && board[row - 1][col + 1] !== playerTurn) {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col + 1)]
              }));
            } else {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row - 2) + (col + 2)],
                deletePiece: [...prevState.deletePiece, "" + (row - 1) + (col + 1)]
              }));
            }
          } else {
            if (row !== 0 && col !== 0) {
              if ((board[row - 1][col - 1] === null && playerTurn === 'red') || (isKing && board[row - 1][col - 1] === null )) {
                this.setState(prevState => ({
                  selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col - 1)]
                }));
              } else if ((board[row - 1][col - 1] !== playerTurn && playerTurn === 'red') || isKing) {
                  if (row >= 2 && col >= 2) {
                    if (board[row - 2][col - 2] === null) {
                      this.setState(prevState => ({
                        selectedOptions: [...prevState.selectedOptions, "" + (row - 2) + (col - 2)],
                        deletePiece: [...prevState.deletePiece, "" + (row - 1) + (col - 1)]
                      }));
                    }
                  }
              
              }
            }
            if (row !== 0 && col !== 7) {
              if ((board[row - 1][col + 1] === null && playerTurn === 'red') || (isKing && board[row - 1][col + 1] === null )) {
                this.setState(prevState => ({
                  selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col + 1)]
                }));
              } else if ((board[row - 1][col + 1] !== playerTurn && playerTurn === 'red') || isKing) {
                if (row >= 2 && col <= 5) {
                  if (board[row - 2][col + 2] === null) {
                    this.setState(prevState => ({
                      selectedOptions: [...prevState.selectedOptions, "" + (row - 2) + (col + 2)],
                      deletePiece: [...prevState.deletePiece, "" + (row - 1) + (col + 1)]
                    }));
                  }
                }              
              }
            }
            if(row !== 7 && col !== 7) {
              if ((board[row + 1][col + 1] === null && playerTurn === 'black') || (isKing && board[row + 1][col + 1] === null )) {
                this.setState(prevState => ({
                      selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col + 1)]
                    }));
              } else if ((board[row + 1][col + 1] !== playerTurn && playerTurn === 'black') || isKing) {
                if (row <= 5 && col <= 5) {
                  if (board[row + 2][col + 2] === null) {
                    this.setState(prevState => ({
                      selectedOptions: [...prevState.selectedOptions, "" + (row + 2) + (col + 2)],
                      deletePiece: [...prevState.deletePiece, "" + (row + 1) + (col + 1)]
                    }));
                  }
                }             
              }
            }
            if (row !== 7 && col !== 0) {
              if ((board[row + 1][col - 1] === null && playerTurn === 'black') || (isKing && board[row + 1][col - 1] === null )) {
                this.setState(prevState => ({
                  selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col - 1)]
                }));
              } else if ((board[row + 1][col - 1] !== playerTurn && playerTurn === 'black') || isKing) {
                if (row <= 5 && col >= 2) {
                  if (board[row + 2][col - 2] === null) {
                    this.setState(prevState => ({
                      selectedOptions: [...prevState.selectedOptions, "" + (row + 2) + (col - 2)],
                      deletePiece: [...prevState.deletePiece, "" + (row + 1) + (col - 1)]
                    }));
                  }
                }             
              }
            }       
          }
      }
    } 
  }

  render() {
    
    return (
      <div className="container">
        <Particles color={this.state.playerTurn} />
        <h1>Checkers Game</h1>
        {this.state.gameOver ? <h3 className={this.state.playerTurn === 'red' ? 'red-turn-label' : 'black-turn-label'}>WINNER :)</h3> : 
        <h3 className={this.state.playerTurn === 'red' ? 'red-turn-label' : 'black-turn-label'}>{this.state.playerTurn}'s Turn</h3>}
        <div className="score-display">
          <p>{`Black x${this.state.score.black}`}</p>
          <p>{`Red x${this.state.score.red}`}</p>
        </div>
        <div className="controls">
          <button onClick={this.resetGame}>Reset Game</button>   
        </div>
        <Board board={this.state.board} onSelect={this.onSelect} selectOptions={this.state.selectedOptions} />
      </div>
    );
  }
  
}

export default App;
