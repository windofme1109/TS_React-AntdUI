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
     - 详细介绍：[how to write stories](https://storybook.js.org/docs/react/writing-stories/introduction)
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
     
     - **使用 CSF 的方式，每个定义的 story 都需要使用 export 的方式导出**。
     - 默认导出（default export）
     ```typescript
          export default {
              title: 'Button',
              component: Button,
              argTypes: {
                  backgroundColor: { control: 'color' },
                  } as Meta;
     ```
     默认导出元数据，控制着 Storybook 展示的组件的 stories，并且给插件（addons）提供基本的信息。
     - 定义 story  
       一个 story 就是一个函数，定义如何渲染组件。我们可以给一个组件定义多个 story。
     ```tsx
         export const primary: React.SFC<{}> = () => <Button btnType="primary">primary</Button>
         export const danger: React.SFC<{}> = () => <Button btnType="danger">danger</Button>
     ```
       这种方式可以给一个组件注册多个 story。
     - 使用 args 定义 story  
       这个 args 实际上就是组件的 props。  
     ```tsx
          const Template: Story<ButtonProps> = (args) => (<Button {...args} />);
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
     ```
       首先创建一个组件模板（Template），这个模板的类型是 Story，泛型指定为 ButtonProps，模板是一个函数，函数接收一个 args 参数，最后返回的是一个组件。  
       `const Template: Story<ButtonProps> = (args) => (<Button {...args} />);`  
        `Template.bind({})` 实际上是创建组件模板的副本。然后给副本的 args 赋值。赋值的内容就是组件的自定义的 props 中的属性。
      ```tsx
         export const Primary = Template.bind({});
         Primary.args = {
             btnType: 'primary',
             children: 'Primary'
         };
      ```
        使用 args 的好处是可以复用某个 story 的 props 的属性，同时还可以和插件（addons）、控制（control）结合，在展示组件的页面可以对组件进行更多的操作。
        
     - 使用 parameters   
       参考资料：[Parameters](https://storybook.js.org/docs/react/writing-stories/parameters)  
       Parameters 是 Storybook 中的一个方法，用来给 story 定义静态的元数据（static metadata）。  
       比如说，我只想给 Button 组件的 story 设置不同的背景，那么通过 Parameters 就可以设置。
     ```tsx
        export default {
            title: 'Button',
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
        } as Meta;
     ```
       这样设置以后，就可以在 Button 组件的所有 story 中切换背景。  
       可以在三个地方设置 paramaters：组件（Component）、story 和全局（global），分别对应三个级别，上面示例代码设置的是组件级别，在 `export default` 导出的组件中设置，这样可以使得同一组件的所有story都能应用到这个 parameters。 
       还可以在 story 中设置 parameters。这样仅仅是在这个 story 中起作用。  
     ```tsx
          const Template: Story<ButtonProps> = (args) => (<Button {...args} />);
          
          export const Primary = Template.bind({});
          Primary.args = {
              btnType: 'primary',
              children: 'Primary'
          };
          
          Primary.parameters = {
              backgrounds: {
                  values: [
                      { name: 'red', value: '#f00' },
                      { name: 'green', value: '#0f0' },
                  ],
              },
          }
     ``` 
       最后就是全局设置 parameters，在`.storybook/preview.js` 下，导出 parameters，这样对所有组件的所有 story 都起作用。
     ```tsx
        // .storybook/preview.js
        
        export const parameters = {
          backgrounds: {
            values: [
              { name: 'red', value: '#f00' },
              { name: 'green', value: '#0f0' },
            ],
          },
        };
     ```
     
     - 使用 decorators  
       参考资料：[decorators](https://storybook.js.org/docs/react/writing-stories/decorators)  
       decorators 意为装饰器，在 story 渲染过程中，不改变组件的代码，给组件提供额外的功能，比如说，改变组件的布局，让其居中显示。通常我们使用 decorators 来设置 stories 的样式。  
     ```ts
        export default {
            title: 'Button',
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
     } as Meta;
     ```
       在`export default` 中，设置了 decorators 属性，值为数组，数组的元素是函数：` (Story) => <div style={{textAlign: 'center'}}>{<Story />}</div>`，这个函数接收一个 Story 作为参数，函数返回值是一个元素，我们可以给这个元素设置样式。渲染后的 story 就被包裹在这个元素中。  
       decorators 通常和插件（addon）一起使用。  
       可以在三个地方设置 decorators ：组件（Component）、story 和全局（global），分别对应三个级别，上面示例代码设置的是组件级别，对所有的 story 都起作用。  
       story 级别：
     ```tsx
        const Template: Story<ButtonProps> = (args) => (<Button {...args} />);
        
        export const Primary = Template.bind({});
        Primary.args = {
            btnType: 'primary',
            children: 'Primary'
        };
        Primary.decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
     ```
       全局级别（在 `.storybook/preview.js` 文件中设置）：
     ```ts
        // .storybook/preview.js
        import React from 'react';
        
        export const decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>]; 
     ```
     - 同一个 story 中组合不同的组件：[Stories for multiple components](https://storybook.js.org/docs/react/workflows/stories-for-multiple-components) 
    
   - 使用 `storiesOf` API 的方式
     - 根据官方文档来说，`storiesOf` API 属于过时的内容，但是视频教程中使用的是 `storiesOf`，这里也记录一下 `storiesOf` 的用法。
     - 示例代码：
       ```tsx
          import React, {Fragment} from 'react';
          import {storiesOf} from '@storybook/react';
          import {action} from '@storybook/addon-actions';
          import Button, { ButtonProps } from './button';
       
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
       ```
       
     - 书写 story  
       引入 `storiesOf` API  
       `import {storiesOf} from '@storybook/react';`   
       给storiesOf
         
       
       
       
       
