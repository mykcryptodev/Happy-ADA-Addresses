import firebase from 'firebase'

export const post = {
  state: {
    posts: []
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    }
  },
  actions: {
    async createPost (state, payload) {
      const db = firebase.firestore()
      return await db.collection('posts').add(payload.post)
    },
    async setPosts ({ commit }) {
      const db = firebase.firestore()
      await db.collection('posts').onSnapshot(querySnapshot => {
        let posts = []
        querySnapshot.forEach(doc => {
          let post = doc.data()
          post.id = doc.id
          posts.push(post)
        })
        return commit('setPosts', posts)
      })
    },
  },
  getters: {
    getPosts (state) {
      return state.posts
    }
  }
}
