# Storybook使用总结

### 1. 概述
1. Storybook 是一个 UI 框架，可以用来管理组件库。目前最新的版本是 6.0。

2. 官方地址：[Storybook](https://storybook.js.org/) 

3. github 地址：[storybook](https://github.com/storybookjs/storybook)

4. 最新版的 Storybook 引入许多新内容，在记录一下基本的使用方法。

### 2. 安装

1. Storybook 支持多种框架，如 React、Vue 等。我们这里使用的是 React。生成项目使用的是 create-react-app，使用的是 Typescript 进行开发。在项目已经创建的情况下，在命令行输入：  
   `npx sb init`  
   即可完成 Storybook 的初始化工作。

2. 几个需要注意的点：
   1. `npx sb init` 不能在空的项目下执行。通常是我们通过 create-react-app 创建一个项目后，在执行这个命令。
   2. 不需要我们手动配置，在执行 `npx sb init` 命令后，Storybook 会根据项目的依赖自动完成配置工作。
   3. Storybook 的配置文件在项目的根目录下的 `.storybook`文件夹中，主要有两个文件：
      - `main.js`
      - `preview.js`
      
### 3. 使用

#### 3.1 书写 Story
   
1.  所谓的 Story，我的理解就是根据不同属性和状态渲染的组件，然后将这个组件展示出来。下面是官网对于 Story 的介绍：
     > A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.
          
2. Story 目前有两种书写方式，第一种是 CSF（Component Story Format ），即使用 ES6 模块化的方式，完成 Story 的书写。第二种是使用 storiesOf() API的方式书写。第一种是目前版本推荐的方式，第二种是过时（legacy）的方式。
   - 使用 CSF 的方式
     - stories 文件是以 `.stories.jsx` 或者是 `.stories.tsx` 为后缀。
     - 将 stories 文件建在与组件同级的文件夹中。在 `.storybook` 中的 `main.js` 中配置：
     ```javascript
          module.exports = {
              "stories": [
                  // "../src/**/*.stories.mdx",
                  "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
              ],
          }
     ```  
     `stories` 这个配置项表示 Storybook 会加载哪些路径下的 stories 文件。
     - 基本代码：
     ```typescript
        import { Story, Meta } from '@storybook/react/types-6-0';
        import {action} from '@storybook/addon-actions';
        import Button, { ButtonProps } from './button';
        /**
         * 使用 CSF (Component Story Format)  的方式书写 story
         */
        export default {
            title: 'Button',
            component: Button,
            argTypes: {
                backgroundColor: { control: 'color' },
                onClick: {action: 'clicked'}
            },
        } as Meta;
        
        const Template: Story<ButtonProps> = (args) => (<Button {...args} />);
        const TemplateWithDifferentSize: Story<ButtonProps> = (args) => (<Button {...args} />);
        
        export const Primary = Template.bind({});
        Primary.args = {
            btnType: 'primary',
            children: 'Primary'
        };
        
        export const Danger = Template.bind({});
        Danger.args = {
            btnType: 'danger',
            children: 'Danger'
        };
        
        export const LargeButton = TemplateWithDifferentSize.bind({});
        LargeButton.args = {
            children: 'Large',
            size: 'large'
        }
        
        export const SmallButton = TemplateWithDifferentSize.bind({});
        SmallButton.args = {
            children: 'Small',
            size: 'small'
        }
     ```
