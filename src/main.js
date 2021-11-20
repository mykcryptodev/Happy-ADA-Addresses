import Vue from 'vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import JsonCSV from 'vue-json-csv'
// import './registerServiceWorker'
import { environment, firebaseConfig } from './config'

Vue.config.productionTip = false
Vue.component('downloadCsv', JsonCSV)

let app = ''

firebase.initializeApp(firebaseConfig)

if (!environment.isProd) {
  firebase.functions().useEmulator('localhost', 5001)
  firebase.firestore().useEmulator('localhost', 8081)
  firebase.auth().useEmulator('http://localhost:9099/')
} else {
  firebase.analytics()
}

firebase.auth().onAuthStateChanged(async user => {
  // if there is no user, sign them in anonymously
  if (!user || user === null) {
    await firebase.auth().signInAnonymously()
  }
  store.dispatch('setUser', user)
  store.dispatch('setUserDoc', user)
  store.dispatch('setUserWalletPairs', user)
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
