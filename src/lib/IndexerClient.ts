//let JSONbig = require('json-bigint')({ useNativeBigInt: true })
import { encodeAddress } from '@polkadot/keyring';

import { main } from '../stores/index'

export default class OffChainClient {
  store: any;
  ws: any;
  polkadotClient: any;
  key: any;

  async processEvent(key: any, event: any) {
    let blockHash = await this.polkadotClient.api.rpc.chain.getBlockHash(event.blockNumber);
    let apiAt = await this.polkadotClient.api.at(blockHash);
    let events = await apiAt.query.system.events();

    if ((key.type != this.key.type) ||
      (JSON.stringify(key.value) != JSON.stringify(this.key.value)))
    {
        return;
    }

    const human = events[event.eventIndex].event.toHuman(true);
    const value = {
      blockNumber: event.blockNumber,
      pallet: events[event.eventIndex].event.section,
      variant: events[event.eventIndex].event.method,
      details : {
        help: human.docs.join(' '),
        values: human.data,
      },
    }
    this.store.setEvent(value);
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
    this.ws.onmessage = async (event: any) => {
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
          
        case 'variants':
          this.store.setVariants(message.data);
          break; 

        case 'events':
          console.log(message);
          if ((message.data.key.type != this.key.type) ||
            (JSON.stringify(message.data.key.value) != JSON.stringify(this.key.value)))
          {
              break;
          }
          let promises = [];
          for (event of message.data.events) {
            promises.push(this.processEvent(message.data.key, event));
            if (promises.length == 20) {
              await Promise.all(promises);
              promises = [];
            }
          }
          Promise.all(promises);
      }
    };
  }

  getStatus() {
    var msg = {
      type: "Status",
    };

    this.ws.send(JSON.stringify(msg));
  }

  getVariants() {
    var msg = {
      type: "Variants",
    };

    console.log(JSON.stringify(msg));
    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAccountId(account_id: string) {
    this.key = {
      type: "AccountId",
      value: account_id,
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAccountIndex(account_index: string) {
    this.key = {
      type: "AccountIndex",
      value: parseInt(account_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAuctionIndex(auction_index: string) {
    this.key = {
      type: "AuctionIndex",
      value: parseInt(auction_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByBountyIndex(bounty_index: string) {
    this.key = {
      type: "BountyIndex",
      value: parseInt(bounty_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByCandidateHash(candidate_hash: string) {
    this.key = {
      type: "CandidateHash",
      value: candidate_hash,
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByEraIndex(era_index: string) {
    this.key = {
      type: "EraIndex",
      value: parseInt(era_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByMessageId(message_id: string) {
    this.key = {
      type: "MessageId",
      value: message_id,
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByParaId(para_id: string) {
    this.key = {
      type: "ParaId",
      value: parseInt(para_id),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByPoolId(pool_id: string) {
    this.key = {
      type: "PoolId",
      value: parseInt(pool_id),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByPreimageHash(preimage_hash: string) {
    this.key = {
      type: "PreimageHash",
      value: preimage_hash,
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalHash(proposal_hash: string) {
    this.key = {
      type: "ProposalHash",
      value: proposal_hash,
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalIndex(proposal_index: string) {
    this.key = {
      type: "ProposalIndex",
      value: parseInt(proposal_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRefIndex(ref_index: string) {
    this.key = {
      type: "RefIndex",
      value: parseInt(ref_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRegistrarIndex(registrar_index: string) {
    this.key = {
      type: "RegistrarIndex",
      value: parseInt(registrar_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsBySessionIndex(session_index: string) {
    this.key = {
      type: "SessionIndex",
      value: parseInt(session_index),
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByTipHash(tip_hash: string) {
    this.key = {
      type: "TipHash",
      value: tip_hash,
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByVariant(pallet: number, variant: number) {
    this.key = {
      type: "Variant",
      value: [pallet, variant],
    };

    let msg = {
      type: "SubscribeEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));

    msg = {
      type: "GetEvents",
      key: this.key,
    };

    this.ws.send(JSON.stringify(msg));
  }
}
