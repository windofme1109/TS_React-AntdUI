import React, {useState, createContext} from 'react';
import classNames from 'classnames';

// type关键字定义字符串字面量，达到枚举的效果
// 定义菜单的类型：水平（horizontal）/ 垂直（vertical）
type MenuModel = 'horizontal' | 'vertical';

// 定义选中后的回调函数，接收SelectedIndex，也就是选中后的列表项的索引
type SelectedCallback = (selectedIndex: number) => void
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuModel;
    // 自定义组件样式，类型是React提供的CSSProperties
    style?: React.CSSProperties;
    onSelected?: SelectedCallback
}

// 定义 context 的类型
interface IMenuContext {
    index: number;
    onSelected?: SelectedCallback
}

// 定义 Context
// 创建这个 Context 的目的是将当前的处于激活状态的标签的索引以及回调函数传递到子组件中
export const MenuContext = createContext<IMenuContext>({
    index: 0
})

const Menu: React.FC<MenuProps> = (props) => {

    const {defaultIndex, className, mode, style, onSelected, children} = props;
    // currentActive表示当前选中的标签，统一放到Menu组件中进行管理
    const [currentActive, setActive] = useState(defaultIndex);


    const handleClick = (index: number) => {
        setActive(index);

        if (onSelected) {
            onSelected(index);
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelected: handleClick
    }

    // 添加class
    // classNames()接收的是多个参数，可以是字符串或者是对象，对象的 key 就是要添加的 class
    // 而 value 是布尔值，true 表示这个 key 会被添加到 class 列表中，而 false 表示 key 不会被添加到 class 列表中
    // {'bat': true, 'baz': true, 'ccc': false}，输出 'bat baz'
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical'
    })
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {
                    children
                }
            </MenuContext.Provider>

        </ul>
    )

}

// 添加默认属性
Menu.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal"
}

export default Menu;