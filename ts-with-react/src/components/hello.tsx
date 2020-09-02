import React, { useContext } from 'react';

import Middle from './middle';

// 从App组件中引入Context对象
import { themeContext } from '../App';
const { Provider, Consumer } = React.createContext(0);

const Hello: React.FC = () => {
    // useContext()接收一个Context对象作为参数
    // useContext()返回的是Context的值，也就是Provider组件的value的值
    const theme = useContext(themeContext);
    const style = {
        color: theme.color,
        background: theme.background,
    };
    return (
        <React.Fragment>
            <Provider value={60}>
                <Middle />
            </Provider>

            <h2 style={style}>Hello World</h2>
        </React.Fragment>
    );
};
export { Consumer };
export default Hello;
