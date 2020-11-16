import React, {Fragment} from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story, Meta } from '@storybook/react/types-6-0';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Button, { ButtonProps } from './button';




// /**
//  * 使用 CSF (Component Story Format)  的方式书写 story
//  */
// export default {
//     title: 'Button',
//     component: Button,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//         onClick: {action: 'clicked'}
//     },
// } as Meta;
//
// const Template: Story<ButtonProps> = (args) => (<Button {...args} />);
// const TemplateWithDifferentSize: Story<ButtonProps> = (args) => (<Button {...args} />);
//
// export const Primary = Template.bind({});
// Primary.args = {
//     btnType: 'primary',
//     children: 'Primary'
// };
//
// export const Danger = Template.bind({});
// Danger.args = {
//     btnType: 'danger',
//     children: 'Danger'
// };
//
// export const LargeButton = TemplateWithDifferentSize.bind({});
// LargeButton.args = {
//     children: 'Large',
//     size: 'large'
// }
//
// export const SmallButton = TemplateWithDifferentSize.bind({});
// SmallButton.args = {
//     children: 'Small',
//     size: 'small'
// }

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

storiesOf('Button', module)
    .addParameters({component: Button})
    .addDecorator(centerDecorator)
    .add('默认按钮', defaultButton)
    .add('不同大小的按钮', buttonWithSize)
    .add('不同类型的按钮', buttonWithType)