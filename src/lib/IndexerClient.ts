//let JSONbig = require('json-bigint')({ useNativeBigInt: true })
import { encodeAddress } from '@polkadot/keyring';

import { main } from '../stores/index'

export default class OffChainClient {
	store: any;
	vue: any;
	ws: any;

	async init(vue: any) {
		this.store = main();
		this.vue = vue;
		this.ws = new WebSocket("ws://127.0.0.1:8080");
		this.ws.onopen = function(event: any) {
			console.log("Connected to event indexer.");
		};
		this.ws.onmessage = (event: any) => {
			let message = JSON.parse(event.data);
			console.log(message);

			switch (message.type) {
				case 'status':
					this.store.setLastBatchBlock(message.data.lastBatchBlock);
					this.store.setLatestBlock(message.data.latestBlock);
					break;

				case 'events':
					this.store.setEvents(message.data.events);
					break;
			}
		}
	}

	getStatus() {
		var msg = {
			type: "GetStatus",
    	};

    this.ws.send(JSON.stringify(msg));
  }

	getEventsByAccountId(account_id: string) {
		var msg = {
			type: "GetEventsByAccountId",
      		account_id: account_id,
    	};

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAccountIndex(account_index: string) {
    var msg = {
      type: "GetEventsByAccountIndex",
      account_index: parseInt(account_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByAuctionIndex(auction_index: string) {
    var msg = {
      type: "GetEventsByAuctionIndex",
      auction_index: parseInt(auction_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByBountyIndex(bounty_index: string) {
    var msg = {
      type: "GetEventsByBountyIndex",
      bounty_index: parseInt(bounty_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByCandidateHash(candidate_hash: string) {
    var msg = {
      type: "GetEventsByCandidateHash",
      candidate_hash: candidate_hash,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByMessageId(message_id: string) {
    var msg = {
      type: "GetEventsByMessageId",
      message_id: message_id,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByParaId(para_id: string) {
    var msg = {
      type: "GetEventsByParaId",
      para_id: parseInt(para_id),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByPoolId(pool_id: string) {
    var msg = {
      type: "GetEventsByPoolId",
      pool_id: parseInt(pool_id),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalHash(proposal_hash: string) {
    var msg = {
      type: "GetEventsByProposalHash",
      proposal_hash: proposal_hash,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByProposalIndex(proposal_index: string) {
    var msg = {
      type: "GetEventsByProposalIndex",
      proposal_index: parseInt(proposal_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRefIndex(ref_index: string) {
    var msg = {
      type: "GetEventsByRefIndex",
      ref_index: parseInt(ref_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByRegistrarIndex(registrar_index: string) {
    var msg = {
      type: "GetEventsByRegistrarIndex",
      registrar_index: parseInt(registrar_index),
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }

  getEventsByTipHash(tip_hash: string) {
    var msg = {
      type: "GetEventsByRegistrarIndex",
      tip_hash: tip_hash,
    };

    console.log(JSON.stringify(msg));

    this.ws.send(JSON.stringify(msg));
  }
}
