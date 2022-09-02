<template>
	<div class="container">
		<div class="content-title">支持拖拽</div>
		<div class="plugins-tips">
			Element Plus自带上传组件。 访问地址：
			<a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank">Element Plus Upload</a>
		</div>
		<el-upload class="upload-demo" drag action="http://jsonplaceholder.typicode.com/api/posts/" multiple :on-change="handle">
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">
				将文件拖到此处，或
				<em>点击上传</em>
			</div>
			<template #tip>
				<div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
			</template>
		</el-upload>

		<div class="content-title">支持裁剪</div>
		<div class="plugins-tips">
			vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。 访问地址：
			<a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>。 示例请查看
			<router-link to="/user">个人中心</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
const handle = (rawFile:any)=>{
	console.log(rawFile);
}
</script>

<style scoped>
.content-title {
	font-weight: 400;
	line-height: 50px;
	margin: 10px 0;
	font-size: 22px;
	color: #1f2f3d;
}

.pre-img {
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 5px;
}
.crop-demo {
	display: flex;
	align-items: flex-end;
}
.crop-demo-btn {
	position: relative;
	width: 100px;
	height: 40px;
	line-height: 40px;
	padding: 0 20px;
	margin-left: 30px;
	background-color: #409eff;
	color: #fff;
	font-size: 14px;
	border-radius: 4px;
	box-sizing: border-box;
}
.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
</style>
