import {FC} from 'react';
import Menu, {MenuProps} from './menu';
import SubMenu, {SubMenuProps} from './subMenu';
import MenuItem, {MenuItemProps} from './menuItem';

// 直接给Menu 添加 Item 属性，会报错，因为 FC 上没有 Item 这个属性
// 使用 TS 提供的交叉类型，向 FC 中添加 Item
// Menu.Item = MenuItem;

export type IMenuComponents = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}

// 使用类型断言，将 Menu 组件断言为上面的类型
const TransMenu = Menu as IMenuComponents;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;


export default TransMenu;