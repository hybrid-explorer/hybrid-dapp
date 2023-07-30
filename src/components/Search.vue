<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, onActivated } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import { decodeAddress } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { main } from '../stores/index'
const store = main();

let route = useRoute();
let router = useRouter();

let $indexerClient: any = inject('$indexerClient');

onMounted(async () => {
  $indexerClient.getVariants(); 
});

const searchKey = ref("account_id");
const accountId = ref("");
const accountIndex = ref("");
const auctionIndex = ref("");
const bountyIndex = ref("");
const candidateHash = ref("");
const eraIndex = ref("");
const messageId = ref("");
const paraId = ref("");
const poolId = ref("");
const preimageHash = ref("");
const proposalHash = ref("");
const proposalIndex = ref("");
const refIndex = ref("");
const registrarIndex = ref("");
const sessionIndex = ref("");
const tipHash = ref("");
const palletIndex = ref(0);
const variantIndex = ref(0);

const palletEvents = computed(() => {
  for (let eventVariants of store.variants) {
    if (eventVariants.index == palletIndex.value) {
      return eventVariants.events;
    }
  }
})

watch(palletIndex, () => {
  variantIndex.value = 0;
})

const searchKeyItems = ref([
  {
    title: 'Account Id',
    value: 'account_id',
  },
  {
    title: 'Account Index',
    value: 'account_index',
  },
  {
    title: 'Auction Index',
    value: 'auction_index',
  },
  {
    title: 'Bounty Index',
    value: 'bounty_index',
  },
  {
    title: 'Candidate Hash',
    value: 'candidate_hash',
  },
  {
    title: 'Era Index',
    value: 'era_index',
  },
  {
    title: 'Message Id',
    value: 'message_id',
  },
  {
    title: 'Para Id',
    value: 'para_id',
  },
  {
    title: 'Pool Id',
    value: 'pool_id',
  },
  {
    title: 'Preimage Hash',
    value: 'preimage_hash',
  },
  {
    title: 'Proposal Hash',
    value: 'proposal_hash',
  },
  {
    title: 'Proposal Index',
    value: 'proposal_index',
  },
  {
    title: 'Ref Index',
    value: 'ref_index',
  },
  {
    title: 'Registrar Index',
    value: 'registrar_index',
  },
  {
    title: 'Session Index',
    value: 'session_index',
  },
  {
    title: 'Tip Hash',
    value: 'tip_hash',
  },
  {
    title: 'Pallet / Variant',
    value: 'variant',
  },
]);


async function search(event: any) {
  store.clearEvents();
  switch (searchKey.value) {
    case 'account_id':
      $indexerClient.getEventsByAccountId(u8aToHex(decodeAddress(accountId.value)));
      break;
    case 'account_index':
      $indexerClient.getEventsByAccountIndex(accountIndex.value);
      break;
    case 'auction_index':
      $indexerClient.getEventsByAuctionIndex(auctionIndex.value);
      break;
    case 'bounty_index':
      $indexerClient.getEventsByBountyIndex(bountyIndex.value);
      break;
    case 'candidate_hash':
      $indexerClient.getEventsByCandidateHash(candidateHash.value);
      break;
    case 'era_index':
      $indexerClient.getEventsByEraIndex(eraIndex.value);
      break;
    case 'message_id':
      $indexerClient.getEventsByMessageId(messageId.value);
      break;
    case 'para_id':
      $indexerClient.getEventsByParaId(paraId.value);
      break;
    case 'pool_id':
      $indexerClient.getEventsByPoolId(poolId.value);
      break;
    case 'preimage_hash':
      $indexerClient.getEventsByPreimageHash(preimageHash.value);
      break;
    case 'proposal_hash':
      $indexerClient.getEventsByProposalHash(proposalHash.value);
      break;
    case 'proposal_index':
      $indexerClient.getEventsByProposalIndex(proposalIndex.value);
      break;
    case 'ref_index':
      $indexerClient.getEventsByRefIndex(refIndex.value);
      break;
    case 'registrar_index':
      $indexerClient.getEventsByRegistrarIndex(registrarIndex.value);
      break;
    case 'session_index':
      $indexerClient.getEventsBySessionIndex(sessionIndex.value);
      break;
    case 'tip_hash':
      $indexerClient.getEventsByTipHash(tipHash.value);
      break;
    case 'variant':
      $indexerClient.getEventsByVariant(palletIndex.value, variantIndex.value);
      break;
  }
}

