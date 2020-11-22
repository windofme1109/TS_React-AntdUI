import React, {FC, Fragment, useState, useEffect, useRef, KeyboardEvent, ChangeEvent, ReactElement} from 'react';
import classNames from 'classnames';


import Input, {InputProps} from '../Input/input'
import Icon from '../Icon/icon';
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce';
import useClickOutside  from '../../hooks/useClickOutside';

interface DataSourceObj {
    value: string,
}

// 自定义数据结构
// DataSourceType接收一个泛型 T，默认值是空对象，而具体的值是 T 和 DataSourceObj的结合
// & 表示取两者的交集，而 DataSourceObj 中必有 value 属性，所以 DataSourceType 也必须具有 value属性

export type DataSourceType<T = {}> = T & DataSourceObj;


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    // 筛选函数，接收一个字符串，返回筛选结果
    // 筛选过程自定义，支持异步操作
    fetchSuggestions: (str: string) => Array<DataSourceType> | Promise<Array<DataSourceType>>,
    onSelect?: (item: DataSourceType) => [],
    renderOptions?: (item: DataSourceType) => ReactElement
}


const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        renderOptions,
        value,
        ...restProps
    } = props;

    // 将 value 断言 为 string
    const [inputValue, setInputValue] = useState(value as string);
    // 筛选结果
    const [suggestions, setSuggestions] = useState<Array<DataSourceType>>([]);

    // 设置一个加载动画
    const [loading, setLoading] = useState(false);

    // 设置键盘高亮标注
    const [highlightIndex, setHighlightIndex] = useState(-1);

    // 是否展示过渡效果
    const [ showDropdown, setShowDropdown] = useState(false)

    // 这是一个标志位，用来标志何时发送请求，使用useRef()，保证 设置的变量在整个渲染周期内不会变化
    // 只有输入框内的值变化，才能发送请求，如果是回车选中，就不发生送请求
    const triggerSearch = useRef(true);

    // useRef() 还可以获取 DOM节点
    const componentRef = useRef<HTMLDivElement>(null);
    // 使用自定义 hooks，保证鼠标点击到外面的区域，下拉框消失
    useClickOutside(componentRef, () => {setSuggestions([])});
    const highlight = (index: number) => {
        if (index < 0) {
            // 使用上箭头，选到第一个，不能继续向上选择了
            index = 0;
        }

        if (index >= suggestions.length) {
            // 使用下箭头，选到最后一个，不能继续向下选择了
            index = suggestions.length - 1;
        }

        setHighlightIndex(index);

    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // 取出按钮的码
        const {keyCode} = e;
        switch (keyCode) {
            // 回车
            case 13:
                if (suggestions[highlightIndex]) {
                    // 保证回车按下的时候，下拉列表一定有值
                    handleClick(suggestions[highlightIndex]);
                }

                break
            // 上箭头
            case 38:
                console.log(keyCode);
                console.log('highlightIndex', highlightIndex);
                highlight(highlightIndex - 1);
                break
            // 下箭头
            case 40:
                highlight(highlightIndex + 1);
                break
            // 退出 （esc）
            case 27:
                // 按下 esc 键，直接将下拉框清空
                generateDropdown([]);
                setShowDropdown(false);
                break
            default:
                break
        }

    }
    console.log(suggestions);
    const debounceValue = useDebounce(inputValue, 500);
    // 只有 inputValue 发生变化，才去发送请求或者更新数组
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const result = fetchSuggestions(debounceValue);




            // result 或者是 Promise，或者是一个数组
            // 在使用 if 的情况下，ts 能帮助我们进行判断，属于哪一种情况
            if (result instanceof Promise) {
                console.log('triggered');
                // 发送请求时设置 loading 为true
                console.log('loading', loading);
                setLoading(true);
                result.then(data => {

                    // 请求完毕，设置 loading 为 false
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }


                })
            } else {
                setSuggestions(result);
                setShowDropdown(true);
                if (result.length > 0) {
                    setShowDropdown(true);
                }
            }
        } else {
            // setSuggestions([]);
            setShowDropdown(false);
        }

        // 在每一次从下拉框中选中值以后，手动将其highlightIndex 恢复为原始值
        // 这样保证下次出现下拉框时，不会有选中的情况
        setHighlightIndex(-1);

    }, [debounceValue]);


    const renderTemplate = (item: DataSourceType) => {
        // item 是一个对象，所以如果没有传入 renderOptions，则默认渲染 item，单时 React 不能渲染一个对象，所以我们要取出 item 中的 value
        return renderOptions ? renderOptions(item) : item.value;
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;

    }
    const handleClick = (item: DataSourceType) => {
        setInputValue(item.value);
        setShowDropdown(false);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }

        // 选中下拉框中的元素，将 triggerSearch 置为 false，保证不发送请求
        triggerSearch.current = false;
    }
    const generateDropdown = (infoSuggestions: Array<DataSourceType>) => {

        console.log('dropdown', showDropdown, loading);

        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => {setSuggestions([])}}
            >
                <ul className="viking-suggestion-list">
                    { loading &&
                    <div className="suggstions-loading-icon">
                        <Icon icon="spinner" spin/>
                    </div>
                    }
                    {infoSuggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'item-highlighted': highlightIndex === index
                        });
                        return (
                            <li key={index}
                                onClick={() => handleClick(item)}
                                className={cnames}
                            >
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>

        )
    }

    return (
        <Fragment>
            {/*对外层 div元素的引用*/}
            <div className="viking-auto-complete" ref={componentRef}>
                <Input
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    {...restProps}
                />
                {/*
                    先初始化就要生成下拉菜单，使得其不依赖 suggestion
                    因为要展示loading 状态，所以不用判断 suggestion 数组的长度
                */}
                {generateDropdown(suggestions)}
            </div>

        </Fragment>
    )

}

export default AutoComplete;