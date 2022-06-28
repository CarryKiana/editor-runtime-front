<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue'

import uiPage from '@/components/ui-page.vue'

const page = ref<any>()

const root = ref()

window.addEventListener('message', ({ data }) => {
  if (!data.tmagicRuntimeReady) {
    return
  }

  (window as any).magic?.onRuntimeReady({
    /* 当编辑器的dsl对象变化时会调用 */
    updateRootConfig(config: any) {
      root.value = config
    },
    /* 当编辑器切换页面时会调用 */
    updatePageId(id: string) {
      page.value = root.value?.items?.find((item: any) => item.id === id)
    },
    /* 新增组件时调用 */
    add({ config }: any ) {
      const parent = config.type === 'page' ? root.value : page.value
      parent.items?.push(config)
    },
    /* 更新组件时调用 */
    update({ config }: any) {
      const index = page.value.items?.findIndex((child: any) => child.id === config.id)
      page.value.items.splice(index, 1, reactive(config))
    },
    /* 删除组件时调用 */
    remove({ id }: any) {
      const index = page.value.items?.findIndex((child: any) => child.id === id)
      page.value.items.splice(index, 1)
    }
  })
})

watch(page, async () => {
  await nextTick();
  (window as any).magic.onPageElUpdate(page.value.$el)
})
</script>

<template>
  <uiPage :config="page"></uiPage>
</template>
