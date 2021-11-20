<template>
  <v-btn 
    color="primary"
    rounded
    @click="signUp"
  >
    <v-icon v-if="icon" left>{{ icon }}</v-icon>
    <span v-if="text">{{ text }}</span>
  </v-btn>
</template>

<script>
  // import firebase from 'firebase'

  export default {
    name: 'SignUpButton',

    props: {
      text: String,
      provider: String,
      icon: String
    },

    methods: {
      signUp () {
        // TODO: sign up
      }
    }
  }
</script>
