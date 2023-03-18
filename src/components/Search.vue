<script setup lang="ts">
import { ref, inject, onMounted, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import { encodeAddress } from '@polkadot/keyring';

import { main } from '../stores/index'

let route = useRoute();
let router = useRouter();

const store = main();

const accountId = ref("");

async function search(event: any) {
  console.log(accountId.value);
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="10">
        <v-text-field v-model="accountId" label="AccountId"></v-text-field>
        <v-btn @click="search">Search</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
