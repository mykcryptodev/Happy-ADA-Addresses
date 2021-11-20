<template>
  <v-btn 
    color="primary"
    rounded
    @click="login"
  >
    <v-icon v-if="icon" left>{{ icon }}</v-icon>
    <span v-if="text">{{ text }}</span>
  </v-btn>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'LoginButton',

    props: {
      text: String,
      provider: String,
      icon: String
    },
    
    data: () => ({
      emailAuth: new firebase.auth.EmailAuthProvider(),
      facebookAuth: new firebase.auth.FacebookAuthProvider(),
      googleAuth: new firebase.auth.GoogleAuthProvider(),
    }),

    computed: {
      authProvider () {
        switch (this.provider) {
          case 'email':
            return this.emailAuth
          case 'facebook':
            return this.facebookAuth
          case 'google':
            return this.googleAuth
          default:
            return null
        }
      },
      user () {
        return this.$store.getters.getUser
      }
    },

    async created () {
      // handle being redirected here after logging in
      const redirectResult = await firebase.auth().getRedirectResult()
      console.log('redirect result', redirectResult)
      if (!redirectResult.user) return
      console.log('redirect result', redirectResult)

    },

    methods: {
      async login () {
        firebase.auth().signInWithRedirect(this.authProvider)
        // const credential = await this.getCredential()
        // const userCred = await firebase.auth().currentUser.linkWithCredential(credential)
        // const user = userCred.user
        // console.log('user', user)
        
        // const result = await firebase.auth().signInWithPopup(this.googleAuth)
        // if (result.additionalUserInfo.isNewUser) {
        //   this.$store.dispatch('setLoadingApp', true)
        //   await firebase.firestore().collection('users')
        //   .doc(result.user.uid).set({
        //     uid: result.user.uid,
        //     email: result.user.email
        //   })
        // }
        // return this.redirectAfterLogin()
      },
      redirectAfterLogin () {
        if (this.$route.query && this.$route.query.from) {
          return this.$router.replace(this.$route.query.from)
        }
        return this.$router.push({ name: 'Home' })
      }
    }
  }
</script>
