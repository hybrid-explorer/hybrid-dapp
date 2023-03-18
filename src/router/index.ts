import { createRouter, createWebHistory } from 'vue-router'
import Search from '../components/Search.vue'

const routes = [
	{
		path: '/',
		name: 'search',
		component: Search,
	},
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router;
