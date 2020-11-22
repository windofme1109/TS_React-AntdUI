import {useState, useEffect} from 'react'
export default function useDebounce (value: any, delay = 300) {
    const [debounceValue, setDebounceValue] = useState(value);

    // 添加依赖，debounceValue 和 value 发生变化的时候，就执行
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        // useEffect 的回调的返回值可以是一个函数，这个函数在组件卸载前执行
        // 也就是每一次 update 前，都会执行，这样我们就可以在这个函数中进行清除定时器的操作
        return () => {
            clearTimeout(timer);
        }
    }, [debounceValue, value]);


    return debounceValue;
}