import React, {ReactHTMLElement} from 'react';
import classNames from 'classnames';

// 按钮的大小
export enum ButtonSize {
    Large = 'large',
    Small = 'small',
}

// 按钮的类型（颜色）
export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    // react的组件的props有一个children属性，这个属性用来获取组件的所有子节点
    // 没有子节点，children的值是undefined，只有一个子节点，是对象，多个则是数组
    // 注意，不带标签的纯文本也是节点
    children: React.ReactNode;
    href?: string;
}

// 使用交叉类型将BaseButtonProps和ButtonHTMLAttributes合并为一个类型
// ButtonHTMLAttributes具有button元素的所有属性（原生button）
// 将泛型类型指定为HTMLButtonElement
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type NativeAnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

// 类型映射 —— Partial
// 将NativeAnchorProps与NativeButtonProps合并为一个类型
// 并使用Partial，将其所有的属性指定为可选，因为使用过程中，不一定会传入所有属性
export type ButtonTypes = Partial<NativeAnchorProps & NativeButtonProps>;

const Button: React.FC<ButtonTypes> = (props) => {
    const {
        size,
        className,
        btnType,
        children,
        disabled,
        href,
        ...restProps

    } = props;
    const classes = classNames('btn',className, {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        // 在按钮类型是链接（link）的时候，disabled才能起作用
        disabled: (btnType === ButtonType.Link) && disabled,
    });

    if (btnType === ButtonType.Link && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        );
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
};

// 设置Button组件的默认props
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;
