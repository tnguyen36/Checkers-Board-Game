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
      selected: []
    }

  }

  onSelect = (event) => {
    this.setState({selected: []})
    const {board} = this.state;
    const row = parseInt(event.target.id.charAt(0));
    const col = parseInt(event.target.id.charAt(1));
    if (col === 0) {
      if (board[row - 1][col + 1] == null) {
        this.setState(prevState => ({
          selected: [...prevState.selected, "" + (row - 1) + (col + 1)]
        }));
      }
    } else if (col === 7) {
      if (board[row - 1][col - 1] == null) {
        this.setState(prevState => ({
          selected: [...prevState.selected, "" + (row - 1) + (col - 1)]
        }));
      }
    } else {
      if (board[row - 1][col - 1] == null) {
        this.setState(prevState => ({
          selected: [...prevState.selected, "" + (row - 1) + (col - 1)]
        }));
      }
      if (board[row - 1][col + 1] == null) {
        this.setState(prevState => ({
          selected: [...prevState.selected, "" + (row - 1) + (col + 1)]
        }));
      }
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Checker</h1>
        <Board board={this.state.board} onSelect={this.onSelect} selectOptions={this.state.selected} />
      </div>
    );
  }
  
}

export default App;
