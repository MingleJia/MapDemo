import React from 'react';
import ReactDOM from 'react-dom';

const ColorContext = React.createContext('black');

const MyButton = props => ( // eslint-disable-line
    <ColorContext.Consumer>
        {
            color => {
                if (typeof color === 'undefined'){
                    throw Error('报错了');
                }

            return (<button style={{color: `${color}`, paddingLeft:10, paddingRight: 10}}>使劲按我</button>);
            }
        }
    </ColorContext.Consumer>
);

ReactDOM.render(<div>
    <ColorContext.Provider value='red'><MyButton></MyButton></ColorContext.Provider>
    <ColorContext.Provider value='green'><MyButton></MyButton></ColorContext.Provider>
    <ColorContext.Provider value='yellow'><MyButton></MyButton></ColorContext.Provider>
</div>, document.getElementById('main'));