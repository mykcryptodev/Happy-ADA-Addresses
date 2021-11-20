import Vue from 'vue'
import Vuex from 'vuex'
import { account } from './modules/account'
import { admin } from './modules/admin'
import { app } from './modules/app'
import { post } from './modules/post'
import { snackbar } from './modules/snackbar'
import { token } from './modules/token'
import { user } from './modules/user'
import { web3 } from './modules/web3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    account,
    admin,
    app,
    post,
    snackbar,
    token,
    user,
    web3,
  }
})