import React, { Component } from 'react'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             list: ['爬山','跑步'],
             inputValue: '',
        }
    }

    addItem = () => {
        console.log('渲染新项目');
        const {list, inputValue} = this.state;
        this.setState({
            list: [...list, inputValue]
        })
    }
    
    render() {
        const {list,inputValue} =this.state;
        console.log('list:', list)
        return (
            <div>
                <input value={inputValue} onChange={(e) => this.setState({inputValue: e.target.value})}/>
                <button onClick={() => this.addItem()}>添加</button>
                {
                    list.map((item, index) => {
                        return (<div key={index}>{item}</div>);
                    
                    })
                }
            </div>
        )
    }
}
