<template>
  <v-app>
    <v-main>
      <Snackbar />
      <transition name="slide-fade-up-slow">
        <Navbar />
      </transition>
      <transition name="slide-fade-down-slow">
        <div v-if="loadingApp">
          <v-row>
            <v-col
              class="d-flex justify-center align-center text-center"
              style="height: 100vh;"
            >
              <v-progress-circular
                indeterminate
                color="primary"
                :size="100"
                :width="10"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </div>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/navigation/Navbar'
import Snackbar from '@/components/utilities/Snackbar'

export default {
  name: 'App',

  components: {
    Snackbar,
    Navbar
  },

  data: () => ({
    //
  }),

  computed: {
    loadingApp () {
      return this.$store.getters.getLoadingApp
    }
  }
};
</script>

<style>
/* hide emulator warning */
.firebase-emulator-warning {
  display: none;
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
}

a {
  text-decoration: none;
}

.v100 {
  height: 100%;
}

/* App font */
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./assets/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.ttf') format('truetype');
  font-weight: bold;
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./assets/fonts/plus-jakarta-sans/PlusJakartaSans-BoldItalic.ttf') format('truetype');
  font-weight: bold, italic;
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./assets/fonts/plus-jakarta-sans/PlusJakartaSans-Italic.ttf') format('truetype');
  font-weight: italic;
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./assets/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.ttf') format('truetype');
}
.v-application {
  font-family: 'Plus Jakarta Sans'; 
}
.v-application .headline {
  font-family: inherit !important;
}

/* Font Color */
.theme--light.v-application,
.theme--light.v-card,
.theme--light.v-card .v-card__text,
.theme--light.v-sheet,
.theme--light.v-list-item
{
  color: rgb(58, 57, 94) !important;
}

/* Background image */
.theme--light.v-application {
  background-image: url('assets/img/bg-lite.svg') !important;
  background-size: cover !important;
}
.theme--dark.v-application {
  background-image: url('assets/img/bg-dark.svg') !important;
  background-size: cover !important;
}


/* Rounded cards and sheets */
.v-sheet.v-card.v-sheet--shaped {
  border-radius: 24px !important;
}
.v-expansion-panels {
  border-radius: 24px !important;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
  border-radius: 24px !important;
}
.v-sheet--shaped {
  border-radius: 24px !important;
}
.v-dialog--active {
  border-radius: 24px !important;
}
.v-sheet.v-list {
  border-radius: 24px !important;
}
.shaped {
  border-radius: 24px !important;
}

/* No all caps */
.v-btn {
  text-transform: capitalize;
}
.v-tab {
  text-transform: capitalize !important;
}

/* Fix transparent tabs */
.theme--light.v-tabs-items {
  background-color: transparent !important;
}
.theme--light.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}

.cursor-pointer {
  cursor: pointer !important;
}

/* Animation */
.slide-fade-down-slow-enter-active {
  transition: all .8s ease;
}
.slide-fade-down-slow-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-down-slow-enter, .slide-fade-down-slow-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
.slide-fade-up-slow-enter-active {
  transition: all .8s ease;
}
.slide-fade-up-slow-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-up-slow-enter, .slide-fade-down-slow-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100px);
  opacity: 0;
}
.slide-fade-down-and-back-enter-active {
  transition: all .3s ease;
}
.slide-fade-down-and-back-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-down-and-back-enter {
  transform: translateY(100px);
  opacity: 0;
}
.slide-fade-down-slow-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
/* .bounce-leave-active {
  animation: bounce-in .5s reverse;
} */
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
