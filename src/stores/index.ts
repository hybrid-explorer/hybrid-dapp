import { defineStore } from 'pinia'

interface Event {
  blockNumber: number,
  pallet: string,
  variant: string,
  help: string,
  keys: string,
  values: Map<string, string>,
}

export const main = defineStore('main', {
  state: () => ({
    chain: 'polkadot',
    connected: false,
    variants: [] as any[],
    events: [] as any[],
    lastIndexedBlock: '',
    lastBlock: '',
  }),
  getters: {
  },
  actions: {
    setChain(chain: string) {
      this.chain = chain;
    },
    setConnected(connected: boolean) {
      this.connected = connected;
    },
    setVariants(variants: any) {
      this.variants = variants;
    },
    clearEvents() {
      this.events = [];
    },
    setEvent(event: Event) {
      this.events.push(event);
    },
    setLastIndexedBlock(lastIndexedBlock: number) {
      this.lastIndexedBlock = lastIndexedBlock.toLocaleString();
    },
    setLastBlock(lastBlock: number) {
      this.lastBlock = lastBlock.toLocaleString();
    },
  },
})
