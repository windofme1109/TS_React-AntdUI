import React, { useState, useEffect, useRef } from 'react';
import MouseTracker from './components/mouseTracker';

import useMousePosition from './hooks/useMousePosition';
import useUrlLoader from './hooks/useUrlLoader';

interface IShowResult {
    message: string;
    status: string;
}

const App: React.FC = () => {
    // useState()接收一个初始值，返回值是一个数组，使用解构的方法进行接收
    // 数组的第一个值是state，第二个值是一个函数，是用来更新state，函数接收的数据类型、state的类型
    // 必须与初始值一样
    const [count, setCount] = useState(0);
    // 不必像类组件，我们可以将不同的数据状态写在不同state中
    const [on, setOn] = useState(true);

    const [show, setShow] = useState(true);

    // 使用自定义hooks
    // 自定义hooks以use开头
    // const position = useMousePosition();

    // 使用自定义hooks
    const [data, loading] = useUrlLoader(
        'https://dog.ceo/api/breeds/image/random'
    );
    // 限定data的类型
    // 将data断言为IShowResult
    const dogResult = data as IShowResult;

    // 如果没有第二个参数，那么组件每一次更新，都会调用
    // 此时我们加入第二个参数，值为数组，只有数组内的元素的值发生变化，才会调用这个useEffect()
    // 也就是说，只有count更新了，useEffect()才会被调用，进而更新了DOM
    useEffect(() => {
        console.log(`document title is running`);
        document.title = `点击了${count}次`;
    }, [count]);

    function handleAlertClick() {
        setTimeout(function () {
            // alert('you clicked on ' + count);
            alert('you clicked on ' + countRef.current);
        }, 3000);
    }

    // 使用useRef
    // useRef()接收一个初始值，返回值时一个对象
    // 对象只有一个属性：current
    const countRef = useRef(0);
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            // 由于didMount保持的时对统一个对象的引用，因此current的值，也是始终保持一致，并不是每一次更新就发生变化
            console.log('this is updated');
        } else {
            // 第一次渲染，将didMount中的current属性值设置为true
            didMount.current = true;
        }
    });

    useEffect(() => {
        console.log('inputRef', inputRef);
        if (inputRef && inputRef.current) {
            //  真正保存input元素的还是current属性
            inputRef.current.focus();
        }
    });

    // useRef()可以用来获取真实的DOM节点，从而能够对节点进行操作
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="App">
            <div>
                <h1>hello world</h1>
                <div>{count}</div>
                <button
                    onClick={() => {
                        setCount(x => x + 1);
                        // 使用countRef进行操作
                        countRef.current++;
                    }}
                >
                    add
                </button>
                {/*
                    获取input元素的ref属性，并将其赋给inputRef，这样inputRef时对input元素的引用，进而可以对其进行DOM操作
                    真正保存input元素的还是current属性
                */}
                <input type="text" ref={inputRef} />
                <button onClick={handleAlertClick}>Alert</button>
                <button onClick={() => setOn(on => !on)}>
                    {on ? 'ON' : 'OFF'}
                </button>

                {/*<p>*/}
                {/*    X: {position.x}, Y: {position.y}*/}
                {/*</p>*/}
            </div>
            <div>
                <button onClick={() => setShow(show => !show)}>
                    refresh the dog photo
                </button>
                {show ? <p>123</p> : null}
                {loading ? (
                    <p>正在加载，请稍等</p>
                ) : (
                    <img src={dogResult && dogResult.message} alt="" />
                )}
            </div>
            {/*<div>*/}
            {/*    <button onClick={() => setShow(show => !show)}>toggle</button>*/}
            {/*    {show ? <MouseTracker /> : null}*/}
            {/*</div>*/}
        </div>
    );
};

export default App;
