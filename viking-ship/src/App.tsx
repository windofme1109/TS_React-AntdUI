import React from 'react';

import Button, {ButtonSize, ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import {DragSortingTable} from './components/dragSortingTable/dragSortingTable'

import './styles/index.scss';

function App() {
    return (
        <React.Fragment>
            <div className="App">

                <Menu defaultIndex={0} onSelected={(index) => console.log(index)}>
                    <MenuItem index={0}>
                        cool link
                    </MenuItem>
                    <MenuItem index={1} disabled>
                        cool link
                    </MenuItem>
                    <MenuItem index={2}>
                        cool link
                    </MenuItem>
                </Menu>

                <h1>hello world</h1>
                <h2>hello world</h2>
                <h3>hello world</h3>
                <h4>hello world</h4>

                <Button disabled={true}>disabled</Button>
                <Button className="custom" onClick={(e: React.MouseEvent) => {e.preventDefault(); alert('success');}}>default</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>larget</Button>
                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>small</Button>
                <Button btnType={ButtonType.Link} href="https://baidu.com" target="_blank">Baidu</Button>
                <Button btnType={ButtonType.Link} disabled={true} href="https://baidu.com">Baidu</Button>
            </div>
            <div>
                <a href="#">click</a>

                <DragSortingTable />
            </div>
        </React.Fragment>
    );
}

export default App;
