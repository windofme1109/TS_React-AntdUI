import React, {useContext} from 'react';
import classNames from 'classnames';

import {MenuContext} from './menu';
export interface MenuItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style,  children} = props;

    const context = useContext(MenuContext);

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = () => {
        if (!disabled && context.onSelected && typeof index === 'number') {
            context.onSelected(index);
        }
    }

    return (

        <li className={classes} style={style} onClick={handleClick}>
            {
                children
            }
        </li>
    )

}

// displayName 是 React 的一个内置属性，可以作为组件的标识
MenuItem.displayName = 'MenuItem';
export default MenuItem;