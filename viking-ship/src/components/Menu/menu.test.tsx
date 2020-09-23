import React from 'react';
import {render, RenderResult, fireEvent, cleanup} from '@testing-library/react';

import Menu, {MenuProps} from './menu';
import MenuItem from './menuItem';


const testProps: MenuProps = {
    defaultIndex: 0,
    onSelected: jest.fn(),
    className: 'test'
}

const testVertical: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled={true}>
                disabled
            </MenuItem>
            <MenuItem>
               xyz
            </MenuItem>


        </Menu>
    )
}
// 指定wrapper的类型为RenderResult
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {

    /**
     * 这个函数在每个it()函数执行前都会执行
     * 可以在这个函数中书写每个it()中都会用到的一些内容
     * 比如渲染组件，获得组件等等
     */
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        // 通过getByTestId()获取最外层的元素（已经在最外层元素中设置 data-testid 属性为test）
        // 因为测试库希望我们的测试接近真实的用户操作，所以它的api都是通过渲染元素内容获取的节点
        // 也就是说，我们通过api获得元素节点，只是内容外层的那个节点，而更为外层的节点无法直接获取
        menuElement = wrapper.getByTestId('test-menu');
        // 获得的节点是li，而想要获得li的父元素ul，就得通过getByTestId()
        activeElement = wrapper.getByText('active');
        // 是否有指定的class
        disabledElement = wrapper.getByText('disabled');



    })

    /**
     * 测试Menu组件能否正常渲染
     */
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();

        // 测试 class
        expect(menuElement).toHaveClass('test', 'viking-menu');
        // 判断渲染的li元素的数量是否为3
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);

        expect(activeElement).toHaveClass('menu-item', 'is-active');
        expect(disabledElement).toHaveClass('menu-item', 'is-disabled');
    })
    /**
     * 测试Menu组件能否被选中，并且调用回调函数
     */
    it('test items should change active and call the right callback', () => {
        // 获取第三个组件
        const thirdMenuItem = wrapper.getByText('xyz');
        expect(thirdMenuItem).toBeInTheDocument();

        // 测试组件的点击事件能否正常进行
        fireEvent.click(thirdMenuItem);
        // 某个回调函数接收参数，使用toHaveBeenCalledWith()
        // 某个回调函数不接收参数，使用toHaveBeenCalled()
        expect(testProps.onSelected).toHaveBeenCalledWith(2);

        expect(thirdMenuItem).toHaveClass('is-active');
        // 当第三个item被选中的时候，之前被选中的item就没有is-active这个类了
        expect(activeElement).not.toHaveClass('is-active');


        // 设置了disabled属性的item，点击事件不会发生
        fireEvent.click(disabledElement);
        expect(testProps.onSelected).not.toHaveBeenCalledWith(1);
    })

    /**
     * 设置为vertical模式，能否生效
     */
    it('should render vertical mode when mode is set to vertical', () => {
        // 调用cleanup()手动清空已经渲染的节点
        cleanup();
        const wrapper = render(generateMenu(testVertical));
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })
});
