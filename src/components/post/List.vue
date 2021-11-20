<template>
  <div>
    <v-row v-if="isLoading" class="d-flex justify-center">
      <v-col v-for="n in 5" :key="n" cols="12">
        <router-link :to="{ name: 'Post', params: { id: n } }">
          <v-card shaped>
            <v-skeleton-loader class="pl-3 pt-3" type="heading"></v-skeleton-loader>
            <v-card-text>
              <v-skeleton-loader class="pb-2" type="image"></v-skeleton-loader>
              <v-skeleton-loader type="paragraph"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <transition-group name="slide-fade-down-slow">
        <v-col v-for="post in posts" :key="post.id">
          <PostCard :post="post" :inList="true" class="mb-2" />
        </v-col>
      </transition-group>
    </v-row>
  </div>
</template>

<script>
import PostCard from '@/components/post/Card'

export default {
  name: 'PostList',

  components: {
    PostCard
  },

  created () {
    this.$store.dispatch('setPosts')
  },

  computed: {
    isLoading () {
      return this.posts.length === 0
    },
    posts () {
      return this.$store.getters.getPosts
    }
  },
}
</script>
