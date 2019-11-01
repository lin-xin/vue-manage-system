# vue-manage-system

<a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.8.2-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/lin-xin/vue-manage-system/releases">
    <img src="https://img.shields.io/github/release/lin-xin/vue-manage-system.svg" alt="GitHub release">
  </a>
  <a href="https://lin-xin.gitee.io/example/work/#/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>

The web management system solution based on Vue2 and Element-UI。[live demo](https://lin-xin.gitee.io/example/work/)

## Donation

![WeChat](https://lin-xin.gitee.io/images/weixin.jpg)

## Preface

The scheme as a set of multi-function background frame templates, suitable for most of the WEB management system development. Convenient development fast simple good components based on Vue2 and Element-UI. Color separation of color style, support manual switch themes, and it is convenient to use a custom theme color.

## Function

-   [x] Element-UI
-   [x] Login/Logout
-   [x] Dashboard
-   [x] Table
-   [x] Tabs
-   [x] From
-   [x] Chart :bar_chart:
-   [x] Editor
-   [x] Markdown
-   [x] Upload pictures by clipping or dragging
-   [x] Support manual switch themes :sparkles:
-   [x] List drag sort
-   [x] Permission
-   [x] 404 / 403
-   [x] Three level menu
-   [x] Custom icon

## Installation steps

    git clone https://github.com/lin-xin/vue-manage-system.git		// Clone templates
    cd vue-manage-system											// Enter template directory
    npm install													// Installation dependency

## Local development

    // Open server and access http://localhost:8080 in browser
    npm run serve

## Constructing production

    // Constructing project
    npm run build

## Component description and presentation

### vue-schart

Vue.js wrapper for sChart.js. Github : [vue-schart](https://github.com/linxin/vue-schart)

```html
<template>
    <div>
        <schart class="wrapper" canvasId="myCanvas" :options="options"></schart>
    </div>
</template>

<script>
    import Schart from 'vue-schart'; // 导入Schart组件
    export default {
        data() {
            return {
                options: {
                    type: 'bar',
                    title: {
                        text: '最近一周各品类销售图'
                    },
                    labels: ['周一', '周二', '周三', '周四', '周五'],
                    datasets: [
                        {
                            label: '家电',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '百货',
                            data: [164, 178, 190, 135, 160]
                        },
                        {
                            label: '食品',
                            data: [144, 198, 150, 235, 120]
                        }
                    ]
                }
            };
        },
        components: {
            Schart
        }
    };
</script>
<style>
    .wrapper {
        width: 7rem;
        height: 5rem;
    }
</style>
```

### element-ui

A desktop component library based on vue.js2.0 . Github : [element](http://element.eleme.io/#/zh-CN/component/layout)

### Vue-Quill-Editor

Quill editor component for Vue2. Github : [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

### mavonEditor

A markdown editor based on Vue that supports a variety of personalized features. Github: [mavonEditor](https://github.com/hinesboy/mavonEditor)

### vue-cropperjs

A Vue wrapper component for cropperjs. Github: [vue-cropperjs](https://github.com/Agontuk/vue-cropperjs)

## Notice

### 一、If I don't want to use some components, how can I delete it?

For example, I don't want to use the Vue-Quill-Editor component, I need to take four steps.

The first step to remove the component of the routing. Enter 'src/router/index.js' and delete the code below.

```JavaScript
{
    path: '/editor',
    component: resolve => require(['../components/page/VueEditor.vue'], resolve)
},
```

Second,delete the component files. Enter 'src/components/page/' and delete 'VueEditor.vue' file.

The third step is to delete the entry. Enter 'src/components/common/Sidebar.vue' and delete the code below.

```js
{
	index: 'editor',
	title: '富文本编辑器'
},
```

Finally, uninstall this component.
npm un vue-quill-editor -S

Complete!

### 二、How to switch themes?

The first step to enter 'src/main.js' and change into green theme.

```javascript
import 'element-ui/lib/theme-default/index.css'; // default theme
// import '../static/css/theme-green/index.css';       // green theme
```

The second step to enter 'src/App.vue' and change into green theme.

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

Finally,enter 'src/components/common/Sidebar.vue' and find el-menu Tags,delete 'background-color/text-color/active-text-color'。

## Screenshot

### Default theme

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms1.png)

### Green theme

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms2.png)

## License

[MIT](https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE)