const headers= [
  {
    title: 'Block',
    align: 'start',
    sortable: true,
    key: 'blockNumber',
  },
  {
    title: 'Pallet',
    align: 'start',
    sortable: false,
    key: 'pallet',
  },
  {
    title: 'Variant',
    align: 'start',
    sortable: false,
    key: 'variant',
  },
  {
    title: 'Details',
    align: 'start',
    sortable: false,
    key: 'details',
  },
];
        
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="10">
        <v-card class="mb-10">
          <v-toolbar color="blue">
            <v-toolbar-title>Search events</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-select v-model="searchKey" label="Search Key" :items="searchKeyItems"></v-select>
            <v-text-field v-if="searchKey == 'account_id'" v-model="accountId" label="Account Id"></v-text-field>
            <v-text-field v-if="searchKey == 'account_index'" v-model="accountIndex" label="Account Index"></v-text-field>
            <v-text-field v-if="searchKey == 'auction_index'" v-model="auctionIndex" label="Auction Index"></v-text-field>
            <v-text-field v-if="searchKey == 'bounty_index'" v-model="bountyIndex" label="Bounty Index"></v-text-field>
            <v-text-field v-if="searchKey == 'candidate_hash'" v-model="candidateHash" label="Candidate Hash"></v-text-field>
            <v-text-field v-if="searchKey == 'era_index'" v-model="eraIndex" label="Era Index"></v-text-field>
            <v-text-field v-if="searchKey == 'message_id'" v-model="messageId" label="Message Id"></v-text-field>
            <v-text-field v-if="searchKey == 'para_id'" v-model="paraId" label="Para Id"></v-text-field>
            <v-text-field v-if="searchKey == 'pool_id'" v-model="poolId" label="Pool Id"></v-text-field>
            <v-text-field v-if="searchKey == 'preimage_hash'" v-model="preimageHash" label="Preimage Hash"></v-text-field>
            <v-text-field v-if="searchKey == 'proposal_hash'" v-model="proposalHash" label="Proposal Hash"></v-text-field>
            <v-text-field v-if="searchKey == 'proposal_index'" v-model="proposalIndex" label="Proposal Index"></v-text-field>
            <v-text-field v-if="searchKey == 'ref_index'" v-model="refIndex" label="Ref Index"></v-text-field>
            <v-text-field v-if="searchKey == 'registrar_index'" v-model="registrarIndex" label="Registrar Index"></v-text-field>
            <v-text-field v-if="searchKey == 'session_index'" v-model="sessionIndex" label="Session Index"></v-text-field>
            <v-text-field v-if="searchKey == 'tip_hash'" v-model="tipHash" label="Tip Hash"></v-text-field>
            <template v-if="searchKey == 'variant'">
              <v-select :items="store.variants" item-title="name" item-value="index" v-model="palletIndex" label="Pallet"></v-select>
              <v-select :items="palletEvents" item-title="name" item-value="index" v-model="variantIndex" label="Variant"></v-select>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="search">Search</v-btn>
          </v-card-actions>
        </v-card>

        <v-data-table
            :headers="headers"
            :items="store.events"
            :must-sort="true"
            :sort-by="[{key: 'blockNumber', order: 'desc'}]"
            :show-current-page="false"
            items-per-page="-1"
            class="elevation-1"
            item-value="blockNumber"
          >
          <template v-slot:item.details="{ item }">
            {{ item.columns.details.help }}<br />
            <span v-for="(value, key) in item.columns.details.values">{{key}}: {{value}}<br /></span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
