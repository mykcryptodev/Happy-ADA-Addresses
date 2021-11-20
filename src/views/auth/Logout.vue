<template>
  <v-container>
    <v-row class="d-flex justify-center text-center">
      <v-col>
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  
  export default {
    name: 'Logout',
    created () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('setUser', null)
        this.$router.push({ name: 'Home' })
      })
    }
  }
</script>
