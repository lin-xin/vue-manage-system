# manage-system #
The web management system solution based on Vue2 and Element-UI。[live demo](http://work.omwteam.com/)


## Preface ##
The scheme as a set of multi-function background frame templates, suitable for most of the WEB management system development. Convenient development fast simple good components based on Vue2 and Element-UI. Color separation of color style, support manual switch themes, and it is convenient to use a custom theme color.

## Function ##
- [x] Element-UI
- [x] Login/Logout
- [x] Table
- [x] From
- [x] Chart :bar_chart:
- [x] Editor
- [x] Markdown
- [x] Upload pictures by clipping or dragging
- [x] Support manual switch themes :sparkles:


## Directory structure ##

	|-- build                            // Webpack configuration file
	|-- config                           // Project package path
	|-- src                              // Source directory
	|   |-- components                   // Components
	|       |-- common                   // Common component
	|           |-- Header.vue           // Header component
	|           |-- Home.vue           	 // Home component
	|           |-- Sidebar.vue          // Sidebar component
	|		|-- page                   	 // Router page
	|           |-- BaseCharts.vue       // BaseCharts
	|           |-- BaseForm.vue         // BaseForm
	|           |-- BaseTable.vue        // BaseTable
	|           |-- Login.vue          	 // Login
	|           |-- Markdown.vue         // Markdown
	|           |-- MixCharts.vue        // MixCharts
	|           |-- Readme.vue           // Readme
	|           |-- Upload.vue           // Upload
	|           |-- VueEditor.vue        // VueEditor
	|           |-- VueTable.vue         // VueTable
	|   |-- App.vue                      // Main component
	|   |-- main.js                      // Entry file
	|-- .babelrc                         // ES6 syntax compiler configuration
	|-- .editorconfig                    // Code specification
	|-- .gitignore                       // Ignored file
	|-- index.html                       // Entry HTML file
	|-- package.json                     // Dependent configuration file
	|-- README.md                        // Readme


## Installation steps ##

	git clone https://github.com/lin-xin/manage-system.git		// Clone templates
	cd manage-system											// Enter template directory
	npm install													// Installation dependency

## Local development ##

	// Open server and access http://localhost:8080 in browser
	npm run dev

## Constructing production ##

	// Constructing project
	npm run build

## Component description and presentation ##

### element-ui ###
A desktop component library based on vue.js2.0 . live demo：[element](http://element.eleme.io/#/zh-CN/component/layout)

### vue-datasource ###
A Vue.js server side component to create dynamic tables. live demo：[vue-datasource](https://github.com/coderdiaz/vue-datasource)

```JavaScript
<template>
	<div>
		<datasource language="en" :table-data="information.data"
	        :columns="columns"
	        :pagination="information.pagination"
	        :actions="actions"
	        v-on:change="changePage"
	        v-on:searching="onSearch"></datasource>
	</div>
</template>

<script>
	import Datasource from 'vue-datasource';					// import Datasource component
    export default {
        data: function(){
            return {
                information: {
	                pagination: {...},						// pagination config
	                data: [...]
	            },
	            columns: [...],								// col config
	            actions: [...]								// function config
            }
        },
        components: {
            Datasource										
        },
	    methods: {
	        changePage(values) {...},
	        onSearch(searchQuery) {...}
	    }
	}
</script>
```


### Vue-Quill-Editor ###
Quill editor component for Vue2. live demo：[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

```JavaScript
<template>
	<div>
		<quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
	</div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor';			// import quillEditor component
    export default {
        data: function(){
            return {
                content: '',								
                editorOption: {								
                    // something config
                }
            }
        },
        components: {
            quillEditor										
        }
	}
</script>
```

### Vue-SimpleMDE ###
Markdown Editor component for Vue.js. live demo：[Vue-SimpleMDE](https://github.com/F-loat/vue-simplemde)

```JavaScript
<template>
    <div>
        <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';			
    export default {
        data: function(){
            return {
                content:'',									
                configs: {									
                    status: false,							
                    initialValue: 'Hello BBK',				
                    renderingConfig: {
                        codeSyntaxHighlighting: true,		
                        highlightingTheme: 'atom-one-light' 
                    }
                }
            }
        },
        components: {
            markdownEditor									
        }
    }
</script>
```

### Vue-Core-Image-Upload ###
a vue plugin for image upload and crop. live demo：[Vue-Core-Image-Upload](https://github.com/Vanthink-UED/vue-core-image-upload)

```JavaScript

<template>
    <div>
		<img :src="src">									
        <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
           :crop="true"										
           text="上传图片"
           url=""											
           extensions="png,gif,jpeg,jpg"					
           @:imageuploaded="imageuploaded">					
		</vue-core-image-upload>
    </div>
</template>

<script>
    import VueCoreImageUpload  from 'vue-core-image-upload';	
    export default {
        data: function(){
            return {
                src:'../img/1.jpg'							
            }
        },
        components: {
            VueCoreImageUpload								
        },
        methods:{
            imageuploaded(res) {							
                console.log(res)
            }
        }
    }
</script>

```

### vue-echarts-v3 ###
Vue.js v2.x+ component wrap for ECharts.js v3.x+. live demo：[vue-echarts-v3](https://github.com/xlsdg/vue-echarts-v3)

```JavaScript
<template>
    <div>
        <IEcharts :option="bar"></IEcharts>
    </div>
</template>
	
<script>
    import IEcharts from 'vue-echarts-v3';					
    export default {
        data: function(){
            return {
                bar: {
			        title: {
			          text: '柱状图'							
			        },
			        tooltip: {},	
			        xAxis: {								
			          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			        },
			        yAxis: {},								
			        series: [{
			          name: '销量',
			          type: 'bar',							
			          data: [5, 20, 36, 10, 10, 20]
			        }]
			   	}
            }
        },
        components: {
            IEcharts								
        }
    }
</script>
```

## Notice ##
### 一、If I don't want to use some components, how can I delete it? ###

For example, I don't want to use the vue-datasource component, I need to take four steps.

The first step to remove the component of the routing. Enter 'src/router/index.js' and delete the code below.

```JavaScript
{
    path: '/vuetable',
    component: resolve => require(['../components/page/VueTable.vue'], resolve)
},
```

Second,delete the component files. Enter 'src/components/page/' and delete 'VueTable.vue' file.

The third step is to delete the entry. Enter 'src/components/common/Sidebar.vue' and delete the code below.
	
```HTML
<el-menu-item index="vuetable">Vue表格组件</el-menu-item>
```

Finally, uninstall this component.
	
	npm un vue-datasource -S

Complete!

### 二、How to switch themes? ###

The first step to enter 'src/main.js' and change into green theme.

```javascript
import 'element-ui/lib/theme-default/index.css';    // default theme
// import '../static/css/theme-green/index.css';       // green theme
```

The second step to enter 'src/App.vue' and change into green theme.

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

Finally,enter 'src/components/common/Sidebar.vue' and find el-menu Tags,delete 'theme="dark"'。

## Screenshot ##
### Default theme ###

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms1.png)

### Green theme ###

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms2.png)