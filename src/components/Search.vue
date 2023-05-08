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
const store = main();

let route = useRoute();
let router = useRouter();

let $indexerClient: any = inject('$indexerClient');

const searchKey = ref("account_id");
const accountId = ref("");
const accountIndex = ref("");
const auctionIndex = ref("");
const bountyIndex = ref("");
const candidateHash = ref("");
const messageId = ref("");
const paraId = ref("");
const poolId = ref("");
const proposalHash = ref("");
const proposalIndex = ref("");
const refIndex = ref("");
const registrarIndex = ref("");
const tipHash = ref("");

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
    title: 'Tip Hash',
    value: 'tip_hash',
  },
]);


async function search(event: any) {
  switch (searchKey.value) {
    case 'account_id':
      $indexerClient.getEventsByAccountId(accountId.value);
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
    case 'message_id':
      $indexerClient.getEventsByMessageId(messageId.value);
      break;
    case 'para_id':
      $indexerClient.getEventsByParaId(paraId.value);
      break;
    case 'pool_id':
      $indexerClient.getEventsByPoolId(poolId.value);
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
    case 'tip_hash':
      $indexerClient.getEventsByTipHash(tipHash.value);
      break;
  }
}


</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="10">
        <v-alert v-if="!store.connected" type="error" variant="outlined" class="mb-4">Not connected to indexer.</v-alert>
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
            <v-text-field v-if="searchKey == 'message_id'" v-model="messageId" label="Message Id"></v-text-field>
            <v-text-field v-if="searchKey == 'para_id'" v-model="paraId" label="Para Id"></v-text-field>
            <v-text-field v-if="searchKey == 'pool_id'" v-model="poolId" label="Pool Id"></v-text-field>
            <v-text-field v-if="searchKey == 'proposal_hash'" v-model="proposalHash" label="Proposal Hash"></v-text-field>
            <v-text-field v-if="searchKey == 'proposal_index'" v-model="proposalIndex" label="Proposal Index"></v-text-field>
            <v-text-field v-if="searchKey == 'ref_index'" v-model="refIndex" label="Ref Index"></v-text-field>
            <v-text-field v-if="searchKey == 'registrar_index'" v-model="registrarIndex" label="Registrar Index"></v-text-field>
            <v-text-field v-if="searchKey == 'tip_hash'" v-model="tipHash" label="Tip Hash"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="search">Search</v-btn>
          </v-card-actions>
        </v-card>

        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-left">
                Block
              </th>
              <th class="text-left">
                Pallet
              </th>
              <th class="text-left">
                Variant
              </th>
              <th class="text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="event in store.events"
            >
              <td>{{ event.blockNumber }}</td>
              <td>{{ event.event.pallet }}</td>
              <td>{{ event.event.variant }}</td>
              <td>
                <span v-for="(value, key) in event.event.details">{{key}}: {{value}}<br /></span>
              </td>
            </tr>
          </tbody>
        </v-table>

      </v-col>
    </v-row>
  </v-container>
</template>
