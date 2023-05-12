import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

import PolkadotClient from './lib/PolkadotClient'
import IndexerClient from './lib/IndexerClient'

async function start() {
  const app = createApp(App).use(router).use(createPinia()).use(vuetify);
  app.provide('$polkadotClient', new PolkadotClient());
  app.provide('$indexerClient', new IndexerClient());
  app.mount('#app');
}

start();