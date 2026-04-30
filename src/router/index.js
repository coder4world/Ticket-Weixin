import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{ path: '/login', name: 'login', component: () => import('../views/login.vue') },
	{ path: '/test', name: 'test', component: () => import('../views/test.vue') },
	{ path: '/tcptest', name: 'tcptest', component: () => import('../views/tcptest.vue') },
	{ path: '/payinfoedit', name: 'payinfoedit', component: () => import('../views/payinfoedit.vue') },
	{ path: '/paylist', name: 'paylist', component: () => import('../views/paylist.vue') },
	{ path: '/trdsch', name: 'trdsch', component: () => import('../views/trdsch.vue') },
	{ path: '/zhifubao', name: 'zhifubao', component: () => import('../views/zhifubao.vue') },
	{ path: '/memory', name: 'memory', component: () => import('../views/memory.vue') },
	{ path: '/mine', name: 'mine', component: () => import('../views/mine.vue') },
	{ path: '/update', name: 'update', component: () => import('../views/update.vue') },
	{ path: '/notice', name: 'notice', component: () => import('../views/notice.vue') },
	{ path: '/', name: 'home', component: () => import('../views/homepage.vue') },
	//{ path: '/', name: 'login', component: () => import('../views/login.vue') },
	{ path: '/homepage', name: 'homepage', component: () => import('../views/homepage.vue') },
	{ path: '/search', name: 'search', component: () => import('../views/search.vue') },
	{ path: '/tabbar_nav', name: 'tabbar_nav', component: () => import('../views/tabbar_nav.vue') },
	{ path: '/trading', name: 'trading', component: () => import('../views/trading.vue') },
	{ path: '/wei', name: 'wei', component: () => import('../views/wei.vue') },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
