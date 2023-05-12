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
    connected: false,
    events: new Map<string, Event>(),
    lastIndexedBlock: '',
    lastBlock: '',
  }),
  getters: {
  },
  actions: {
    setConnected(connected: boolean) {
      this.connected = connected;
    },
    clearEvents() {
      this.events.clear();
    },
    setEvent(eventId: string, event: Event) {
      this.events.set(eventId, event);
    },
    setLastIndexedBlock(lastIndexedBlock: number) {
      this.lastIndexedBlock = lastIndexedBlock.toLocaleString();
    },
    setLastBlock(lastBlock: number) {
      this.lastBlock = lastBlock.toLocaleString();
    },
  },
})
