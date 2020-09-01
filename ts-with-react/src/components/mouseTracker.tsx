import React, { useEffect, useState } from 'react';

const MouseTracker: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // 设置useEffect()的第二个参数为空数组，则useEffect()只在第一次加载和第一次卸载的时候调用，其余更新时间内不调用
    useEffect(() => {
        console.log('add effect', position.x);
        const mouseUpdate = (e: MouseEvent) => {
            console.log('inner');
            setPosition(() => ({ x: e.clientX, y: e.clientY }));
        };

        document.addEventListener('click', mouseUpdate);

        // useEffect()的第一个参数的返回值可以是一个函数，这个函数会在组件卸载前执行，被称为clean-up function
        // 因此，在这个返回值函数里面，可以进行一些清除工作，如清除事件、清除定时器等
        return () => {
            console.log('remove effect', position.x);
            document.removeEventListener('click', mouseUpdate);
        };
    }, []);
    console.log('before render', position.x);
    return (
        <div>
            <p>
                X: {position.x}, Y: {position.y}
            </p>
        </div>
    );
};

export default MouseTracker;
