<template>
  <v-container class="mt-10 max-width">
    <v-row>
      <v-col>
        <transition 
          name="bounce" 
        >
          <v-card shaped v-if="!formComplete && showForm">
            <v-row>
              <v-col class="d-flex align-center justify-center">
                <img src="@/assets/logo-spin.gif" height="128px">
              </v-col>
            </v-row>
            <v-card-title class="d-flex justify-center">
              Happy Coin
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col class="d-flex justify-center ml-5 mr-5">
                  <v-list dense>
                    <v-subheader>THE BRIDGE WILL STAY OPEN UNTIL NOV 24th, 8PM UTC</v-subheader>
                    <v-list-item>
                      <v-list-item-content>By using this bridge, you will send all your remaining HAPPY in and receive ADA in your Cardano wallet address that you have to specify in step 3.</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>You will receive ADA in return AFTER the bridge closes.</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>You will receive 1:1 the amount of $ value in ADA that your HAPPY is worth by the time the bridge closes.</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Instead of paying a 10% swap tax through PanCakeSwap, only around 1% will be deducted from the total amount. We have to pay this fee to the cross-chain bridge service.</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Metamask Desktop &amp; Mobile support only</v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
              <v-row key="stepper">
                <v-col>
                  <v-stepper
                    v-model="e6"
                    vertical
                    flat
                  >
                    <v-stepper-step
                      :complete="e6 > 1"
                      step="1"
                    >
                      Create a wallet on Cardano
                    </v-stepper-step>

                    <v-stepper-content step="1">
                      <v-row class="d-flex justify-space-between align-center">
                        <v-col class="d-flex justify-start">
                          <v-card href="https://yoroi-wallet.com/#/">
                            <v-img
                              src="@/assets/yoroi.jpeg"
                              class="white--text align-end"
                              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                              height="128px"
                            >
                              <v-card-title class="pb-2 d-flex justify-center">
                                Yoroi
                              </v-card-title>
                            </v-img>
                          </v-card>
                        </v-col>
                        <v-col class="d-flex justify-start">
                          <v-card href="https://namiwallet.io/">
                            <v-img
                              src="@/assets/nami.jpeg"
                              class="white--text align-end"
                              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                              height="128px"
                            >
                              <v-card-title class="pb-2 d-flex justify-center">
                                Nami
                              </v-card-title>
                            </v-img>
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex align-middle mb-2">
                          <v-btn
                            color="primary"
                            class="mr-2"
                            @click="e6 = 2"
                          >
                            Next
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-step
                      :complete="e6 > 2"
                      step="2"
                    >
                      Connect your $HAPPY BSC wallet
                    </v-stepper-step>

                    <v-stepper-content step="2">
                      <div v-if="!this.bscAccount" class="pb-5">
                        This step proves to us that you are the owner of this $happy address
                      </div>
                      <div v-else>
                        <v-alert type="success">
                          You're connected with {{ this.bscAccountTruncated }}
                        </v-alert>
                      </div>
                      <v-row>
                        <v-col class="d-flex align-middle mb-2">
                          <span v-if="!this.bscAccount">
                            <ConnectWallet />
                          </span>
                          <span v-else>
                            <v-btn
                              color="primary"
                              class="mr-2"
                              @click="e6 = 3"
                            >
                              Continue
                            </v-btn>
                          </span>
                          <v-btn text @click="e6 = 1">
                            Go back
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-step
                      :complete="e6 > 3"
                      step="3"
                    >
                      Enter your Cardano wallet address
                    </v-stepper-step>

                    <v-stepper-content step="3">
                      <v-row>
                        <v-col>
                          When you save your Cardano address, you'll be asked to sign it with your BSC wallet.
                          We require your wallet's signature to ensure that the owner of the connected BSC wallet is the person who entered this Cardano address.
                          Creating a signature does not cost any gas and does not spend any tokens.
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="pa-5 pb-0">
                          <CardanoAddressForm />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex align-middle mb-2">
                          <Signature />
                          <v-btn text @click="e6 = 2">
                            Go Back
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-step 
                      :complete="e6 > 4"
                      step="4"
                    >
                      Send your $happy to the team
                    </v-stepper-step>
                    <v-stepper-content step="4" class="pt-0">
                      <v-list three-line>
                        <v-list-item>
                          <v-list-item-content>
                            This action will send all of the $HAPPY in your wallet to the development team.
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            The team will be using these tokens to withdraw BNB from the $HAPPY liquidity pool in order to swap it for ADA.
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            Announcements regarding the stake pool will be made shortly.
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                      <div class="d-flex">
                        <SendHappyBtn class="mr-2" v-if="!sentHappy" />
                        <v-btn
                          v-if="sentHappy"
                          color="primary"
                          class="mr-2"
                          @click="e6 = 5"
                        >
                          Finish
                        </v-btn>
                        <v-btn text @click="e6 = 3">
                          Go back
                        </v-btn>
                      </div>
                    </v-stepper-content>
                  </v-stepper>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </transition>
        <transition 
          name="bounce" 
        >
          <div
            v-if="formComplete"
          >
            <v-card shaped>
              <v-card-text>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <span class="x-large mt-5">🎉</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-center mb-0 mt-0">
                    <v-card-title>You're all set!</v-card-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    You will receive your ADA after the bridge closes
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-row>
                  <v-col class="mt-2 mb-2 d-flex justify-center">
                    <v-btn 
                      x-small
                      color="primary"
                      rounded
                      @click="e6 = 1"
                    >Reset form</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </div>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardanoAddressForm from '@/components/wallet/CardanoAddressForm'
import ConnectWallet from '@/components/auth/ConnectWallet'
import SendHappyBtn from '@/components/happy/Send'
import Signature from '@/components/auth/Signature'

export default {
  name: 'Home',
  
  components: {
    CardanoAddressForm,
    ConnectWallet,
    SendHappyBtn,
    Signature
  },

  data: () => ({
    e6: 1,
    showForm: false
  }),

  created () {
    setTimeout(() => {
      this.showForm = true
    }, 100)
  },

  watch: {
    async accountPairingSignature (newVal) {
      if (!newVal) return
      await this.saveAddressPair()
    }
  },

  computed: {
    accountPairingSignature () {
      return this.$store.getters.getAccountPairingSignature
    },
    adaAccount () {
      return this.$store.getters.getAdaAccount
    },
    bscAccount () {
      return this.$store.getters.getBscAccount
    },
    bscAccountTruncated () {
      const acct = this.bscAccount
      if (!acct) return ''
      const firstSixChar = acct.substring(0,6)
      const lastFourChar = acct.substring(acct.length - 4)
      return firstSixChar + '...' + lastFourChar
    },
    formComplete () {
      return this.e6 >= 5
    },
    sentHappy () {
      return this.$store.getters.getSentHappy
    },
    user () {
      return this.$store.getters.getUser
    }
  },

  methods: {
    async saveAddressPair () {
      await this.$store.dispatch('updateUserWalletPair', {
        user: this.user,
        updates: {
          accountPairingSignature: this.accountPairingSignature,
          adaAccount: this.adaAccount,
          bscAccount: this.bscAccount,
          uid: this.user.uid
        }
      })
      this.e6 = 4
    }
  }
}
</script>

<style scoped>
  .x-large {
    font-size: 64px !important;
  }
</style>