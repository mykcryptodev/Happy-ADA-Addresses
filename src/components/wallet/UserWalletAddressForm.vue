<template>
  <v-row>
    <v-col>
      <v-form>
        <v-text-field 
          solo 
          rounded
          placeholder="your wallet address"
          v-model="address"
          hint="never enter your seed phrase!"
          clearable
          @click:clear="clearStoredWallet"
        ></v-text-field>
        <v-btn 
          :disabled="disabled" 
          color="primary" 
          block 
          rounded
          @click="save"
        >save</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserWalletAddressForm',

  data: () => ({
    address: ''
  }),

  created () {
    if (this.userWalletAddress) {
      this.address = this.userWalletAddress
    }
  },

  watch: {
    userWalletAddress (newVal) {
      if (!newVal) return
      this.address = newVal
    }
  },

  computed: {
    disabled () {
      return !this.address
    },
    user () {
      return this.$store.getters.getUser
    },
    userDoc () {
      return this.$store.getters.getUserDoc
    },
    userWalletAddress () {
      return this.userDoc ? this.userDoc.walletAddress : null
    }
  },

  methods: {
    async save () {
      await this.$store.dispatch('updateUserDoc', {
        user: this.user,
        updates: {
          walletAddress: this.address
        }
      })
    },
    clearStoredWallet () {
      this.address = ''
      this.save()
    }
  }
}
</script>
