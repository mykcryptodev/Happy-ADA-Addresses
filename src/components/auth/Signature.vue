<template>
  <v-btn
    color="primary"
    class="mr-2"
    @click="sign"
    :loading="loading"
  >
    {{ btnText }}
  </v-btn>
</template>

<script>
// import Personal from 'web3-eth-personal'
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { environment } from '@/config'
const ethUtil = require('ethereumjs-util')
import sigUtil from 'eth-sig-util'
import Eth from 'ethjs'

export default {
  name: 'Signature',

  data: () => ({
    btnText: 'Sign',
    loading: false
  }),

  created () {
    window.Eth = Eth
  },

  computed: {
    adaAccount () {
      return this.$store.getters.getAdaAccount
    },
    bscAccount () {
      return this.$store.getters.getBscAccount
    },
    web3 () {
      return this.$store.getters.getWeb3
    },
    web3ConnectMethod () {
      return this.$store.getters.getWeb3ConnectMethod
    }
  },

  methods: {
    async sign () {
      this.loading = true
      let signature = ''
      const dataToSign = this.adaAccount + ':happy:' + this.bscAccount
      console.log('web3', this.web3)
      if (this.web3ConnectMethod === 'metamask') {
        const msg = ethUtil.bufferToHex(new Buffer(dataToSign, 'utf8'))
        const from = this.bscAccount
        /*  web3.personal.sign not yet implemented!!!
        *  We're going to have to assemble the tx manually!
        *  This is what it would probably look like in the future, though:
          web3.personal.sign(msg, from) function (err, result) {
            if (err) return console.error(err)
            console.log('PERSONAL SIGNED:' + result)
          })
        */
        const params = [msg, from]
        const method = 'personal_sign'
        // save the vue context for later
        const that = this

        this.web3.currentProvider.sendAsync({
          method,
          params,
          from,
        }, (err, result) => {
          // show error messgae
          if (err || result.error) {
            const error = err ? err : result.error
            that.$store.dispatch('setSnackbar', {
              snackbarColor: 'error',
              showSnackbar: true,
              snackbarY: 'top',
              snackbarX: 'right',
              snackbarText: `There was an error with the signature: ${error}`,
              snackbarTimeout: -1
            })
          }
          if (err) return console.error(err)
          if (result.error) return console.error(result.error)
          const msgParams = { data: msg }
          msgParams.sig = result.result
          const recovered = sigUtil.recoverPersonalSignature(msgParams)

          if (recovered.toLowerCase() === from.toLowerCase()) {
            that.loading = false
            that.$store.dispatch('setAccountPairingSignature', result.result)
          } else {
            that.$store.dispatch('setSnackbar', {
              snackbarColor: 'error',
              showSnackbar: true,
              snackbarY: 'top',
              snackbarX: 'right',
              snackbarText: `The BSC wallet who provided the signature did not match the BSC wallet address provided in the pairing.`,
              snackbarTimeout: -1
            })
          }
          /*
          method = 'personal_ecRecover'
          var params = [msg, result.result]
          web3.currentProvider.sendAsync({
            method,
            params,
            from,
          }, function (err, recovered) {
            console.dir({ err, recovered })
            if (err) return console.error(err)
            if (result.error) return console.error(result.error)
            if (result.result === from ) {
              console.log('Successfully verified signer as ' + from)
            } else {
              console.log('Failed to verify signer when comparing ' + result.result + ' to ' + from)
            }
          })
          */
        })
      } else {
        signature = await this.web3.eth.sign(
          dataToSign,
          this.bscAccount,
          (err, signature) => {
            this.loading = false
            if (err) return (err)
            return signature
          }
        )
      }
      return signature
    },
  }

}
</script>
