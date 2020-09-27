import React from 'react';
import {render, RenderResult, fireEvent, cleanup, wait} from '@testing-library/react';

import Menu, {MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelected: jest.fn(),
    className: 'test'
}

const testVertical: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['3']
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
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>

        </Menu>
    )
}


const createStyleFile = (mode: string = 'horizontal') => {
    const defaultCss: string = `
        .viking-submenu {
            display: none;
        }
       
        .viking-submenu.menu-opened {
            display: block;
        } 
    `

    const verticalCss: string = `
        .viking-submenu.menu-opened {
            display: block;
        }
     
        .menu-vertical .viking-submenu {
            display: none;
        }
         
        
    `;

    // 创建一个 style 元素
    const style = document.createElement('style');
    // 将 style 元素内部的内容设置为 css 样式

    if (mode === 'vertical') {
        style.innerHTML = verticalCss;
    } else {
        style.innerHTML = defaultCss;
    }

    return style;
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

        // 给元素添加样式
        // 创建一个 style 元素，然后插入到文档中
        // wrapper.container.append(createStyleFile());

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
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        // 使用 getElementsByTagName('li')，会选择 menuElement 元素下所有的所有的 li
        // 而实际上，我们只需要选择 menuElement 的第一层 li 元素
        // 所以，我们这里使用 css 伪类，:scope，这个伪类用来限定选择的范围
        // 当从DOM API使用时，如 querySelector()，querySelectorAll()，matches() 或 Element.closest()
        // :scope 匹配你调用API的元素
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
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
        expect(testProps.onSelected).toHaveBeenCalledWith('2');

        expect(thirdMenuItem).toHaveClass('is-active');
        // 当第三个item被选中的时候，之前被选中的item就没有is-active这个类了
        expect(activeElement).not.toHaveClass('is-active');


        // 设置了disabled属性的item，点击事件不会发生
        fireEvent.click(disabledElement);
        expect(testProps.onSelected).not.toHaveBeenCalledWith(1);
    })




    /**
     * 初始化的横向导航栏，子菜单应该时被隐藏的，只有时悬浮状态，才显示
     */
    // it('should show dropdown items when hover on items', async () => {
    //     // 初始化的横向导航栏，子菜单应该时被隐藏的
    //     expect(wrapper.queryByText('drop1')).not.toBeVisible();
    //
    //     const dropDownElement = wrapper.getByText('dropdown');
    //
    //
    //     // mouseEnter 的事件处理函数是延迟执行（setTimeout）
    //     fireEvent.mouseEnter(dropDownElement);
    //     // mouseEnter 的事件处理函数是延迟执行（setTimeout）
    //     // 所以页面中不会立即出现变化，而在 Jest 中，我们是同步执行测试代码的，所以异步渲染的内容获取不到
    //     // 为了解决这个问题，我们可以使用 async / await 结合 wait() 函数完成异步渲染
    //     // it() 接收的回调函数使用 async 定义，在需要异步渲染的地方 使用 await，并调用 wait() 函数
    //     // 如下所示
    //     await wait(() => {
    //         expect(wrapper.queryByText('drop1')).toBeVisible();
    //     })
    //
    //     // 此时页面中就存在了我们异步渲染的元素
    //     // 通过触发点击事件，测试页面中是否存在相关的列表元素
    //     fireEvent.click(wrapper.getByText('drop1'));
    //     //
    //     expect(testProps.onSelected).toHaveBeenCalledWith('3-0');
    //
    //     // 鼠标离开
    //     fireEvent.mouseLeave(dropDownElement);
    //     // 页面中不存在这个 drop1 这个元素
    //     await wait(() => {
    //         expect(wrapper.queryByText('drop1')).not.toBeVisible();
    //     })
    //
    // })

    /**
     * 设置为vertical模式，能否生效
     */
    it('should render vertical mode when mode is set to vertical', () => {
        // 调用cleanup()手动清空已经渲染的节点
        cleanup();
        const wrapper = render(generateMenu(testVertical));

        // wrapper.container.append(createStyleFile('vertical'));

        const menuElement = wrapper.getByTestId('test-menu');

        const subMenuElement = menuElement.querySelector('.viking-submenu');

        // 初始渲染状态下，子列表应该有 viking-submenu 和 menu-opened 这两个类
        expect(subMenuElement).toHaveClass('viking-submenu', 'menu-opened');

        expect(menuElement).toHaveClass('menu-vertical');

        // 垂直模式下，子列明是默认展开的
        // expect(wrapper.getByText('drop1')).toBeVisible();

        const dropDownElement = wrapper.getByText('dropdown');

        fireEvent.click(dropDownElement);
        expect(testProps.onSelected).toHaveBeenCalled();
        expect(subMenuElement).not.toHaveClass('menu-opened');
        // expect(wrapper.getByText('drop1')).not.toBeVisible();

    })
});
