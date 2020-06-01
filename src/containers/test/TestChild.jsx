import React, { useContext, useEffect } from 'react';
import { FatherContext } from './Test.jsx';

// 使用useContext 子集需要接收父级的 FatherContext;
const Child = () => {
    // const Context = createContext({})
    // console.log(useContext(FatherContext))
    const { count, fun, showX } = useContext(FatherContext);
    useEffect(() => {
        console.log('child');
    }, [fun])
    return <div style={{ width: '120px', height: '120px', 'backgroundColor': 'blue', 'color': 'white' }}>
        ddd{count}\{showX}
        <button onClick={() => { fun() }}>ChildBtn</button>
    </div>
}
export default Child;