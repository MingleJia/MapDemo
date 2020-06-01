import React, { Component } from 'react'
import Board from './Board/index.jsx'
import styles from './index.scss'

class Game extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             history:[{
                 squares: Array(9).fill(null),
             }],
             xIsNext: false,
             stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

      jumpTo(step){
          this.setState({
              stepNumber: step,
              xIsNext: (step%2)===0
          })
    }

    
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        
        return (
            <div className={styles.game}>
                <div className={styles.gameBoard}>
                    <Board />
                </div>

                <div className={styles.gameInfo}>
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}

export default Game;