<template>
  <v-snackbar
    v-model="snackbar.showSnackbar"
    :bottom="snackbar.snackbarY === 'bottom'"
    :color="snackbar.snackbarColor"
    :left="snackbar.snackbarX === 'left'"
    :multi-line="snackbar.snackbarMode === 'multi-line'"
    :right="snackbar.snackbarX === 'right'"
    :top="snackbar.snackbarY === 'top'"
    :vertical="snackbar.snackbarMode === 'vertical'"
    rounded="pill"
    elevation="24"
    :timeout="snackbar.snackbarTimeout"
  >
    {{ snackbar.snackbarText }}
    <template v-slot:action="{ attrs }" v-if="snackbar.snackbarHref">
      <v-btn
        v-bind="attrs"
        color="primary"
        :href="snackbar.snackbarHref"
        small
        rounded
      >
        {{ snackbar.snackbarBtnText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'Snackbar',
    data () {
      return {}
    },
    computed: {
      snackbar () {
        return this.$store.getters.getSnackbar
      }
    }
  }
</script>
