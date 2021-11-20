export const app = {
  state: {
    loadingApp: false,
    showNav: true,
  },
  mutations: {
    setLoadingApp (state, payload) {
      state.loadingApp = payload
    },
    setShowNav (state, payload) {
      state.showNav = payload
    },
  },
  actions: {
    setLoadingApp ({ commit }, payload) {
      return commit('setLoadingApp', payload)
    },
    setShowNav ({ commit }, payload) {
      return commit('setShowNav', payload)
    },
  },
  getters: {
    getLoadingApp (state) {
      return state.loadingApp
    },
    getShowNav (state) {
      return state.showNav
    },
  }
}
