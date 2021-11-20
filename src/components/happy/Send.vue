<template>
  <div>
    <v-btn color="primary" @click="click" :disabled="disabled" :loading="loading">
      {{ btnText }}
    </v-btn>
  </div>
</template>

<script>
import { environment } from '@/config'
import Happy from '@/abis/HappyCoin.json'
import SendHappy from '@/abis/SendHappy.json'

export default {
  name: 'SendHappy',

  data: () => ({
    allowanceApproved: false,
    balance: null,
    happyContract: null,
    loading: false,
    sendHappyContract: null,
    userWalletTokenBalance: '',
  }),

  watch: {
    async web3 (newVal) {
      if (!newVal) return
      const networkId =  await this.web3.eth.net.getId()
      const sendHappyData = SendHappy.networks[networkId]
      const happyData = Happy.networks[networkId]

      this.sendHappyContract = new this.web3.eth.Contract(SendHappy.abi, sendHappyData.address)
      this.happyContract = new this.web3.eth.Contract(Happy.abi, happyData.address)
      this.balance = await this.happyContract.methods.balanceOf(this.bscAccount).call()
      const decimals = await this.happyContract.methods.decimals().call()
      const numTokens = this.balance / 10**decimals
      this.userWalletTokenBalance = numTokens.toFixed(4)
    }
  },

  computed: {
    bscAccount () {
      return this.$store.getters.getBscAccount
    },
    btnText () {
      return this.allowanceApproved ?  'Send $HAPPY' : 'Approve $HAPPY'
    },
    disabled () {
      return !this.happyContract || !this.sendHappyContract
    },
    happyAddress () {
      return environment.isProd ? this.$store.getters.getHappyTokenAddress : this.$store.getters.getTestHappyTokenAddress
    },
    sendHappyAddress () {
      return environment.isProd ? this.$store.getters.getSendHappyTokenAddress : this.$store.getters.getTestSendHappyTokenAddress
    },
    web3 () {
      return this.$store.getters.getWeb3
    }
  },

  methods: {
    async approve () {
      if (!this.bscAccount) return
      this.loading = true
      
      this.happyContract.methods.approve(this.sendHappyContract._address, this.balance).send({
        from: this.bscAccount
      })
      .on('transactionHash', hash => {
        this.$store.dispatch('setSnackbar', {
          snackbarColor: 'success',
          showSnackbar: true,
          snackbarY: 'top',
          snackbarX: 'right',
          snackbarText: `Transaction sent!`,
          snackbarBtnText: 'View on BSC Scan',
          snackbarHref: `https://${environment.isProd ? '' : 'testnet.'}bscscan.com/tx/${hash}`,
          snackbarTimeout: -1
        })
      })
      .on('confirmation', () => {
        this.allowanceApproved = true
        this.loading = false
        this.$store.dispatch('toggleShowSnackbar', false)
      })
      .on('error', (err) => {
        this.$store.dispatch('toggleShowSnackbar', false)
        this.loading = false
        this.$store.dispatch('setSnackbar', {
          snackbarColor: 'error',
          showSnackbar: true,
          snackbarY: 'top',
          snackbarX: 'right',
          snackbarText: `Transaction Error!: ${err.message}`,
          snackbarTimeout: 6000
        })
      })
    },
    async click () {
      return this.allowanceApproved ? this.send() : this.approve()
    },
    async send () {
      this.loading = true
      this.sendHappyContract.methods.sendHappy(this.balance).send({
        from: this.bscAccount
      })
      .on('transactionHash', hash => {
        this.$store.dispatch('setSnackbar', {
          snackbarColor: 'success',
          showSnackbar: true,
          snackbarY: 'top',
          snackbarX: 'right',
          snackbarText: `Transaction sent!`,
          snackbarBtnText: 'View on BSC Scan',
          snackbarHref: `https://${environment.isProd ? '' : 'testnet.'}bscscan.com/tx/${hash}`,
          snackbarTimeout: -1
        })
        this.loading = false
        this.$store.dispatch('setSentHappy', true)
      })
      .on('error', (err) => {
        this.$store.dispatch('toggleShowSnackbar', false)
        this.loading = false
        this.$store.dispatch('setSnackbar', {
          snackbarColor: 'error',
          showSnackbar: true,
          snackbarY: 'top',
          snackbarX: 'right',
          snackbarText: `Transaction Error!: ${err.message}`,
          snackbarTimeout: 6000
        })
      })
    },
  }
}
</script>
