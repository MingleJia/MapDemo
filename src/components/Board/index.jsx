import React, { Component } from 'react'
import Square from 'COMPONENTS/Square/index'
import styles from './index.scss'

export default class Board extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             square: Array(9).fill(null),
             xIsNext: true,
        }
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}// eslint-disable-line
                onClick={() => this.props.handleClick(i)}// eslint-disable-line
            />
        );
    }

    handleClick(i) {
        const squares = this.state.square.slice();
        squares[i] = 'X';
        this.setState({
            square: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    
    render() {
        const {xIsNext} = this.state;
        const status =` Next player is:  + ${xIsNext ? 'x' : 'o'}`;

        return (
            <div>
                <div className={styles.status}>{status}</div>
                <div className={styles.boardRow}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={styles.boardRow}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={styles.boardRow}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
