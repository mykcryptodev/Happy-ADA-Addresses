<template>
  <v-container class="pt-10 max-width">
    <v-row>
      <transition name="slide-fade-down-slow">
        <v-col v-if="!isLoading">
          <v-card shaped>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-card-title class="pb-0 mb-0">
                  <span v-if="!userWalletUsdValue">
                    $0.00
                  </span>
                  <span v-else>
                    {{ userWalletUsdValue }}
                  </span>
                </v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-card-subtitle class="d-flex align-center pt-0 mt-0">
                  <img src="@/assets/logo.png" height="16px">
                  <span v-if="userWalletTokenBalance" class="ml-1">
                    {{ userWalletTokenBalance }}
                  </span>
                  <span v-else class="ml-1">
                    0
                  </span>
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-card-text>
              <v-row>
                <v-col>
                  <UserWalletAddressForm />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <v-btn rounded>
                    <v-icon left>fa-paper-plane</v-icon>
                    Send
                  </v-btn>
                </v-col>
              </v-row> -->
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <small class="text--disabled">
                current price: ${{ price }}
              </small>
            </v-card-actions>
          </v-card>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import UserWalletAddressForm from '@/components/wallet/UserWalletAddressForm'

export default {
  name: 'Wallet',

  components: {
    UserWalletAddressForm
  },

  data: () => ({
    isLoading: true,
    showUserWalletAddressForm: true,
    userWalletUsdValue: '',
    userWalletTokenBalance: ''
  }),

  async created () {
    await this.$store.dispatch('setPrice')
    this.getUserWalletValue()
    this.isLoading = false
  },

  watch: {
    userWalletAddress (newVal) {
      console.log('userWalletAddress changed' , newVal)
      if (!newVal) return
      this.getUserWalletValue()
    }
  },

  computed: {
    price () {
      return this.$store.getters.getTokenPrice
    },
    happyTokenAddress () {
      return this.$store.getters.getHappyTokenAddress
    },
    userDoc () {
      return this.$store.getters.getUserDoc
    },
    userWalletAddress () {
      return this.userDoc ? this.userDoc.walletAddress : null
    },
  },

  methods: {
    async getUserWalletValue () {
      if (!this.userWalletAddress) return
      const Web3 = require('web3')
      // mainnet
      const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
      const minABI = [
        // balanceOf
        {
          "constant":true,
          "inputs":[{"name":"_owner","type":"address"}],
          "name":"balanceOf",
          "outputs":[{"name":"balance","type":"uint256"}],
          "type":"function"
        },
        // decimals
        {
          "constant":true,
          "inputs":[],
          "name":"decimals",
          "outputs":[{"name":"","type":"uint8"}],
          "type":"function"
        }
      ]
      const happyContract = new web3.eth.Contract(minABI, this.happyTokenAddress)
      const balance = await happyContract.methods.balanceOf(this.userWalletAddress).call()
      const decimals = await happyContract.methods.decimals().call()
      const numTokens = balance / 10**decimals
      const value = numTokens * this.price
      this.userWalletTokenBalance = numTokens.toFixed(4)
      this.userWalletUsdValue = '$' + value.toFixed(2)
    }
  }
}
</script>
