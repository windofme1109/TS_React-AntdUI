import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';
import {render} from "react-dom";


interface SubMenuProps {
    index?: number;
    title: string;
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {

    const [menuOpen, setOpen] = useState(false);

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



    const context = useContext(MenuContext);
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

        const childElement = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;

            if (childElement.type.displayName === 'MenuItem') {
                return childElement;
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