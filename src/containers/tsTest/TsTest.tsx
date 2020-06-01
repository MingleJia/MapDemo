import React, { useState, useReducer, useMemo } from "react";
interface actionValueType {
    value: any,
}
interface RouteParams {
    type: number,
    b: actionValueType,
    [propName: string]: any
}
interface initStateType {
    a: number,
    b: number,
    c: string,
    d: number[]
}
const initState: initStateType = {
    a: 1,
    b: 2,
    c: 's',
    d: [1, 2, 3],
}
const TsTest = () => {
    const [list, setList]: [(string | number)[], any] = useState([1, 'd', 222]);
    const [show, dispath]: [initStateType, any] = useReducer((state: initStateType, action: RouteParams) => {
        switch (action.type) {
            case 1:
                return {
                    ...state,
                    a: 111
                };
            case 2:
                return {
                    ...state,
                    a: 222
                };
            case 3:
                return {
                    ...state,
                    a: 333,
                }
        }
    }, initState)
    const click = (): void => {
        setList(list)
    }
    const fun = useMemo(() => {
        setList((list)=>list.map((item,index)=>{
            if(index == 2){
                return item + 1;
            }else{
                return item;
            }
        }))
        return list.map((item,index)=>{
            if(index == 2){
                if(typeof item == 'number'){
                    return item + 1;
                }
            }else{
                return item;
            }
        });
    } ,[show.a])
    
    return <div>
        {
            list
        }
        <button onClick={click}>{fun[2]}</button>
        <div onClick={() => { dispath({ type: 1 }) }}>1</div>
        <div onClick={() => { dispath({ type: 2 }) }}>2</div>
        <div onClick={() => { dispath({ type: 3 }) }}>3</div>
        <div style={{ fontSize: '20px' }}>{show.a}</div>
    </div>
}
export default TsTest;