import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: '',
      redirect:'home',
      component: () => import('@/pages/layout'),
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/pages/home')
      },
      {
        path: "txidDetails",
        name: 'txidDetails',
        component: ()=>import('@/pages/txId/txId')
      },
      {
        path: 'invalidSearch',
        name: 'invalidSearch',
        component: () => import('@/components/invalidSearch')
      },
      {
        path: 'addressDetail',
        name: 'addressDetail',
        component: () => import('@/pages/address/detail')
      }, 
      {
        path: 'blockDetail',
        name: 'blockDetail',
        component: () => import('@/pages/block/detail')
      }
      ]
    }
  ]
})
