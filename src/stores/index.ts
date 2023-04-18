import { defineStore } from 'pinia'

export const main = defineStore('main', {
  state: () => ({
    events: {} as any,
    lastIndexedBlock: '',
    lastBlock: '',
  }),
  getters: {
  },
  actions: {
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
