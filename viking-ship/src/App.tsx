import React from 'react';

import Button, {ButtonSize, ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import './styles/index.scss';

function App() {
    return (
        <React.Fragment>

                <Menu mode={"vertical"} onSelected={(index) => alert(index)}>
                    <MenuItem>
                        cool link
                    </MenuItem>
                    <SubMenu title="dropdown">
                        <MenuItem>
                            cool link
                        </MenuItem>
                        <MenuItem disabled={true}>
                            cool link
                        </MenuItem>
                        <MenuItem>
                            cool link
                        </MenuItem>
                    </SubMenu>
                    <MenuItem>
                        cool link
                    </MenuItem>
                </Menu>
        </React.Fragment>
    );
}

export default App;
