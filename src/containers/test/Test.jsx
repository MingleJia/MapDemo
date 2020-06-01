import React, { useState, useEffect, useLayoutEffect, createContext, useReducer, useMemo, useCallback, useRef } from 'react';
import Child from './TestChild.jsx';
import styles from './Test.scss';
import { connect } from 'react-redux';
import { setTest } from 'MODULES/root/actions';
// 创建一个Context;
const Context = createContext({})
const Test = (props) => {
    // useRef: 一般用与定时器，或者获取真实dom的时候用
    const couterRef = useRef();
    const timer = useRef();
    const [count, setCount] = useState(0);
    const [a, setA] = useState(['1', '2', 3]);
    // useEffect: 两个参数，第一个是执行函数，第二个是促发执行函数执行的变量，不写则一直执行,写[]则执行一次
    // useEffect会在setXXX后执行，多个useEffect会按照顺序执行
    useEffect(() => {
        console.log('useEffect1')
        clearInterval(timer.current)
        // couterRef.current 就是dom元素按钮
        // console.log(couterRef.current);
        timer.current = setInterval(() => {
            setCount(count + 1)
        }, 1000)
        // setA([...a, 'add' + count])
    }, [count]);
    useEffect(() => {
        console.log('useEffect2')
        if (count > 10) {
            clearInterval(timer.current)
        }
    })
    // useLayoutEffect在useEffect之前执行，useLayoutEffect和useEffect都可以多次调用
    useLayoutEffect(() => {
        // console.log('useLayoutEffect');
    })
    useLayoutEffect(() => {
        // console.log('useLayoutEffect2');
    })
    //useCallback: 一般情况用于控制子组件渲染促发行为，子组件中使用useEffect，将根据传入的useCallback来决定是否渲染，对于性能有优化
    const fun = useCallback(() => {
        // console.log(count);
        setCount(count => count + 1);
    }, [count]);
    useEffect(() => {
        console.log('useEffect3')
        console.log(count);
    }, [count])
    const [show, dispath] = useReducer((state, action) => {
        switch (action.type) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            case 'clear':
                return 0;
        }
    }, 1);
    //useMemo: 当showX只受state中某个值的变化影响时，就用useMemo，对于性能有优化
    const showX = useMemo(() => {
        let a = 1;
        let result = 1;
        for (; a <= show; a++) {
            result = result * a;
        }
        return result;
    }, [show])
    // hooks中使用redux
    // eslint-disable-next-line react/prop-types
    let { test } = props.root;
    return <div>
        <p>You clicked {count} times</p>
        <button ref={couterRef} onClick={() => fun()}>Click me</button>
        {
            a.map((item, index) => <p key={index}>{item}</p>)
        }
        <button onClick={() => setA(['1', '2', 3, 4, 5, 6, 7])}>setA</button>
        <div className={styles['show']}>{show}</div>
        <div className={styles['show']}>{showX}</div>
        <div className={styles['tab']}>
            <div onClick={() => {
                dispath({ type: 'add' });
                console.log(show)
            }}>type1</div>
            <div onClick={() => { dispath({ type: 'sub' }) }}>type2</div>
            <div onClick={() => { dispath({ type: 'clear' }) }}>type3</div>
        </div>
        <Context.Provider value={{
            count: count,
            b: 23333,
            fun: fun,
            showX: showX
        }}>
            <Child />
        </Context.Provider>
        <div className={styles['testRedux']} onClick={() => {
            // hooks中使用redux
            // eslint-disable-next-line react/prop-types
            props.setTest({
                test: 'testtest'
            })
        }}>{test}</div>
    </div>;
}
// export default Test;
export default connect(
    ({ root }) => ({
        root: root,
    }), { setTest }
)(Test);

export const FatherContext = Context;