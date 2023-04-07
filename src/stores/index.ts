import { defineStore } from 'pinia'

export const main = defineStore('main', {
	state: () => ({
		events: {} as any,
	}),
	getters: {
	},
	actions: {
		setEvents(events: any) {
			this.events = events;
		}
	},
})
