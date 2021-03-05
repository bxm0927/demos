# qiniu-uploader

> 前端选择和预览部分已完成，后端请求待完成。

使用七牛云 JavaScript SDK 进行文件上传操作，后端使用 Node.js。

模拟 [TinyPNG](https://tinypng.com/)

支持功能：

- 点击上传
- 拖拽上传
- 粘贴上传
- 分片上传、断点续传

## 搭建项目

```shell
# client
vue create client
# Vue CLI v4.5.11
# ? Please pick a preset: Default ([Vue 2] babel, eslint)

# server
express server
# express-generator 4.16.1
```

## 快速开始

```bash
# client
cd client
npm install
npm run serve

# server
cd server
npm install
DEBUG=server:* npm start
```
