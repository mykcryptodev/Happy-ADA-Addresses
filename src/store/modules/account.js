export const account = {
  state: {
    accountPairingSignature: null,
    adaAccount: null,
    bscAccount: null
  },
  
  mutations: {
    setAccountPairingSignature (state, payload) {
      state.accountPairingSignature = payload
    },
    setAdaAccount (state, payload) {
      state.adaAccount = payload
    },
    setBscAccount (state, payload) {
      state.bscAccount = payload
    },
  },

  actions: {
    setAccountPairingSignature ({ commit }, payload) {
      return commit('setAccountPairingSignature', payload)
    },
    setAdaAccount ({ commit }, payload) {
      return commit('setAdaAccount', payload.account)
    },
    setBscAccount ({ commit }, payload) {
      return commit('setBscAccount', payload.account)
    }
  },

  getters: {
    getAccountPairingSignature (state) {
      return state.accountPairingSignature
    },
    getAdaAccount (state) {
      return state.adaAccount
    },
    getBscAccount (state) {
      return state.bscAccount
    }
  }
}