import React, {useState, createContext} from 'react';
import classNames from 'classnames';

import {MenuItemProps} from './menuItem'

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
        console.log('index', index);
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


    // 因为我们要确保 Menu 组件中只能包含 MenuItem 组件，所以必须对 children 进行判断
    // 如果不是 MenuItem 组件，就不进行渲染
    // 但是，我们不能直接使用 map() 对 children 进行遍历
    // 因为 children 的类型不确定，有可能是数组，对象，甚至是函数
    // 所以，我们使用 React 官方提供的 React.Children.map() 进行遍历
    // map() 接收两个参数，第一个参数是children，第二个参数是一个回调函数
    // children 表示所有的子节点，如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数
    // 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组
    // 回调函数接收两个参数，第一个参数是子节点，第二个参数是索引
    const renderChildren = () => {
        return React.Children.map(children, (child,
                                             childIndex) => {
            // 因为 child 的类型可以是很多种，所以我们这里要指定child的类型，这样可以获得一些特定类型的属性和方法
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            // type 属性包含了 React.FunctionComponentElement 上面的属性，包括displayName
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem') {
                // cloneElement(element, [props], [...children]) 方法以 element 元素为样板克隆并返回新的 React 元素。
                // 返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
                // 新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留

                // 简单的说，就是将 每一个子元素复制一份，并向其 props 添加一个 index 属性
                // 这样可以保证子元素的 index 是连续的，同时还可以自动传入index，（这个index的值就是map() 回调函数的的第二个参数 —— index）
                return React.cloneElement(childElement, {
                    index: childIndex
                })
            } else {
                console.error('warning: Menu has a child which is not a MenuItem Component');
            }
        })
    }
    return (
        // data-testid是用来测试使用的，可以使用getByTestId()获取最外层的dom节点
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {
                    renderChildren()
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