import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      hasNavigation: true,
      requiresAdmin: false,
      requiresAuth: false,
    }
  },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: () => import('../views/Error.vue'),
  //   meta: {
  //     hasNavigation: false
  //   }
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: () => import('../views/Profile.vue'),
  //   meta: {
  //     hasNavigation: false,
  //     requiresAuth: true,
  //     redirectMessage: {
  //       type: 'warning',
  //       message: 'You must first login to access your profile.'
  //     }
  //   }
  // },
  // {
  //   path: '/welcome',
  //   name: 'Welcome',
  //   component: () => import('../views/Welcome.vue'),
  //   meta: {
  //     hasNavigation: false
  //   }
  // },
  {
    path: '/post/create',
    name: 'PostCreate',
    component: () => import('../views/PostCreate.vue'),
    meta: {
      hasNavigation: true,
      requiresAuth: false
    }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    meta: {
      hasNavigation: true,
      requiresAuth: false
    }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    meta: {
      hasNavigation: true,
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/auth/Profile.vue'),
    meta: {
      hasNavigation: true,
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: {
      hasNavigation: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/auth/Logout.vue'),
    meta: {
      hasNavigation: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      hasNavigation: true,
      requiresAdmin: true
    }
  },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: () => import('../views/Signup.vue'),
  //   meta: {
  //     hasNavigation: false
  //   }
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  /*
  ** Handle auth requests where no firebase user is present
  */
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const redirectMessage = to.meta.redirectMessage
  const hasNavigation = to.meta.hasNavigation
  
  store.dispatch('setShowNav', hasNavigation)
  store.dispatch('setLoadingApp', false)
  
  if (!requiresAuth && !requiresAdmin) {
    return next()
  }
  
  if (requiresAuth && !currentUser) {
    if (redirectMessage) { routerHelpers.showRedirectMessage(redirectMessage) }
    return next('login?from=' + to.path)
  }
  
  if (requiresAdmin && !currentUser) {
    if (redirectMessage) { routerHelpers.showRedirectMessage(redirectMessage) }
    return next('login?from=' + to.path)
  }

  console.log('going to route...', to)
  
  next()
})

const routerHelpers = {
  showRedirectMessage (redirectMessage) {
    store.dispatch('setSnackbar', {
      snackbarColor: redirectMessage.type,
      showSnackbar: true,
      snackbarY: 'top',
      snackbarX: 'center',
      snackbarText: redirectMessage.message
    })
  },
}

export default router
