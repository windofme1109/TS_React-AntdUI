// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css'
// import App from './App';
// import './styles/index.scss';
//
// ReactDOM.render(
//     <React.Fragment>
//         <App />
//     </React.Fragment>,
//     document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

/**
 *
 * 改造 index.js 文件，使得其成为模块的入口文件
 *
 */

// ES6 的模块导出方式
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export {default as AutoComplete} from './components/AutoComplete';
export {default as Button} from './components/Button';
export {default as Icon} from './components/Icon';
export {default as Menu} from './components/Menu';
export {default as Input} from './components/Input';
export {default as Transition} from './components/Transition';
export {default as Upload} from './components/Upload';

