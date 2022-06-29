<script lang="ts" setup>
import { computed, createApp, ref } from 'vue'
import { editorService, MoveableOptions, TMagicEditor } from '@tmagic/editor';
import { MPage, NodeType } from '@tmagic/schema';
import StageCore from '@tmagic/stage/dist/types/src/StageCore';
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

const runtimeUrl: string = '/playground/index.html'

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

const editor = ref<InstanceType<typeof TMagicEditor>>();

const moveableOptions = (core?: StageCore): MoveableOptions => {
        const options: MoveableOptions = {};
        const id = core?.dr?.target?.id;
        if (!id || !editor.value) return options;
        const node = editor.value.editorService.getNodeById(id);
        if (!node) return options;
        const isPage = node.type === NodeType.PAGE;
        options.draggable = !isPage;
        options.resizable = !isPage;
        options.rotatable = !isPage;
        return options;
      }
</script>

<template>
  <m-editor
    v-model="data"
    :runtime-url="runtimeUrl"
    :component-group-list="componentGroupList"
    :moveable-options="moveableOptions"
  ></m-editor>
</template>

<style>
#app {
  overflow: auto;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
}
#app::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
</style>
