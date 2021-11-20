export const web3 = {
  state: {
    web3: null,
    web3ConnectMethod: null
  },
  
  mutations: {
    setWeb3 (state, payload) {
      state.web3 = payload
    },
    setWeb3ConnectMethod (state, payload) {
      state.web3ConnectMethod = payload
    }
  },

  actions: {
    setWeb3 ({ commit }, payload) {
      return commit('setWeb3', payload.web3)
    },
    setWeb3ConnectMethod ({ commit }, payload) {
      return commit('setWeb3ConnectMethod', payload)
    }
  },

  getters: {
    getWeb3 (state) {
      return state.web3
    },
    getWeb3ConnectMethod (state) {
      return state.web3ConnectMethod
    }
  }
}