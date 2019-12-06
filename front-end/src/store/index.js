import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import transaction from './modules/transction'
import contracted from './modules/contracted'
import issuance from './modules/issuance'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    issuance,
    transaction,
    contracted
  },
})

export default store
