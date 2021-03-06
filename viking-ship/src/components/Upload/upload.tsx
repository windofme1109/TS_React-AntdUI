import React, {FC, Fragment, useRef, useState} from 'react';
import axios from 'axios';


import Button from '../Button/button';
import Dragger from './dragger';
import UploadList from './uploadList'

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
    // 默认的文件列表，初始渲染上传组件的时候使用
    defaultFileList?: any,
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
    onChange?: (file: File) => void,
    // 移除文件时的回调
    onRemove?: (file: UploadFile) => void,
    // 自定义 http 请求头
    headers?: {[key: string]: any},
    // 自定义的上传文件相关的数据
    data?: {[key: string]: any},
    name?: string,
    // 是否提供上传凭证
    withCredentials?: boolean,
    // 设置上传文件的类型
    accept?: string,
    // 是否支持选择多个文件
    multiple?: boolean,
    drag?: boolean
}

const Upload: FC<UploadProps> = (props) => {

    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onError,
        onSuccess,
        onChange,
        onRemove,
        headers,
        data,
        name,
        withCredentials,
        accept,
        multiple,
        drag,
        children
    } = props;

    const [fileList, setFileList] = useState<Array<UploadFile>>(defaultFileList || []);

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

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        });

        if (onRemove) {
            onRemove(file);
        }
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

        // 用户可以自定义文件名称进行上传
        // formData.append(file.name, file);
        formData.append(name || 'file', file);

        // 向表单中添加更多数据
        if (data) {
            Object.keys(data).forEach(item => {
                formData.append(item, data[item]);
            })
        }



        axios.post(action, formData, {
            headers: {
                // 添加自定义 headers
                ...headers,
                'Content-Type': 'multipart/form-data'
            },

            withCredentials,
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
                {/*<Button*/}
                {/*    btnType="primary"*/}
                {/*    onClick={handleClick}*/}
                {/*>Upload File</Button>*/}
                {
                    drag ? <Dragger
                        onFile={(files) => uploadFiles(files)}
                    >{children}</Dragger> : children
                }
                <input
                    className="viking-file-input"
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                    accept={accept}
                    multiple={multiple}
                />
                <UploadList
                    fileList={fileList}
                    onRemove={handleRemove}
                />
            </div>
        </Fragment>
    )

}


// 添加 默认属性
Upload.defaultProps = {
    name: 'file'
}

export default Upload;