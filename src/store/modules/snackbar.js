const snackbarTimeout = 6000
export const snackbar = {
  state: {
    snackbarText: '',
    snackbarY: '', // "top" or "bottom"
    snackbarX: '', // "right" or "left"
    snackbarMode: '', // "multi-line" or "vertical"
    snackbarColor: '',
    showSnackbar: false,
    snackbarHref: null,
    snackbarBtnText: '',
    snackbarTimeout: snackbarTimeout
  },
  mutations: {
    setSnackbar (state, payload) {
      console.log('payload', payload)
      for (const property in payload) {
        state[property] = payload[property]
      }
    },
    toggleShowSnackbar (state, payload) {
      return state.showSnackbar = payload
    },
  },
  actions: {
    setSnackbar ({ commit }, payload) {
      return commit('setSnackbar', payload)
    },
    toggleShowSnackbar ({ commit }, payload) {
      return commit('toggleShowSnackbar', payload)
    }
  },
  getters: {
    getSnackbar (state) {
      return {
        snackbarText: state.snackbarText,
        snackbarY: state.snackbarY,
        snackbarX: state.snackbarX,
        snackbarMode: state.snackbarMode,
        snackbarTimeout: state.snackbarTimeout,
        snackbarColor: state.snackbarColor,
        showSnackbar: state.showSnackbar,
        snackbarHref: state.snackbarHref,
        snackbarBtnText: state.snackbarBtnText
      }
    }
  }
}
