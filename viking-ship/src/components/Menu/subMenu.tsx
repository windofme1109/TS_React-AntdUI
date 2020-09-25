import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';
import {render} from "react-dom";


interface SubMenuProps {
    index?: string;
    title: string;
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {

    const context = useContext(MenuContext);
    // defaultOpenSubMenus 为空数组，内部的元素类型不确定，我们这里将其断言为 Array<string>
    // 保证数组内元素的类型为string
    const openSubMenu = context.defaultOpenSubMenus as Array<string>;

    // 在垂直状态下，默认打开 SubMenu 子列表
    // 这里判断：index 存在，且模式为 vertical，
    // 然后我们去判断 openSubMenu 中，是否存在这个index（当前的SubMenu 的 index）
    // 存在就返回 true，不存在返回 false
    const isOpened = (index && context.mode === 'vertical') ? openSubMenu.includes(index) : false;

    const [menuOpen, setOpen] = useState(isOpened);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        e.preventDefault();
        // 先清除定时器
        clearTimeout(timer);
        // 为了使得下拉过程比较平滑，我们这里使用定时器，延迟300ms 再执行处理函数
        timer = setTimeout(() => {
           setOpen(toggle);
        }, 300);

    }




    // 垂直模式下，必须点击才能打开下拉菜单
    const clicksEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};

    /**
     * 水平模式下，鼠标悬浮，就能打开下拉菜单
     */
    const hoverEvent = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
        }
    } : {};

    const classes = classNames('menu-item', 'submenu-item', className, {
        'is-active': context.index === index
    })

    const renderChildren = () => {

        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        console.log('ndex', index);
        const childElement = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            console.log('childIndex', i);
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem Component')
            }
        })

        return (
            <ul className={subMenuClasses}>
                {
                    childElement
                }
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvent}>
            <div className="submenu-title" {...clicksEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )

}

SubMenu.displayName = 'SubMenu';

export default SubMenu;