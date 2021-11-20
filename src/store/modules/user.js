import firebase from 'firebase'

export const user = {
  state: {
    user: null,
    userDoc: null,
    userWalletPairs: []
  },
  
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserDoc (state, payload) {
      state.userDoc = payload
    },
    setUserWalletPairs (state, payload) {
      state.userWalletPairs = payload
    } 
  },

  actions: {
    async createUserDoc (state, payload) {
      console.log('setting...')
      const db = firebase.firestore()
      const ref = db.collection('users').doc(payload.uid)
      const userDoc = { uid: payload.uid }
      return await ref.set(userDoc)
    },
    setUser ({ commit }, payload) {
      return commit('setUser', payload)
    },
    setUserDoc ({ commit, dispatch }, payload) {
      console.log('setting user doc', payload)
      const db = firebase.firestore()

      const userDoc = db.collection('users').doc(payload.uid)
      userDoc.onSnapshot(docSnapshot => {
        if (!docSnapshot.exists) {
          return dispatch ('createUserDoc', payload)
        }
        return commit('setUserDoc', docSnapshot.data())
      }, err => {
        return err
      })
    },
    async setUserWalletPairs ({ commit }, payload) {
      const db = firebase.firestore()

      db.collection('users')
      .doc(payload.uid)
      .collection('wallet-pairs')
      .onSnapshot(querySnapshot => {
        let pairs = []
        querySnapshot.forEach(doc => {
          let pair = doc.data()
          pair.id = doc.id
          pairs.push(pair)
        })
        return commit('setUserWalletPairs', pairs)
      })
    },
    async updateUserDoc (state, payload) {
      console.log('payload for update', payload)
      const db = firebase.firestore()
      
      await db.collection('users')
      .doc(payload.user.uid)
      .update(payload.updates)
    },
    async updateUserWalletPair (state, payload) {
      const db = firebase.firestore()
      
      const ref = db.collection('users')
      .doc(payload.user.uid)
      .collection('wallet-pairs')
      .doc(payload.updates.bscAccount)

      return await ref.set(payload.updates)
    }
  },

  getters: {
    getUser (state) {
      return state.user
    },
    getUserDoc (state) {
      return state.userDoc
    },
    getUserWalletPairs (state) {
      return state.userWalletPairs
    }
  }
}