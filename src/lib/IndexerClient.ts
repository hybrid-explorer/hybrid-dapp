//let JSONbig = require('json-bigint')({ useNativeBigInt: true })
import { encodeAddress } from '@polkadot/keyring';

import { main } from '../stores/index'

export default class OffChainClient {
  store: any;
  ws: any;
  polkadotClient: any;

  async processEvent(event: any) {
    this.polkadotClient.api.rpc.chain.getBlockHash(event.blockNumber).then((blockHash: any) => {
      this.polkadotClient.api.at(blockHash).then((apiAt: any) => {
        apiAt.query.system.events().then((events: any) => {
          const key = event.blockNumber + '-' + event.i;
          const human = events[event.i].event.toHuman(true);
          const value = {
            blockNumber: event.blockNumber,
            pallet: events[event.i].event.section,
            variant: events[event.i].event.method,
            help: human.docs[0],
            keys: human.docs[1],
            values: human.data,
          }
          this.store.setEvent(key, value);
        });
      });
    });
  }

  async init(polkadotClient: any) {
    this.store = main();
    this.polkadotClient = polkadotClient;
    this.ws = new WebSocket("ws://127.0.0.1:8172");
    this.ws.onopen = (event: any) => {
      console.log("Connected to event indexer.");
      this.store.setConnected(true);
    };
    this.ws.onclose = (event: any) => {
      console.log("Connection to event indexer closed.");
      this.store.setConnected(false);
    };
    this.ws.onerror = (event: any) => {
      console.log("Connection to event indexer errored.");
    };
    this.ws.onmessage = (event: any) => {
      let message = JSON.parse(event.data);

      switch (message.type) {
        case 'status':
          if (message.data.batchIndexingComplete) {
            this.store.setLastIndexedBlock(message.data.lastHeadBlock);
          }
          else {
            this.store.setLastIndexedBlock(message.data.lastBatchBlock);
          }
          this.store.setLastBlock(message.data.lastHeadBlock);
          break;

        case 'events':
          console.log(message);
          this.store.clearEvents();

          for (event of message.data.events) {
            this.processEvent(event);
          }
      }
    };
  }

  getStatus() {
    var msg = {
      type: "Status",
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAccountId(account_id: string) {
    var msg = {
      type: "EventsByAccountId",
      account_id: account_id,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAccountIndex(account_index: string) {
    var msg = {
      type: "EventsByAccountIndex",
      account_index: parseInt(account_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAuctionIndex(auction_index: string) {
    var msg = {
      type: "EventsByAuctionIndex",
      auction_index: parseInt(auction_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByBountyIndex(bounty_index: string) {
    var msg = {
      type: "EventsByBountyIndex",
      bounty_index: parseInt(bounty_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByCandidateHash(candidate_hash: string) {
    var msg = {
      type: "EventsByCandidateHash",
      candidate_hash: candidate_hash,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByMessageId(message_id: string) {
    var msg = {
      type: "EventsByMessageId",
      message_id: message_id,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByParaId(para_id: string) {
    var msg = {
      type: "EventsByParaId",
      para_id: parseInt(para_id),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByPoolId(pool_id: string) {
    var msg = {
      type: "EventsByPoolId",
      pool_id: parseInt(pool_id),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalHash(proposal_hash: string) {
    var msg = {
      type: "EventsByProposalHash",
      proposal_hash: proposal_hash,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalIndex(proposal_index: string) {
    var msg = {
      type: "EventsByProposalIndex",
      proposal_index: parseInt(proposal_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRefIndex(ref_index: string) {
    var msg = {
      type: "EventsByRefIndex",
      ref_index: parseInt(ref_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRegistrarIndex(registrar_index: string) {
    var msg = {
      type: "EventsByRegistrarIndex",
      registrar_index: parseInt(registrar_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByTipHash(tip_hash: string) {
    var msg = {
      type: "EventsByTipHash",
      tip_hash: tip_hash,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }
}
