import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';



import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import './styles/index.scss';

// 从 @fortawesome/free-solid-svg-icons 引入所有的图标：fas （所有图标的集合）
// 将 fas 添加到 library 中
// 这样做的的好处就是，我们没有必要将手动从 @fortawesome/free-solid-svg-icons 引入每个图标
// 使用字符串的方式，即可使用图标
library.add(fas);

function App() {
    return (
        <React.Fragment>

                <Menu defaultIndex={'0'} onSelected={(index) => alert(index)} defaultOpenSubMenus={['1']}>
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
