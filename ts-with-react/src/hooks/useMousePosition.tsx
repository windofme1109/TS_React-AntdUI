import React, { useState, useEffect } from 'react';

const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        console.log('add effect', position.x);
        const mouseUpdate = (e: MouseEvent) => {
            setPosition(() => ({ x: e.clientX, y: e.clientY }));
        };

        document.addEventListener('mousemove', mouseUpdate);

        // useEffect()的第一个参数的返回值可以是一个函数，这个函数会在组件卸载前执行，被称为clean-up function
        // 因此，在这个返回值函数里面，可以进行一些清除工作，如清除事件、清除定时器等
        return () => {
            console.log('remove effect', position.x);
            document.removeEventListener('mousemove', mouseUpdate);
        };
    }, []);

    return position;
};

export default useMousePosition;
