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
import {default as Button} from './components/Button';
import {default as Menu} from './components/Menu';
import {default as Icon} from './components/Icon';
import {default as AutoComplete} from './components/AutoComplete';