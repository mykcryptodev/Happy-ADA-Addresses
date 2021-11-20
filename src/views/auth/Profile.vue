<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <v-card shaped>
          <v-card-title>
            Profile
          </v-card-title>
          <v-card-text>
            Profile page
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card shaped>
          <v-card-title>
            Logout
          </v-card-title>
          <v-card-text>
            <router-link :to="{ name: 'Logout' }">
              <v-btn rounded>
                <v-icon left>fa-sign-out-alt</v-icon>
                <span>Logout</span>
              </v-btn>
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',

  created () {
    if (!this.user) {
      this.$store.dispatch('setSnackbar', {
        snackbarColor: 'error',
        showSnackbar: true,
        snackbarY: 'top',
        snackbarX: 'right',
        snackbarText: `You must be logged in to view your profile`
      })
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

<style scoped>
a {
  text-decoration: none;
}
</style>