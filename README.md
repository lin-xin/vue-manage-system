# manage-system #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案


## 前言 ##
之前在公司用了Vue + Element组件库做了个后台管理系统，基本很多组件可以直接引用组件库的，但是也有一些需求无法满足。像图片裁剪上传、富文本编辑器、图表等这些在后台管理系统中很常见的功能，就需要引用其他的组件才能完成。所以我就把开发这个后台管理系统的经验，总结了这个后台管理系统解决方案。

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单
- [x] 图表 :bar_chart:
- [x] 富文本编辑器
- [x] markdown编辑器
- [x] 图片拖拽/裁剪上传


## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|		|-- page                   	 // 主要路由页面
	|           |-- BaseCharts.vue       // 基础图表
	|           |-- BaseForm.vue         // 基础表单
	|           |-- BaseTable.vue        // 基础表格
	|           |-- Login.vue          	 // 登录
	|           |-- Markdown.vue         // markdown组件
	|           |-- MixCharts.vue        // 混合图表
	|           |-- Readme.vue           // 自述组件
	|           |-- Upload.vue           // 图片上传
	|           |-- VueEditor.vue        // 富文本编辑器
	|           |-- VueTable.vue         // vue表格组件
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##

	git clone https://github.com/lin-xin/manage-system.git		// 把模板下载到本地
	cd manage-system											// 进入模板目录
	npm install													// 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明与演示 ##
### Vue-Quill-Editor ###
基于Quill、适用于Vue2的富文本编辑器。访问地址：[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

	<template>
		<div>
			<quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
		</div>
	</template>

	<script>
		import { quillEditor } from 'vue-quill-editor';			// 导入quillEditor组件
	    export default {
	        data: function(){
	            return {
	                content: '',								// 编辑器的内容
	                editorOption: {								// 编辑器的配置
	                    // something config
	                }
	            }
	        },
	        components: {
	            quillEditor										// 声明组件quillEditor
	        }
		}
	</script>

### Vue-SimpleMDE ###
Vue.js的Markdown Editor组件。访问地址：[Vue-SimpleMDE](https://github.com/F-loat/vue-simplemde)

	<template>
	    <div>
	        <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
	    </div>
	</template>

	<script>
	    import { markdownEditor } from 'vue-simplemde';			// 导入markdownEditor组件
	    export default {
	        data: function(){
	            return {
	                content:'',									// markdown编辑器内容
	                configs: {									// markdown编辑器配置参数
	                    status: false,							// 禁用底部状态栏
	                    initialValue: 'Hello BBK',				// 设置初始值
	                    renderingConfig: {
	                        codeSyntaxHighlighting: true,		// 开启代码高亮
	                        highlightingTheme: 'atom-one-light' // 自定义代码高亮主题
	                    }
	                }
	            }
	        },
	        components: {
	            markdownEditor									// 声明组件markdownEditor
	        }
	    }
	</script>

### Vue-Core-Image-Upload ###
一款轻量级的vue上传插件，支持裁剪。访问地址：[Vue-Core-Image-Upload](https://github.com/Vanthink-UED/vue-core-image-upload)

```JavaScript

	<template>
	    <div>
			<img :src="src">									// 用于显示上传的图片
	        <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
	           :crop="true"										// 是否裁剪
	           text="上传图片"
	           url=""											// 上传路径
	           extensions="png,gif,jpeg,jpg"					// 限制文件类型
	           @:imageuploaded="imageuploaded">					// 监听图片上传完成事件
			</vue-core-image-upload>
	    </div>
	</template>
	
	<script>
	    import VueCoreImageUpload  from 'vue-core-image-upload';	// 导入VueCoreImageUpload组件
	    export default {
	        data: function(){
	            return {
	                src:'../img/1.jpg'							// 默认显示图片地址
	            }
	        },
	        components: {
	            VueCoreImageUpload								// 声明组件VueCoreImageUpload
	        },
	        methods:{
	            imageuploaded(res) {							// 定义上传完成执行的方法
	                console.log(res)
	            }
	        }
	    }
	</script>

```

### vue-echarts-v3 ###
基于vue2和eCharts.js3的图表组件。访问地址：[vue-echarts-v3](https://github.com/xlsdg/vue-echarts-v3)

	<template>
	    <div>
	        <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
	    </div>
	</template>


## 其他注意事项 ##
