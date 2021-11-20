import firebase from 'firebase'

export const admin = {
  state: {
    addressPairs: [],
  },
  mutations: {
    setAddressPairs (state, payload) {
      state.addressPairs = payload
    },
  },
  actions: {
    async setAddressPairs ({ commit }) {
      console.log('setting pairs...')
      const db = firebase.firestore()

      const walletPairs = db.collectionGroup('wallet-pairs')
      return walletPairs.get()
      .then(querySnapshot => {
        let pairs = []
        querySnapshot.forEach(doc => {
          let pair = doc.data()
          pair.id = doc.id
          pairs.push(pair)
        })
        return commit('setAddressPairs', pairs)
      })
      .catch(err => {
        return err
      })
    },
  },
  getters: {
    getAddressPairs (state) {
      return state.addressPairs
    },
  }
}
