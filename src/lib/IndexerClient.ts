//let JSONbig = require('json-bigint')({ useNativeBigInt: true })
import { encodeAddress } from '@polkadot/keyring';

export default class OffChainClient {
  vue: any;
  ws: any;

	async init(vue: any) {
    this.vue = vue;
    this.ws = new WebSocket("ws://127.0.0.1:8080");
    this.ws.onopen = function(event: any) {
      console.log("Connected to event indexer.");
    };
    this.ws.onmessage = (event: any) => {

//      let message = JSONbig.parse(event.data);
//      console.log(message);

//      switch (message.type) {
//      }
    }
  }

  getEventsAccountId(account_id: string) {
    var msg = {
      type: "GetEventsAccountId",
      account_id: account_id,
    };

    this.ws.send(JSON.stringify(msg));
  }
}
