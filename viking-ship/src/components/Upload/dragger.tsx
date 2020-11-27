import React, {FC, Fragment, useState, DragEvent} from 'react';
import classNames from 'classnames';
import {setServers} from "dns";

interface DraggerProps {
    onFile?: (files: FileList) => void,
}

const Dragger: FC<DraggerProps> = (props) => {
    const {onFile, children} = props;

    // 标志拖拽事件是否结束
    const [dragOver, setDragOver] = useState(false);

    const kclass = classNames(
        'viking-uploader-dragger', {
         'is-dragover': dragOver
        }
    )

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        // 组织事件的默认行为
        e.preventDefault();
        setDragOver(over);

    }

    /**
     *
     * @param e 事件类型为 React 提供的拖拽事件，可以接收一个泛型，而原生的拖拽事件不支持传入泛型
     */
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false);

        // 调用onFile()
        if (onFile) {
            // 从 e 中的dataTransfer 中拿出files对象
            onFile(e.dataTransfer.files);
        }

    }

    return (
        <Fragment>
            <div
                className={kclass}
                onDragOver={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDrop={(e) => handleDrop(e)}
            >
                {children}
            </div>
        </Fragment>
    )

}

export default Dragger;