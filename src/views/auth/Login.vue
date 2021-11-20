<template>
  <v-container class="pt-15">
    <v-card shaped>
      <v-row>
        <v-col class="d-flex align-center justify-center">
          <img src="@/assets/logo-spin.gif" height="128px">
        </v-col>
      </v-row>

      <!-- <v-card-title class="d-flex justify-center">
        Sign Up
      </v-card-title>
      <v-card-text>
        <v-row class="pb-10">
          <v-col class="d-flex align-center justify-center">
            <SignUpButton
              icon="mdi-google"
              provider="google"
              text="Sign Up with Google"
            />
          </v-col>
          <v-col class="d-flex align-center justify-center">
            <SignUpButton
              icon="mdi-facebook"
              provider="facebook"
              text="Sign Up with Facebook"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-row>
        <v-col class="d-flex justify-center pt-10">
          <small class="text--disabled">Already have an account?</small>
        </v-col>
      </v-row> -->

      <v-card-title class="d-flex justify-center">
        Login
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="d-flex align-center justify-center">
            <LoginButton
              icon="mdi-google"
              provider="google"
              text="Login with Google"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col class="d-flex align-center justify-center">
            <LoginButton
              icon="mdi-facebook"
              provider="facebook"
              text="Login with Facebook"
            />
          </v-col>
        </v-row> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import LoginButton from '@/components/auth/LoginButton'
  // import SignUpButton from '@/components/auth/SignUpButton'
  
  export default {
    name: 'Login',
    
    components: {
      LoginButton,
      // SignUpButton
    },

    data: () => ({
    }),

    created () {
      // if the user is logged in already, send them home
      if (this.user && !this.user.isAnonymous) {
        return this.$router.push({ name: 'Home' })
      }
    },

    computed: {
      user () {
        return this.$store.getters.getUser
      }
    }
  }
</script>
