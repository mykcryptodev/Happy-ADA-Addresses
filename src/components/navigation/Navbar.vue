<template>
  <v-card class="mx-auto overflow-hidden sharp-top bg-transparent v100" :elevation="0">
    <v-app-bar v-if="showNav">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      
        <v-row>
          <v-col class="d-flex justify-center">
            <v-toolbar-title>
              <router-link :to="{ name: 'Home' }">
                <div class="d-flex align-center">
                  <span style="font-size: 32px;">
                    happycoin
                  </span>
                  <img src="@/assets/ada.png" height="42px" class="mr-2 ml-2"/>
                  <span style="font-size: 32px;">
                    bridge
                  </span>
                </div>
              </router-link>
            </v-toolbar-title>
          </v-col>
        </v-row>
      

      <!-- <v-spacer></v-spacer>

      <router-link :to="{ name: authButton.routeName }">
        <v-btn value="auth" rounded text>
          <v-icon left >{{ authButton.icon }}</v-icon>
          <span>{{ authButton.label }}</span>
        </v-btn>
      </router-link> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item 
            v-for="item in items" 
            :key="item.title" 
            :to="{ name: item.routeName }"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-bottom-navigation :elevation="0" class="mt-10">
        <p class="text--disabled">
          <small>
            <strong>
              version 1.2.2
            </strong>
          </small>
        </p>
      </v-bottom-navigation>
    </v-navigation-drawer>
    <div class="d-flex justify-center">
      <router-view></router-view>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'BottomNav',

  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Announcements',
        icon: 'fa-bullhorn',
        routeName: 'Announcements'
      },
      {
        title: 'Wallet',
        icon: 'fa-wallet',
        routeName: 'Wallet'
      },
      {
        title: 'Resources',
        icon: 'fa-book',
        routeName: 'Resources'
      },
      {
        title: 'Exercises',
        icon: 'fa-brain',
        routeName: 'Exercises'
      },
      {
        title: 'Questionairre',
        icon: 'fa-clipboard-list',
        routeName: 'Questionairre'
      },
    ]
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },

  computed: {
    authButton () {
      if (this.user && !this.user.isAnonymous) {
        return {
          icon: 'fa-user-circle',
          label: 'Profile',
          routeName: 'Profile'
        }
      }
      return {
        icon: 'fa-sign-in-alt',
        label: 'Login',
        routeName: 'Login'
      }
    },
    
    showNav () {
      return this.$store.getters.getShowNav
    },

    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped>
.v-application a {
  color: inherit !important;
}

.v-item-group.v-bottom-navigation {
  box-shadow: none;
}

.bg-transparent {
  background: transparent !important;
}

.max-width {
  max-width: 768px;
}

.sharp-top {
  border-radius: 0px 0px 2px 2px !important;
}
</style>


