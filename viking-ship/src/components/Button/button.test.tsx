import React from 'react';
import {fireEvent, render} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button';

// test('my first react test case', () => {
//     // render() 方法可以将一个组件渲染为真实的DOM节点
//     const wrapper = render(<Button>Nice</Button>);
//     // 渲染为真实的节点以后，就可以调用很多操作DOM节点的方法，来获取这个DOM节点
//     const element = wrapper.queryByText('Nice');
//     // 判断节点是否存在
//     // expect(element).toBeTruthy();
//
//     // 使用了jest-dom这个包，我们就可以使用更多的方法进行测试
//     // 节点是否渲染到文档中
//     expect(element).toBeInTheDocument();
// })


/**
 *
 * 将测试用例进行归类
 *
 */

const defaultProps = {
    // 点击事件，绑定的函数是jest.fn()
    // jest.fn() 是 mock function，用来模拟点击事件触发后调用的函数行为
    onClick: jest.fn()
}


const testProps: ButtonProps ={
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'click'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}


// 使用describe()描述多个测试用例
describe('test button component', () => {
    // it()作用与test()一样，用来生成一个测试的用例
    /**
     * 默认状态下的 button 渲染
     */
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        // 渲染为真实的节点以后，就可以调用很多操作DOM节点的方法，来获取这个DOM节点
        // 返回值是联合类型：HTMLElement|null
        // const element = wrapper.queryByText('Nice');
        // 返回值是HTMLElement，方便后续使用HTMLElement的一些属性和方法
        const element = wrapper.getByText('Nice') as HTMLButtonElement;

        expect(element.disabled).toBeFalsy();

        // 获取元素的标签名称，判断是不是等于BUTTON
        // 注意，标签名一律为大写字母
        expect(element.tagName).toEqual('BUTTON');
        // 判断element是否有指定的class
        // 直接调用toHaveClass()，这个是jest-dom提供的
        // 接收的参数是class，可以有多个class
        expect(element).toHaveClass('btn', 'btn-default');

        // 测试点击事件
        // 模拟真实的用户点击行为
        // 引入 testing-library/react 中的 fireEvent，模拟各种 html 事件

        fireEvent.click(element);
        // 判断 onClick 事件是否被调用
        expect(defaultProps.onClick).toHaveBeenCalled();

        // 判断节点是否存在
        // expect(element).toBeTruthy();

        // 使用了jest-dom这个包，我们就可以使用更多的方法进行测试
        // 节点是否渲染到文档中
        // expect(element).toBeInTheDocument();
    })

    /**
     * 类型为primary，大小为large时候的 button 测试
     */
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass( 'btn-primary', 'btn-large', 'click');
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="www.baidu.com">Link</Button>);
        const element =wrapper.getByText('Link');
        // button类型为link，则标签的类型为A标签
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn-link', 'btn');
    })

    it('test disabled button', () => {
        const wrapper = render(<Button {...disabledProps}>disabled</Button>);
        // 将element断言为HTMLButtonElement，这样使得element的类型更加精确，而且可以获得button上的一些属性
        const element = wrapper.getByText('disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();

        // 测试button上的disable属性
        expect(element.disabled).toBeTruthy();

        // 测试点击事件
        fireEvent.click(element);
        // 在disabled的状态下，点击事件不可用，所有不会调用onClik绑定的函数
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })

})