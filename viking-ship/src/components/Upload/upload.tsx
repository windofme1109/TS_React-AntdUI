import React, {FC, Fragment, useRef, useState} from 'react';
import axios from 'axios';


import Button from '../Button/button';

// 定义几个上传文件的状态
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    uid: string,
    name: string,
    size: number,
    status?: UploadFileStatus,
    // 上传的百分比
    percent?: number,
    // 原始文件
    raw?: File,
    response?: any,
    error?: any
}

export interface UploadProps {
    // 上传文件的地址
    action: string,
    // 文件上传前的回调，返回值可以是布尔值，或者是一个Promise对象
    // 可在文件上传前，进行一些操作
    beforeUpload?: (file: File) => boolean | Promise<File>,
    // 可选，上传文件的过程，percentage 表示上传进度的百分比，file 是一个文件
    onProgress?: (percentage: number, file: File) => void,
    // 文件上传成功时的回调
    onSuccess?: (data: any, file: File) => void;
    // 文件上传失败时的回调
    onError?: (error: any, file: File) => void,
    // 文件发生变化时的回调
    onChange?: (file: File) => void
}

const Upload: FC<UploadProps> = (props) => {

    const {
        action,
        beforeUpload,
        onProgress,
        onError,
        onSuccess,
        onChange
    } = props;

    const [fileList, setFileList] = useState<Array<UploadFile>>([]);

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevFileList) => {
            console.log(prevFileList);
            return prevFileList.map(fileInfo => {
                if (fileInfo.uid === updateObj.uid) {
                    return {...fileInfo, ...updateFile};
                } else {
                    return fileInfo;
                }
            }) ;
        })
    }


    // 使用 useRef() 获取 input 元素
    // 借助 button 可以操作 这个 input 元素
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (fileInput.current) {
            // 通过调用 input 元素的 click 方法，间接实现点击 input 的功能
            fileInput.current.click();
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }

        uploadFiles(files);

        if (fileInput.current) {
            // 清空 input 框的内容
            fileInput.current.value = '';
        }

    }

    /**
     *
     * @param files 类型为 FileList，文件列表
     */
    const uploadFiles = (files: FileList) => {
        // Array.from() 是一个对数组或者类数组对象进行操作的方法，返回值是数组
        // 可以将类数组对象转换为真正的数组
        const filesList = Array.from(files);
        filesList.forEach(file => {

            if (!beforeUpload) {
                postFile(file);
            } else {
                const result = beforeUpload(file);

                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        postFile(processedFile);
                    })
                } else if (result !== false) {
                    postFile(file);
                }
            }

        });

    }

    const postFile = (file: File) => {

        let _file: UploadFile = {
            uid: `${Date.now()}-upload-file`,
            name: file.name,
            size: file.size,
            status: 'ready',
            // 上传的百分比
            percent: 0,
            // 原始文件
            raw: file,
        }

        setFileList((prevFileList) => [_file, ...prevFileList]);

        const formData = new FormData();
        formData.append(file.name, file);

        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            // 处理上传进度事件，值为回调，传入一个事件，类型为 any，和上传过程相关的一些属性
            onDownloadProgress: (e: any) => {
                let percentage = Math.round((e.load * 100) / e.total) || 0;
                // console.log('process', e);



                if (percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'});
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(res => {
            console.log(res);
            if (onSuccess) {
                updateFileList(_file, {status: 'success', response: res.data});
                onSuccess(res.data, file);
            }

            if (onChange) {
                onChange(file);
            }
        }).catch(err => {
            console.log(err);
            if (onError) {
                updateFileList(_file, {status: 'error', error: err});
                onError(err, file);
            }

            if (onChange) {
                onChange(file);
            }
        })
    }
    console.log(fileList);
    return (
        <Fragment>
            <div className="viking-upload-component">
                <Button
                    btnType="primary"
                    onClick={handleClick}
                >Upload File</Button>
                <input
                    className="viking-file-input"
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                />
            </div>
        </Fragment>
    )

}

export default Upload;