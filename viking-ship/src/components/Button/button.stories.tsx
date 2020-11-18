import React, {Fragment} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Button, { ButtonProps } from './button';




/**
 * 使用 CSF (Component Story Format)  的方式书写 story
 */
export default {
    title: 'CSF/Button',
    component: Button,
    parameters: {
        backgrounds: {
            values: [
                { name: 'red', value: '#f00' },
                { name: 'green', value: '#0f0' },
                {name: 'black', value: '#000'}
            ],
        },
    },
    decorators: [
        // 包裹 Story 的外层元素是行内元素
        (Story) => (<div style={{textAlign: 'center'}}>{<Story />}</div>),
    ]
    // backgroundColor: { control: 'color' },
    // onClick: {action: 'clicked'}
};
// export const primary: React.FC<{}> = () => <Button btnType="primary">primary</Button>
const Template: Story<ButtonProps> = (args) => (<Button {...args} />);

export const Primary = Template.bind({});
Primary.args = {
    btnType: 'primary',
    children: 'Primary'
};
Primary.decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
Primary.parameters = {
    backgrounds: {
        values: [
            { name: 'red', value: '#f00' },
            { name: 'green', value: '#0f0' },
        ],
    },
}


export const Danger = Template.bind({});
Danger.args = {
    btnType: 'danger',
    children: 'Danger'
};


/**
 * 使用 storiesOf API的方式书写 story
 */

// 使用装饰器（Decorator）添加完成额外的属性
const styles: React.CSSProperties = {
    textAlign: 'center'
}

const centerDecorator = (StoryFn: any) => <div style={styles}>{StoryFn()}</div>

const defaultButton = () => (
    <Fragment>
        <Button btnType="default" onClick={action('clicked')}>默认样式</Button>
    </Fragment>

)


const buttonWithSize = () => (
    <Fragment>
        <Button size="large" btnType="primary" onClick={action('clicked')}>Large</Button>
        <Button size="small" btnType="primary" onClick={action('clicked')}>Small</Button>
    </Fragment>

)

const buttonWithType = () => (
    <Fragment>
        <Button btnType="primary" onClick={action('clicked')}>主要样式</Button>
        <Button btnType="danger" onClick={action('clicked')}>危险样式</Button>
        <Button btnType="link" href="https://google.com" onClick={action('clicked')}>链接</Button>
    </Fragment>
)

/**
 * 这里使用 storiesOf() 定义一个组件的 story，因此要想通过 addon-docs 这个插件生成组件的 props 列表
 * 必须使用addParameters()，传入的参数是：{component: Button}
 */

// storiesOf('CSF/Button', module)
//     .addParameters({component: Button})
//     .addDecorator(centerDecorator)
//     .add('默认按钮', defaultButton)
//     .add('不同大小的按钮', buttonWithSize)
//     .add('不同类型的按钮', buttonWithType)