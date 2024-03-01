import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { msalInstance } from './msalInstance'

const app = createApp(App)
await msalInstance.initialize()

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
