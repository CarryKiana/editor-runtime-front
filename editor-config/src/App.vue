<script lang="ts" setup>
import { computed, createApp, ref } from 'vue'
import { editorService } from '@tmagic/editor';
import type { MPage } from '@tmagic/schema';
// import StageCore from '@tmagic/stage/dist/types/src/StageCore';

const page = computed(() => editorService.get<MPage>('page'));

const menu = ref({
  left: [
    // 顶部左侧菜单按钮
  ],
  center: [
    // 顶部中间菜单按钮
  ],
  right: [
    // 顶部右侧菜单按钮
  ]
})
// 初始化页面数据
const data = ref({
  type: 'app',
  items: []
})

const runtimeUrl: string = '/runtime/vue3/playground.html'

const propsConfigs: any[] = [
  // 组件属性列表
]

const propsValues: any[] = [
  // 组件默认值
]

// 组件列表
const componentGroupList = ref([
  {
    title: '组件列表',
    items:[
      {
        icon: 'https://vfiles.gtimg.cn/vupload/20220614/9cc3091655207317835.png',
        text: 'HelloWorld',
        type: 'hello-world'
      }
    ]
  }
])
// 渲染
const render = ({ renderer }: any) => {

  const root = window.document.createElement('div')

  if (!page) return root

  const { width = 375, height = 1700 } = page.value.style || {}

  root.id = `${page.value.id}`
  root.style.cssText = `
    widrh: ${ width }px;
    height: ${ height }px;
  `
  console.log(page)
  createApp({
    template: '<p v-for="node in config.items" :key="node.id" :id="node.id">hello world</p>',
    props: ['config'],
  },{
    config: page.value,
  }).mount(root)

  renderer.on('onload', () => {
    const style = window.document.createElement('style')
    // 隐藏滚动条，重置默认样式
    style.innerHTML = `
      body {
        overflow: auto;
      }

      html,body {
        height: 100%; margin: 0;padding: 0;
      }
      
      html::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    `;
    renderer.iframe.contentDocument.head.appendChild(style);

    renderer.iframe.contentWindow.magic?.onPageElUpdate(root);
    renderer.iframe.contentWindow.magic?.onRuntimeReady({});
  })

  return root;
}
</script>

<template>
    <!-- :runtime-url="runtimeUrl" -->
  <m-editor
    v-model="data"
    :menu="menu"
    :props-configs="propsConfigs"
    :props-values="propsValues"
    :component-group-list="componentGroupList"
    :render="render"
  ></m-editor>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
.m-editor {
  flex: 1;
  height: 100%;
}
</style>
