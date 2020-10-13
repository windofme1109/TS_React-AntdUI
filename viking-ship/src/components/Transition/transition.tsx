import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

export type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

interface BaseTransitionProps {
    animation?: AnimationName,
    // 给子元素包裹一层div
    // 目的：如果子元素已经有过渡效果，那么我们通过 Transition 组件添加的过渡效果就会被覆盖
    // 所以，如果在子元素外包裹一层div，那么由于 transition 属性是可以继承的，
    // 通过 Transition 组件添加的过渡效果加在外层的 div 元素上，则子元素也会继承外层元素的这个过渡效果
    wrapper?: boolean
}

type TransitionProps = BaseTransitionProps & CSSTransitionProps;

const Transition: React.FC<TransitionProps> = (props) => {

    const {animation, classNames, children, wrapper, ...restProps} = props;

    return (

        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {
                wrapper ? <div>{children}</div> : children
            }
        </CSSTransition>
    )

}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
    wrapper: false
}

export default Transition;