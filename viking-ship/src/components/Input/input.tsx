import React, {ReactElement, InputHTMLAttributes, FC, ChangeEvent} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon';



type InputSize = 'lg' | 'sm';

// InputProps 直接继承 InputHTMLAttributes 会提示报错，因为 InputHTMLAttributes 中存在 size 等属性，但是与 InputProps 中的类型不同
// 所以会报错，为了解决这个问题，我们引入 TS 中的 Omit，使用泛型，接收一个类，然后选择忽略这个类的一个属性
// 我们这里可以忽略 InputHTMLAttributes 中的 size 属性，这样就不会和我们定义的 size 属性冲突了
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean,
    size?: InputSize,
    icon?: IconProp,
    append?: string | ReactElement,
    prepand?: string | ReactElement,
    onChanage?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {
    // 取出所有的属性
    const {disabled, size, icon, append, prepand, style, ...restProps} = props;

    const cnames = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepand || append,
        // !!的用法是将一个变量两次取反，第一次使用!，将变量值转换为布尔值，第二次使用!，再对布尔值取反，结果还是布尔值
        // 这样可以保证 null、undefined、''和 0 等值，转换后，为true，其他值为false
        // 用来判断变量非空很好用
        'input-group-append': !!append,
        'input-group-prepand': !!prepand
    });

    // 受控组件
    // 在没有设置初值的情况下，我们输入值后，React 会报受控组件的转换的警告
    // 所以我们这里进行检查，如果没有赋初值，我们手动设置一个
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }

        return value;
    }

    // 解决一个警告：defaultVlue 和 value 同时设置以后，React 抛出警告的异常
    if ('value' in props) {
        // 如果 value 有值，就删除 props 中的 defaultValue
        delete props.defaultValue;

        restProps.value = fixControlledValue(props.value);
    }

    // 根据属性设置不同的 class name
    return (
        // 根据属性添加特定的节点
        <React.Fragment>
            <div className={cnames} style={style}>
                {prepand && <div className="viking-input-group-prepand">{prepand}</div>}
                {icon && <div className="icon-wrapper"><Icon icon={icon}  /></div>}
                <input
                    className="viking-input-inner"
                    disabled={disabled}
                    {...restProps}
                />
                {append && <div className="viking-input-group-append">{append}</div>}
            </div>
        </React.Fragment>
    )

}

export default Input;