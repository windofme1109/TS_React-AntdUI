import React, {useContext} from 'react';
import classNames from 'classnames';

import {MenuContext} from './menu'
interface MenuItemProps {
    index: number;
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
        if (!disabled && context.onSelected) {
            context.onSelected(index);
        }
    }

    return (

        <ul className={classes} style={style} onClick={handleClick}>
            {
                children
            }
        </ul>
    )

}

export default MenuItem;