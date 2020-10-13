import React, {ReactHTMLElement} from 'react';
import classNames from 'classnames';

// 按钮的大小
// export enum ButtonSize {
//     Large = 'large',
//     Small = 'small',
// }

// 使用 type 对 ButtonSize 的类型进行限定
type ButtonSize = 'large' | 'small';

// 按钮的类型（颜色）
// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link',
// }

type ButtonType = 'primary' | 'default' | 'danger' | 'link';

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
export type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
    const {
        size,
        className,
        btnType,
        children,
        disabled,
        href,
        ...restProps

    } = props;
    // classNames()接收的是多个参数，可以是字符串或者是对象，对象的 key 就是要添加的 class
    // 而 value 是布尔值，true 表示这个 key 会被添加到 class 列表中，而 false 表示 key 不会被添加到 class 列表中
    // {'bat': true, 'baz': true, 'ccc': false}，输出 'bat baz'
    const classes = classNames('btn', className, {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        // 在按钮类型是链接（link）的时候，disabled才能起作用
        // disabled: (btnType === ButtonType.Link) && disabled,
        disabled: (btnType === 'link') && disabled,
    });

    // if (btnType === ButtonType.Link && href) {
    if (btnType === 'link' && href) {
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
    // btnType: ButtonType.Default
    btnType: 'default'
}

export default Button;
