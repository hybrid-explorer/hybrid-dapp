import { defineStore } from 'pinia'

export const main = defineStore('main', {
  state: () => ({
    events: {} as any,
    lastBatchBlock: '',
    latestBlock: '',
  }),
  getters: {
  },
  actions: {
    setEvents(events: any) {
      this.events = events;
    },
    setLastBatchBlock(lastBatchBlock: number) {
      this.lastBatchBlock = lastBatchBlock.toLocaleString();
    },
    setLatestBlock(latestBlock: number) {
      this.latestBlock = latestBlock.toLocaleString();
    },
  },
})
