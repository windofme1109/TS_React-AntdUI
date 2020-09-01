import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 自定义hooks
 * @param url
 * @param deps
 */
const useUrlLoader = (url: string, deps: Array<any> = []) => {
    // 获取ajax请求的结果
    const [data, setData] = useState<any>(null);
    // 定义发送ajax请求时，页面的状态
    const [loading, setLoading] = useState(false);
    const getRes = async () => {};
    useEffect(() => {
        setLoading(true);
        axios.get(url).then(res => {
            let { data } = res;
            // 更新数据
            setData(data);
            // 更新加载状态
            setLoading(false);
        });
    }, deps);

    // 返回我们需要的data和loading
    // 在其他组件中，我需要的也是这两个数据
    return [data, loading];
};

export default useUrlLoader;
