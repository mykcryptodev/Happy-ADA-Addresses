<template>
  <v-btn
    color="primary"
    class="mr-2"
    @click="connectWallet"
  >
    {{ btnText }}
  </v-btn>
</template>

<script>
import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from '@/config'

export default {
  name: 'ConnectWallet',

  data: () => ({
    btnText: 'Connect'
  }),

  methods: {
    async connectWallet () {
      let walletConnect = null
      // load web3
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        this.$store.dispatch('setWeb3ConnectMethod', 'metamask')
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        this.$store.dispatch('setWeb3ConnectMethod', 'metamask')
      }
      else {
        //  Create WalletConnect Provider
        walletConnect = new WalletConnectProvider({
          infuraId: process.env.VUE_APP_INFURA_ID,
        })
        window.web3 = new Web3(walletConnect)
        this.$store.dispatch('setWeb3ConnectMethod', 'wallet-connect')
        // window.alert('Non-Ethereum browser detected. Consider using metamask!')
      }
      // mainnet
      const web3 = window.web3
      this.$store.dispatch('setWeb3', { web3 })
      // ensure proper network is used if in production
      // TODO: Uncomment this to force bsc mainnet
      if (window.ethereum && environment.isProd) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          })
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await web3.eth.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: '0x38', rpcUrl: 'https://bsc-dataseed.binance.org/' }],
              })
            } catch (addError) {
              this.$store.dispatch('setSnackbar', {
                snackbarColor: 'error',
                showSnackbar: true,
                snackbarY: 'top',
                snackbarX: 'right',
                snackbarText: `There was an error switching networks: ${switchError}`
              })
            }
          }
          // handle other "switch" errors
          this.$store.dispatch('setSnackbar', {
            snackbarColor: 'error',
            showSnackbar: true,
            snackbarY: 'top',
            snackbarX: 'right',
            snackbarText: `There was an error switching networks: error ${switchError.code}`
          })
        }
      }

      // store user account
      const accounts = walletConnect ? await walletConnect.enable() : await web3.eth.getAccounts()
      this.$store.dispatch('setBscAccount', {
        account: accounts[0]
      })
      return true
    }
  }

}
</script>
