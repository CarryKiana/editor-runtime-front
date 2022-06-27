import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import MagicEditor from '@tmagic/editor'
import MagicFrom from '@tmagic/form'

import App from './App.vue'

import '@/styles/index.scss'

import 'element-plus/dist/index.css'
import '@tmagic/editor/dist/style.css'
import '@tmagic/form/dist/style.css'



createApp(App)
.use(ElementPlus, {
  locale: zhCn
})
.use(MagicEditor)
.use(MagicFrom)
.mount('#app')

// console.log(path)