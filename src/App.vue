<script setup lang="ts">
import { ref, inject, onMounted, computed, watch } from 'vue'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';

import { main } from './stores/index'

const drawer = ref(false);
const store = main();

let $polkadotClient: any = inject('$polkadotClient');
let $indexerClient: any = inject('$indexerClient');

onMounted(async () => {
  let results = await Promise.all([
    $polkadotClient.init(),
    $indexerClient.init($polkadotClient),
  ]);

  setInterval(() => {
    $indexerClient.getStatus();
  }, 1000);
});
 
</script>

<template>
  <v-app theme="dark">
    <v-navigation-drawer v-model="drawer" app>
    </v-navigation-drawer>
    <v-app-bar app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Hybrid Explorer {{ store.lastIndexedBlock }} / {{ store.lastBlock }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
        <v-alert v-if="!store.connected" type="error" variant="outlined" class="mb-4">Not connected to indexer.</v-alert>
        <router-view v-else></router-view>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
