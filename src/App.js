import React from 'react';
import Board from './components/Board';
import Particles from 'react-particles-js';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      playerTurn: 'red',
      score: {
        red: 0,
        black: 0
      }
    }

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
      this.setState(prevState => ({
        playerTurn: prevState.playerTurn === 'red' ? 'black' : 'red',
        board,
        deletePiece: [],
        score
      }))
      
    }
    this.setState({deletePiece: []});
      
    
  }

  onSelect = (event) => {
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
            // if (row !== 0 && board[row - 1][col - 1] === null && playerTurn === 'red') {
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col - 1)]
            //   }));
            // } else if (board[row - 1][col - 1] !== playerTurn && board[row - 1][col - 1] !== null && playerTurn === 'red' ) {
            //   console.log("1");
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row - 2) + (col - 2)],
            //     deletePiece: "" + (row - 1) + (col - 1)
            //   }));
            // }   
            // if (row !==  0 && board[row - 1][col + 1] === null && playerTurn === 'red') {
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col + 1)]
            //   }));
            // } else if (board[row - 1][col + 1] !== playerTurn && board[row - 1][col + 1] !== null && playerTurn === 'red') {
            //   console.log("2");
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row - 2) + (col + 2)],
            //     deletePiece: "" + (row - 1) + (col + 1)
            //   }));
            // }
            // if (row!== 7 && board[row + 1][col + 1] === null && playerTurn === 'black') {
            //   console.log('b1')
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col + 1)]
            //   }));
            // } else if (board[row + 1][col + 1] !== playerTurn && board[row + 1][col + 1] !== null && playerTurn === 'black') {
            //   console.log("3");
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row + 2) + (col + 2)],
            //     deletePiece: "" + (row + 1) + (col + 1)
            //   }));
            // }
            // if (row !== 7 && board[row + 1][col - 1] === null && playerTurn === 'black') {
            //   console.log('b2')
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col - 1)]
            //   }));
            // } else if (board[row + 1][col - 1] !== playerTurn && board[row + 1][col - 1] !== null && playerTurn === 'black') {
            //   console.log(board[row + 1][col - 1])
            //   console.log("4");
            //   this.setState(prevState => ({
            //     selectedOptions: [...prevState.selectedOptions, "" + (row + 2) + (col - 2)],
            //     deletePiece: "" + (row + 1) + (col - 1)
            //   }));
            // }     
        }
    }
    
  }

  render() {
    const particlesOptions = {
      "particles": {
        "number": {
          "value": 40,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color":{
          "value": this.state.playerTurn === 'red' ? '#FF0000' : '#000000'
        },
        "shape": {
          "type": ["circle", "star"],
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "polygon": {
          "nb_sides": 5
        },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "random": true,
          "speed": 5,
          "direction": "top",
          "out_mode": "out",
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          }
        },
        "modes": {
          "bubble": {
            "distance": 250,
            "duration": 2,
            "size": 0,
            "opacity": 0
          },
          "repulse": {
            "distance": 400,
            "duration": 4
          }
        }
      }
      }
    return (
      <div className="container">
        <Particles className="particles" params={particlesOptions}
    />
        <h1>Checkers Game</h1>
        <h3 className={this.state.playerTurn === 'red' ? 'red-turn-label' : 'black-turn-label'}>{this.state.playerTurn}'s Turn</h3>
        <div className="score-display">
          <p>{`Black x${this.state.score.black}`}</p>
          <p>{`Red x${this.state.score.red}`}</p>
        </div>       
        {/* <button className="black black-piece"></button> */}
        <Board board={this.state.board} onSelect={this.onSelect} selectOptions={this.state.selectedOptions} />
      </div>
    );
  }
  
}

export default App;
