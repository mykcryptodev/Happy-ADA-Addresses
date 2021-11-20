<template>
  <v-text-field
    v-model="cardanoAddress"
    :label="cardanoAddressTruncated"
    autocomplete="new-password"
    outlined
    rounded
  ></v-text-field>
</template>

<script>
export default {
  name: 'CardanoAddressForm',

  data: () => ({
    addressIsValid: null,
    cardanoAddress: ''
  }),

  watch: {
    bscAccount (newVal) {
      if (!newVal) return
      const pair = this.walletPairs.find(p => p.bscAccount === newVal)
      if (!pair) return
      console.log('pair', pair)
      return this.cardanoAddress = pair.adaAccount
    },
    async cardanoAddress (newVal) {
      if (!newVal) return
      this.addressIsValid = await this.verifyAddress(newVal)
    }
  },

  computed: {
    bscAccount () {
      return this.$store.getters.getBscAccount
    },
    cardanoAddressTruncated () {
      if (!this.cardanoAddress || this.cardanoAddress.length < 42) return ''
      const firstSixChar = this.cardanoAddress.substring(0,6)
      const lastFourChar = this.cardanoAddress.substring(this.cardanoAddress.length - 4)
      return firstSixChar + '...' + lastFourChar
    },
    walletPairs () {
      return this.$store.getters.getUserWalletPairs
    }
  },

  methods: {
    async verifyAddress (addr) {
      console.log(addr)
      // do verification here
      this.addressIsValid = true
      this.$store.dispatch('setAdaAccount', {
        account: this.cardanoAddress
      })
    }
  }
}
</script>
