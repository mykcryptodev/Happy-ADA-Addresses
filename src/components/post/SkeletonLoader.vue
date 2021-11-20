<template>
  <v-card shaped>
    <v-card-text>
      <v-row>
        <v-col>
          <v-skeleton-loader type="heading"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-col>
        <v-col>
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PostSkeletonLoader',
}
</script>
