import React from 'react';
import classNames from "classnames";
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'second' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    /** 图标主题颜色 */
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
    //
    const {className, theme, ...restProps} = props;

    // 设置 class
    const classes = classNames('viking-icon', className, {
        // 用户设置了 theme，则我们设置一个类，来表示这个theme
        [`icon-${theme}`]: theme
    })



    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )

}

export default Icon;