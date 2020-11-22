import {useEffect, RefObject} from 'react';

/**
 *
 * @param ref
 * @param handler
 */
export default function useClickOutside (ref: RefObject<HTMLElement>, handler: Function) {
    // 设置 useEffect() 的依赖为 ref 和 handler
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                // 没有获取到元素，或者点击的区域在 input 的范围内
                return;
            }

            // 给事件处理函数传入事件，同时调用事件处理函数
            handler(event);

        }

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        }
    }, [ref, handler]);

}