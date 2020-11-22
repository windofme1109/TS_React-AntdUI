import React, {Fragment, useState} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Button from './components/Button/button';
import Input from './components/Input/input'
import AutoComplete, {DataSourceType} from './components/AutoComplete/autoComplete'
import Upload from './components/Upload/upload'

import './styles/index.scss';

// 从 @fortawesome/free-solid-svg-icons 引入所有的图标：fas （所有图标的集合）
// 将 fas 添加到 library 中
// 这样做的的好处就是，我们没有必要将手动从 @fortawesome/free-solid-svg-icons 引入每个图标
// 使用字符串的方式，即可使用图标
library.add(fas);

interface LakersPlayerProps {
    value: string,
    number?: number
}

interface GithubUserProps {
    login?: string,
    url?: string,
    avatar_url?: string
}

function App() {

    // const [show, setShow] = useState(true);
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    // 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    //
    // const lakersWithNumber = [
    //   {value: 'bradley', number: 11},
    //   {value: 'pope', number: 1},
    //   {value: 'caruso', number: 4},
    //   {value: 'cook', number: 2},
    //   {value: 'cousins', number: 15},
    //   {value: 'james', number: 23},
    //   {value: 'AD', number: 3},
    //   {value: 'green', number: 14},
    //   {value: 'howard', number: 39},
    //   {value: 'kuzma', number: 0},
    // ]

    // const handleFetch = (query: string) => {
    //     return lakers.filter(item => item.includes(query)).map(player => ({value: player}));
    // }
    
    // const renderOptions = (item: string) => {
    //     return (
    //         <Fragment>
    //             <h1>{item}</h1>
    //         </Fragment>
    //     )
    // }
    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(item => item.value.includes(query));
    // }
    // const renderOptions = (item: DataSourceType<LakersPlayerProps>) => {
    //     return (
    //         <Fragment>
    //             <h2>
    //                 name: {item.value}
    //             </h2>
    //             <p>
    //                 number: {item.number}
    //             </p>
    //         </Fragment>
    //
    //     )
    // }

    // const handleFetch = (query: string) => {
    //     return fetch(`https://api.github.com/search/users?q=${query}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             const {items} = data;
    //             const userInfo = items.slice(0, 10);
    //             return userInfo.map((user: any) => ({value: user.login, ...user}))
    //         });
    //
    // }
    //
    // const renderOptions = (item: DataSourceType<GithubUserProps>) => {
    //     return (
    //         <Fragment>
    //             <h2>
    //                 user: {item.value}
    //             </h2>
    //             <p>
    //                 url: {item.url}
    //             </p>
    //         </Fragment>
    //
    //     )
    // }
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // input 触发 change 事件，我们从e.target 取出文件列表
        // 因为可以多选文件上传，所以 files 是一个列表
        const files = e.target.files;

        if (files) {
            // 取出文件信息
            const uploadFile = files[0];
            // 新建表单对象
            const formData = new FormData();
            // append() 添加表单数据，第一个参数是 文件名称，第二个参数是文件（表单数据）
            formData.append(uploadFile.name, uploadFile);
            // post() 方法的第二个参数除了可以是对象，还可以是表单数据
            // 第三个参数是配置项，用来配置请求头，响应数据等信息
            axios.post('http://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
            })
        }

    }

    const checkFileSize = (file: File) => {
        const fileSize = Math.floor(file.size / 1024);
        if (fileSize > 50) {
            alert('文件大小超过50kb，请重试');
            return false;
        }

        return true;
    }

    const renameFile = (file: File) => {
        // 生成一个新的文件
        // 使用 File 构造函数，接收文件对象，文件名称，和配置项
        const newFile = new File([file], 'new_file.png', {type: file.type});

        // 返回一个 Promise 对象
        return Promise.resolve(newFile);
    }

    return (
        <React.Fragment>
            <div style={{width: '300px', height: '200px', margin: '20px auto'}}>
                <Upload
                    action='http://jsonplaceholder.typicode.com/posts'
                    // onProgress={() => console.log('process')}
                    // onSuccess={() => console.log('success')}
                    // onError={() => console.log('error')}

                    // beforeUpload={checkFileSize}
                    // beforeUpload={renameFile}

                    // onChange={}
                />
            </div>

            {/*<input type="file" onChange={handleUpload}/>*/}
                {/*<Menu defaultIndex={'0'} onSelected={(index) => alert(index)} defaultOpenSubMenus={['1']}>*/}
                {/*    <MenuItem>*/}
                {/*        cool link*/}
                {/*    </MenuItem>*/}
                {/*    <SubMenu title="dropdown">*/}
                {/*        <MenuItem>*/}
                {/*            cool link*/}
                {/*        </MenuItem>*/}
                {/*        <MenuItem disabled={true}>*/}
                {/*            cool link*/}
                {/*        </MenuItem>*/}
                {/*        <MenuItem>*/}
                {/*            cool link*/}
                {/*        </MenuItem>*/}
                {/*    </SubMenu>*/}
                {/*    <MenuItem>*/}
                {/*        cool link*/}
                {/*    </MenuItem>*/}
                {/*</Menu>*/}
            {/*    <div>*/}
            {/*        <Icon icon="file-audio" theme="success" />*/}
            {/*        电影图标*/}
            {/*    </div>*/}
            {/*    <div style={{width: '300px'}}>*/}
            {/*        <Input size="lg"  />*/}
            {/*        <Input size="sm"  />*/}
            {/*    </div>*/}
            {/*<div style={{width: '300px'}}>*/}
            {/*    <AutoComplete*/}
            {/*        fetchSuggestions={handleFetch}*/}
            {/*        // renderOptions={renderOptions}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*    <Button size={"large"} btnType={"primary"} onClick={() => setShow(!show)}>Toggle</Button>*/}
            {/*// Transition 组件只能包含一个子元素*/}
            {/*<Transition*/}
            {/*        in={show}*/}
            {/*        timeout={400}*/}
            {/*        animation="zoom-in-top"*/}
            {/*    >*/}
            {/*        <div>*/}
            {/*            <p>learning react and react hooks</p>*/}
            {/*            <p>learning react and react hooks</p>*/}
            {/*            <p>learning react and react hooks</p>*/}
            {/*            <p>learning react and react hooks</p>*/}
            {/*            <p>learning react and react hooks</p>*/}
            {/*        </div>*/}
            
            {/*    </Transition>*/}
            {/*    <Transition*/}
            {/*        in={show}*/}
            {/*        timeout={400}*/}
            {/*        animation="zoom-in-left"*/}
            {/*        wrapper={true}*/}
            {/*    >*/}
            {/*        <Button size={"large"} btnType={"primary"}>Test</Button>*/}
            {/*    </Transition>*/}
        </React.Fragment>
    );
}

export default App;
