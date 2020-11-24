import React, {FC, Fragment} from 'react';
import {ThemeProps} from '../Icon/icon';

export interface ProgressProps {
    percent: number,
    strokeHeight?: number,
    showText?: boolean,
    style?: React.CSSProperties,
    theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        style,
        theme
    } = props;
    return (
        <Fragment>
            <div className="viking-progress-bar">

            </div>
        </Fragment>
    )

}


Progress.defaultProps = {

}
export default Progress;