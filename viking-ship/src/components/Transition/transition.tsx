import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

export type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

interface BaseTransitionProps {
    animation?: AnimationName,
}

type TransitionProps = BaseTransitionProps & CSSTransitionProps;

const Transition: React.FC<TransitionProps> = (props) => {

    const {animation, classNames, children, ...restProps} = props;

    return (

        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {children}
        </CSSTransition>
    )

}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

export default Transition;