import React from 'react';

import Button, {ButtonSize, ButtonType} from './components/Button/button'


import './styles/index.scss';

function App() {
    return (
        <React.Fragment>
            <div className="App">
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
            </div>
        </React.Fragment>
    );
}

export default App;
