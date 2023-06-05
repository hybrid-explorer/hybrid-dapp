//let JSONbig = require('json-bigint')({ useNativeBigInt: true })
import { encodeAddress } from '@polkadot/keyring';

import { main } from '../stores/index'

export default class OffChainClient {
  store: any;
  ws: any;
  polkadotClient: any;

  async processEvent(event: any) {
    let blockHash = await this.polkadotClient.api.rpc.chain.getBlockHash(event.blockNumber);
    let apiAt = await this.polkadotClient.api.at(blockHash);
    let events = await apiAt.query.system.events();
    const human = events[event.i].event.toHuman(true);
    const value = {
      blockNumber: event.blockNumber,
      pallet: events[event.i].event.section,
      variant: events[event.i].event.method,
      details : {
        help: human.docs[0],
        keys: human.docs[1],
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
          let promises = [];
          for (event of message.data.events) {
            promises.push(this.processEvent(event));
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
    var msg = {
      type: "GetEvents",
      key: {
        type: "AccountId",
        value: account_id,
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAccountIndex(account_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "AccountIndex",
        value: parseInt(account_index),
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAuctionIndex(auction_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "AuctionIndex",
        value: parseInt(auction_index),
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByBountyIndex(bounty_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "BountyIndex",
        value: parseInt(bounty_index),
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByCandidateHash(candidate_hash: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "CandidateHash",
        value: candidate_hash,
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByEraIndex(era_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "EraIndex",
        value: parseInt(era_index),
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByMessageId(message_id: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "MessageId",
        value: message_id,
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByParaId(para_id: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "ParaId",
        value: parseInt(para_id),
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByPoolId(pool_id: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "PoolId",
        value: parseInt(pool_id),
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByPreimageHash(preimage_hash: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "PreimageHash",
        value: preimage_hash,
      },
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalHash(proposal_hash: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "ProposalHash",
        value: proposal_hash,
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalIndex(proposal_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "ProposalIndex",
        value: parseInt(proposal_index),
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRefIndex(ref_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "RefIndex",
        value: parseInt(ref_index),
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRegistrarIndex(registrar_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
          type: "RegistrarIndex",
          value: parseInt(registrar_index),
      }
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsBySessionIndex(session_index: string) {
    var msg = {
      type: "GetEvents",
      key: {
          type: "SessionIndex",
          value: parseInt(session_index),
      }
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByTipHash(tip_hash: string) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "TipHash",
        value: tip_hash,
      },
    };
  
    console.log(JSON.stringify(msg));
    this.ws.send(JSON.stringify(msg));
  }

  getEventsByVariant(pallet: number, variant: number) {
    var msg = {
      type: "GetEvents",
      key: {
        type: "Variant",
        value: [pallet, variant],
      },
    };
  
    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }
}
