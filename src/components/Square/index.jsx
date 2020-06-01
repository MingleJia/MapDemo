import React, { Component } from 'react'
import styles from './index.scss'

class Square extends Component {
    render() {
        return (
            <button
              className={styles.square}
              onClick={() => this.props.onClick()}// eslint-disable-line
            >
              {this.props.value}{/* eslint-disable-line */}
            </button>
          );
    }
}

export default Square;
