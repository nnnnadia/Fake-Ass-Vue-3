import { createApp, reactive } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia())
app.use(router)

const GStore = reactive({ flashMessage: '' })
app.provide('GStore', GStore)

app.mount('#app')
