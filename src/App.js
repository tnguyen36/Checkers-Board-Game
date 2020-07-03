import React from 'react';
import Board from './components/Board';
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
      selection: '',
      playerTurn: 'red'
    }

  }

  makeMove = (id, row, col) => {
    const board = this.state.board;
    const selected = this.state.selectedOptions
    
    if (selected.includes(id)) {
      board[row][col] = this.state.playerTurn
      const prevRow = parseInt(this.state.selection.charAt(0));
      const prevCol = parseInt(this.state.selection.charAt(1));
      board[prevRow][prevCol] = null;
      this.setState({board})
      this.setState(prevState => ({
        playerTurn: prevState.playerTurn === 'red' ? 'black' : 'red'
      }))
    }
      
    
  }

  onSelect = (event) => {
    const color = event.target.className.substring(0, event.target.className.indexOf(' '));
    const {board, playerTurn} = this.state;
    const row = parseInt(event.target.id.charAt(0));
    const col = parseInt(event.target.id.charAt(1));
      this.setState({selection: event.target.id});
      this.makeMove(event.target.id, row, col);
      this.setState({selectedOptions: []})
      if (playerTurn === color) {      
        if (col === 0 && row === 0) {
          if (board[row + 1][col + 1] === null) {
            this.setState(prevState => ({
              selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col + 1)]
            }));
          }
        } else if (col === 7 && row === 0) {
          if (board[row + 1][col - 1] === null) {
            this.setState(prevState => ({
              selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col - 1)]
            }));
          }
        } else if (col === 7 && row === 7){
          if (board[row - 1][col - 1] === null) {
            this.setState(prevState => ({
              selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col - 1)]
            }));
          }
        } else if (col === 0 && row === 7) {
          if (board[row - 1][col + 1] === null) {
            this.setState(prevState => ({
              selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col + 1)]
            }));
          }
        } else {       
            if (board[row - 1][col - 1] === null && playerTurn === 'red') {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col - 1)]
              }));
            }    
            if (board[row - 1][col + 1] === null && playerTurn === 'red') {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row - 1) + (col + 1)]
              }));
            }
            if (board[row + 1][col + 1] === null && playerTurn === 'black') {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col + 1)]
              }));
            }
            if (board[row + 1][col - 1] === null && playerTurn === 'black') {
              this.setState(prevState => ({
                selectedOptions: [...prevState.selectedOptions, "" + (row + 1) + (col - 1)]
              }));
            }     
        }
    }
    
  }

  render() {
    return (
      <div className="container">
        <h1>Checkers</h1>
        <h3>{this.state.playerTurn}'s Turn</h3>
        <Board board={this.state.board} onSelect={this.onSelect} selectOptions={this.state.selectedOptions} />
      </div>
    );
  }
  
}

export default App;
