import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

import IndexerClient from './lib/IndexerClient'

async function start() {
  const app = createApp(App).use(router).use(createPinia()).use(vuetify);
  app.provide('$indexerClient', new IndexerClient());
  app.mount('#app');
}

start();