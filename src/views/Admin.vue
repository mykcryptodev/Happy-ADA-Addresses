<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card shaped>
          <v-container class="pr-5 pl-5 mt-10">
            <v-row>
              <v-col class="d-flex align-center justify-center">
                <img src="../assets/logo-spin.gif" height="128px">
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-card-title class="pt-0">Admin</v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex align-center shrink">
                <v-btn x-large rounded color="primary">
                  <v-icon left>mdi-cloud-download</v-icon>
                  <download-csv
                    :data="computedAddressPairs">
                    Download CSV
                  </download-csv>
                </v-btn>
              </v-col>
              <v-col class="d-flex align-center shrink">
                <v-btn 
                  @click="loadAndVerify" 
                  x-large 
                  rounded
                  color="secondary" 
                  :loading="verifyLoading"
                  :disabled="verifyDisabled"
                >
                  <v-icon left>mdi-shield</v-icon>
                  Verify
                </v-btn>
              </v-col>
              <v-col class="d-flex align-center">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  outlined
                  rounded
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="computedAddressPairs"
            :search="search"
          >
            <template v-slot:item.isVerified="{ item }" >
              <v-icon v-if="item.isVerified" color="success">
                mdi-check-circle
              </v-icon>
              <v-icon v-else color="error">
                mdi-close-circle
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";
const ethUtil = require('ethereumjs-util')
// import sigUtil from 'eth-sig-util'
// import Eth from 'ethjs'

export default {
  name: 'Admin',

  data: () => ({
    computedAddressPairs: [],
    search: '',
    loading: true,
    headers: [
      {
        text: 'ADA',
        align: 'start',
        filterable: true,
        value: 'adaAccount',
      },
      { 
        text: 'BSC',
        align: 'start',
        filterable: true,
        value: 'bscAccount' 
      },
      {
        text: 'Verified',
        align: 'center',
        filterable: true,
        value: 'isVerified'
      }
    ],
    verifyLoading: false
  }),

  async created () {
    // Load Web 3
    let walletConnect = null
    // load web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
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
    // Load address pairs
    try {
      await this.$store.dispatch('setAddressPairs')
      this.computedAddressPairs = this.addressPairs
      this.loading = false
    } catch (err) {
      this.loading = false
    }
  },

  computed: {
    addressPairs () {
      return this.$store.getters.getAddressPairs
    },
    verifyDisabled () {
      return !this.web3 || !this.addressPairs
    },
    web3 () {
      return this.$store.getters.getWeb3
    }
  },

  methods: {
    async loadAndVerify () {
      this.verifyLoading = true
      this.verifyAllPairSignatures(this.addressPairs)
      .then(pairs => {
        this.computedAddressPairs = pairs
        this.verifyLoading = false
      })
    },
    async verifyAllPairSignatures (pairs) {
      return Promise.all(pairs.map(p => this.verifyPairSignature(p)))
    },
    verifyPairSignature (pair) {
      return new Promise((resolve) => {
        if (!pair.accountPairingSignature) {
          pair.isVerified = false
          return resolve(pair)
        }
        const signedData = pair.adaAccount + ':happy:' + pair.bscAccount
        const msg = ethUtil.bufferToHex(new Buffer(signedData, 'utf8'))
        const from = pair.bscAccount
        const params = [msg, pair.accountPairingSignature]
        const method = 'personal_ecRecover'
        return this.web3.currentProvider.sendAsync({
          method,
          params,
          from,
        }, (err, recovered) => {
          if (recovered.result.toLowerCase() !== from.toLowerCase()) {
            err = 'BSC Address mismatch'
          }
          err ? pair.isVerified = false : pair.isVerified = true
          return resolve(pair)
        })
      })
    }
  }
}
</script>
