import React from 'react';
import classNames from 'classnames';

interface MenuItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style,  children} = props;

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled
    })
    return (

        <ul className={classes} style={style}>
            {
                children
            }
        </ul>
    )

}

export default MenuItem;