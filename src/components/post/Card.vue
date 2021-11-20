<template>
  <div>
    <v-card shaped v-if="!post">
      <v-skeleton-loader class="pl-3 pt-3" type="heading"></v-skeleton-loader>
      <v-card-text>
        <v-skeleton-loader class="pb-2" type="image"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph"></v-skeleton-loader>
      </v-card-text>
    </v-card>
    <v-card shaped v-else>
      <router-link :to="{ name: 'Post', params: { id: post.id } }">
        <v-card-title style="word-break: break-word">
          {{ titleComputed }}
        </v-card-title>
        <v-row>
          <v-col>
            <img :src="imgSrc" width="100%" class="pl-5 pr-5" />
          </v-col>
        </v-row>
        <v-card-text>
          {{ textComputed }}
          <router-link v-if="showReadMore" :to="{ name: 'Post', params: { id: post.id } }">
            Read more
          </router-link>
        </v-card-text>
      </router-link>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PostCard',

  props: {
    inList: Boolean,
    post: Object
  },

  data: () => ({
    showReadMore: false
  }),

  computed: {
    imgSrc () {
      return this.post.imgUrl || 'https://via.placeholder.com/1200x1200?text=Dont+Worry+Be+Happy'
    },
    textComputed () {
      if (!this.post.text) return ''
      if (!this.inList) return this.post.text
      if (this.post.text.length > 500) {
        this.toggleShowReadMore()
        return this.post.text.slice(0, 497) + '... '
      }
      return this.post.text
    },
    titleComputed () {
      if (!this.post.title) return ''
      if (!this.inList) return this.post.title
      if (this.post.title.length > 250) {
        return this.post.title.slice(0, 247) + '... '
      }
      return this.post.title
    }
  },

  methods: {
    toggleShowReadMore () {
      this.showReadMore = true
    }
  }
}
</script>
