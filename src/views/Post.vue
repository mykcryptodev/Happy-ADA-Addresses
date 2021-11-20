<template>
  <v-container class="pt-10 max-width">
    <v-row>
      <v-col class="shrink">
        <v-card shaped>
          <v-btn text rounded @click="goBack()">
            <v-icon left>fa-chevron-left</v-icon>
            Back
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="isLoading">
      <v-col>
        <PostSkeletonLoader />
      </v-col>
    </v-row>
    <v-row v-else>
      <transition name="slide-fade-down-slow">
        <v-col>
          <PostCard :post="post" :inList="false" />
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from '@/components/post/Card'
import PostSkeletonLoader from '@/components/post/SkeletonLoader'

export default {
  name: 'Post',

  components: {
    PostCard,
    PostSkeletonLoader
  },

  created () {
    if (this.posts.length === 0) {
      this.$store.dispatch('setPosts')
    }
  },

  computed: {
    isLoading () {
      return !this.post
    },
    post () {
      return this.posts.find(p => p.id === this.postId)
    },
    posts () {
      return this.$store.getters.getPosts
    },
    postId () {
      return this.$route.params.id
    },
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
