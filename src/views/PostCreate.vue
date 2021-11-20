<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card shaped>
          <v-card-title>
            <v-text-field v-model="title" placeholder="Title">
            </v-text-field>
          </v-card-title>
          <v-card-subtitle>
            <v-text-field v-model="imgUrl" placeholder="Image URL">
            </v-text-field>
          </v-card-subtitle>
          <v-card-text>
            <v-textarea v-model="text" placeholder="Post text...">
            </v-textarea>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" :loading="isLoading" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PostCreate',

  data: () => ({
    imgUrl: '',
    title: '',
    text: '',
    isLoading: false
  }),

  methods: {
    async save () {
      this.isLoading = true
      this.$store.dispatch('createPost', {
        post: {
          imgUrl: this.imgUrl,
          title: this.title,
          text: this.text
        }
      })
      return this.isLoading = false
    }
  }
}
</script>
