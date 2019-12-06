import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: '',
      component: () => import('@/pages/layout'),
      children: [{
        path: '',
        name: '/',
        component: () => import('@/pages/home')
      },
      // {
      //   path: 'issuance',
      //   name: 'issuance',
      //   component: () => import('@/pages/issuance'),
      // },
      // txid
      // {
      //   path: 'issuanceDetail',
      //   name: 'issuanceDetail',
      //   component: () => import('@/pages/issuance/detail')
      // }, 
      {
        path: 'tokenDetail',
        name: 'tokenDetail',
        component: () => import('@/pages/token/detail')
      },
      {
        path: "txidDetails",
        name: 'txidDetails',
        component: ()=>import('@/pages/txId/txId')
      },
      // {
      //   path: 'trades',
      //   name: 'trades',
      //   component: () => import('@/pages/trades')
      // },{
      //   path: 'contract',
      //   name: 'contract',
      //   component: () => import('@/pages/contracted')
      // },{
      //   path: 'purchase',
      //   name: 'purchase',
      //   component: () => import('@/pages/purchase')
      // },{
      //   path: 'transfer',
      //   name: 'transfer',
      //   component: () => import('@/pages/transfer')
      // },{
      //   path: 'credentials',
      //   name: 'credentials',
      //   component: () => import('@/pages/credentials')
      // },
      {
        path: 'invalidSearch',
        name: 'invalidSearch',
        component: () => import('@/components/invalidSearch')
      },
      // txid
      // {
      //   path: 'purchaseDetail',
      //   name: 'purchaseDetail',
      //   component: () => import('@/pages/purchase/detail')
      // },
      // txid
      // {
      //   path: 'transferDetail',
      //   name: 'transferDetail',
      //   component: () => import('@/pages/transfer/detail')
      // },
      {
        path: 'addressDetail',
        name: 'addressDetail',
        component: () => import('@/pages/address/detail')
      }
        // ,{
        //   path: 'credentialsDetail',
        //   name: 'credentialsDetail',
        //   component: () => import('@/pages/credentials/detail')
        // }
        , {
        path: 'blockDetail',
        name: 'blockDetail',
        component: () => import('@/pages/block/detail')
      }
        // ,{
        //   path: 'privacyNotice',
        //   name: 'privacyNotice',
        //   component: () => import('@/pages/article/privacyNotice')
        // }
      ]
    }
  ]
})
