import { defineStore } from 'pinia'

export const main = defineStore('main', {
	state: () => ({
		events: {} as any,
		lastBatchBlock: 0,
		latestBlock: 0,
	}),
	getters: {
	},
	actions: {
		setEvents(events: any) {
			this.events = events;
		},
		setLastBatchBlock(lastBatchBlock) {
			this.lastBatchBlock = lastBatchBlock.toLocaleString();
		},
		setLatestBlock(latestBlock) {
			this.latestBlock = latestBlock.toLocaleString();
		},
	},
})
