import { defineStore } from 'pinia'

export const main = defineStore('main', {
  state: () => ({
    connected: false,
    events: {} as any,
    lastIndexedBlock: '',
    lastBlock: '',
  }),
  getters: {
  },
  actions: {
    setConnected(connected: boolean) {
      this.connected = connected;
    },
    setEvents(events: any) {
      this.events = events;
    },
    setLastIndexedBlock(lastIndexedBlock: number) {
      this.lastIndexedBlock = lastIndexedBlock.toLocaleString();
    },
    setLastBlock(lastBlock: number) {
      this.lastBlock = lastBlock.toLocaleString();
    },
  },
})
