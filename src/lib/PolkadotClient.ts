import {
  web3AccountsSubscribe,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api'
import { main } from '../stores/index'

import chainsJson from '../lib/chains.json';
const chains: any = chainsJson;

export default class PolkadotClient {
  api: any;
  store: any;

  async init() {
    this.store = main();

    let polkadotEndpoint = chains[this.store.chain].node;
    let wsProvider = new WsProvider(polkadotEndpoint);
    this.api = await ApiPromise.create({
      provider: wsProvider,
    });

    await this.api.isReady;

    const allInjected = await web3Enable('Hybrid Block Explorer');
    if (allInjected.length == 0) {
      return false;
    }

    let unsubscribe = await web3AccountsSubscribe(( accounts ) => {
    });

    return true;
  }
}
