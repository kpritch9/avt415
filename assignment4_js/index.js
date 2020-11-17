function Square(props) {
	
	let className = 'square ';
	if (props.value == 'X') {
		className += 'x-style'
	} else {
		className += 'o-style'
	}
	console.log(props.winCombo);
	if (props.winCombo && 
			(props.winCombo[1][0] == props.id ||
			 props.winCombo[1][1] == props.id ||
			 props.winCombo[1][2] == props.id))
		className +=  'square-winner';
		
	return (
		<button id={props.id} className={className} onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
  renderSquare(i) {
    return (<Square
				winCombo={this.props.winCombo}
				isXNext={this.props.isXNext}
				id={i.toString()}
				value={this.props.squares[i]} 
				onClick = {() => this.props.onClick(i)}
		   />);
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      isXNext: true,
	  stepNumber: 0,
	  winCombo: null,
    };
  }
  
  jumpTo(step) {
	this.setState({
		stepNumber: step,
		isXNext: (step % 2) === 0,
		winCombo: null,
	});
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
	const winners = calculateWinner(squares);
	
    if (squares[i]) {
      return;
    } else if (winners)
	{
		return;
	}
	
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      isXNext: !this.state.isXNext,
	  stepNumber: history.length,
    });
  }
	
  render() {
	  const history = this.state.history;
	  const current = history[this.state.stepNumber];
	  const winner = calculateWinner(current.squares);  
	
	const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
	  
	  let status;
	  if (winner) {
		  status = "Winner: " + winner;
	  } else if (this.state.stepNumber == 9) {
		  status = "This game is a draw.";
	  } else {
		  status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
	  }
	return (
	  <div className="game">
		<div className="game-board">
		  <Board 
			winCombo={winner}
			isXNext={this.state.isXNext}
			squares={current.squares}
			onClick={(i) => this.handleClick(i)}
		  />
		</div>
		<div className="game-info">
		  <div>{status}</div>
		  <ol>{moves}</ol>
		</div>
	  </div>
	);
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
