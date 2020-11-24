import React, {FC, Fragment} from 'react';
import Icon from '../Icon/icon';
import {UploadFile} from './upload';

interface UploadListProps {
    fileList: Array<UploadFile>,
    onRemove: (_file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {

    const {
        fileList,
        onRemove
    } = props;

    // 删除文件
    // const handleRemove = (file: any) => {
    //     // 根据 uid 进行过滤，保留 uid 相同的文件
    //     setFileList((prevFileList) => {
    //         return prevFileList.filter((item => item.uid !== file.uid));
    //     })
    //
    //     if (onRemove) {
    //         onRemove(file);
    //     }
    // }

    return (
        <Fragment>
            <ul className="viking-upload=list">
                {fileList.map(item => {
                    return (
                        <li className="viking-upload-list-item" key={item.uid}>
                            {/*根据文件状态展示不同的图标*/}
                            <span className={`file-name file-name-${item.status}`}>
                                <Icon icon="file-alt" theme="second"/>
                                {item.name}
                            </span>
                            <span className="file-status">
                                {item.status === 'uploading' && <Icon icon="spinner" spin theme="primary"/>}
                                {item.status === 'success' && <Icon icon="check-circle" theme="success"/>}
                                {item.status === 'error' && <Icon icon="times-circle" theme="danger"/>}
                            </span>
                            <span className="file-action">
                                <Icon icon="times" onClick={() => {onRemove(item)}}/>
                            </span>
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    )

}

export default UploadList;