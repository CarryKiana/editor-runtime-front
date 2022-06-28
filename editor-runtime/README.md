# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## vue ts 报错
初始化项目后， `import { createApp } from 'vue'` 报找不到vue声明，根据提示安装 @types/vue 或者新建一个vue的ts声明,这里采用第一种：` yarn add @types/vue -D`
## 编辑器相关插件安装
`yarn add @tmagic/editor@latest @tmagic/form@latest element-plus ` 添加编辑器最新稳定版、自定义属性配置插件、UI组件
## 运行报错
`browser.js:16 Uncaught ReferenceError: global is not defined at node_modules/randombytes/browser.js (browser.js:16:14)`，vite以esm的形式载入模块，有些包内部使用node的global，手动修复让global为window。解决方案有以下几种：
1.在index.html文件里添加`<script>window.global = window;</script>`,确保main.ts引入前global已存在（在main.ts顶层引入无效，可能是预加载的原因，在main.ts里直接引入有问题的模块，模块执行顺序跟垫片代码的顺序不确定，有问题的代码不在main.ts入口引用可能就没问题）
2.`vite.config.json`里定义global为浏览器的globalThis
另，针对其他node里的对象，像webpack4一样加入垫片（webpack5已移除，需要手动处理），间vite.config.ts,参考`https://blog.csdn.net/weixin_44147791/article/details/125065039`
## 引入ts文件报错：导入路径不能以“.ts”扩展名结束，考虑改为*.js
1.更改为js后缀后在js文件里不能使用ts语法，提示的处理方法不符预期。
2.删除后缀，工作正常（不能带后缀有点费解，差评）。

## HelloWorld‘ is declared but its value is never read.Vetur(6133)
vetur 对于vue3的语法不识别，插件禁用后更换为volar

## 安装@tmagic/editor跟@tmagic/form后默认版本为1.0.0-rc.6,运行后报错
Uncaught (in promise) Error: app下不能添加组件
at Editor$1.add (editor.ts:297:13)
at async doAction (BaseService.ts:53:28)
add @ editor.ts:297
版本更换为1.0.0-rc.13后错误消失

## 完成后能添加组件，能选中组件；无法拖动是正常的，因为render不完整