import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import transaction from './modules/transction'
import contracted from './modules/contracted'
import issuance from './modules/issuance'
import language from './modules/language'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    issuance,
    transaction,
    contracted,
    language
  },
  getters
})

export default store
