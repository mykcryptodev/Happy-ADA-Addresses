export const token = {
  state: {
    happyTokenAddress: '0xB0B924C4a31b7d4581a7F78F57ceE1E65736Be1D',
    price: [],
    sendHappyTokenAddress: '0x844ea9a937ce6fce45ee50353ec48356d5f38389',
    sendTestHappyTokenAddress: '0x82140DE01eaae53e00A75a8E00429AACaC065b02',
    testHappyTokenAddress: '0xa863FAAd29A574e1285ab326b5f3bDDDDb600BEe',
    sentHappy: false,
  },
  mutations: {
    setSentHappy (state, payload) {
      state.sentHappy = payload
    },
    setPrice (state, payload) {
      state.price = payload
    }
  },
  actions: {
    setSentHappy ({ commit }, payload) {
      return commit('setSentHappy', payload)
    },
    async setPrice ({ commit, getters }) {
      const scientificToDecimal = (x) => {
        if (Math.abs(x) < 1.0) {
          let e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          let e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
      }
      const tokenAddr = getters.getHappyTokenAddress
      const url = `https://api.dex.guru/v1/tokens/${tokenAddr}-bsc`
      const req = await fetch(url)
      const json = await req.json()
      const price = json.priceUSD
      const convertedPrice = scientificToDecimal(price)
      const roundedPrice = Number(convertedPrice).toFixed(14)
      return commit ('setPrice', roundedPrice)
    },
  },
  getters: {
    getSentHappy (state) {
      return state.sentHappy
    },
    getHappyTokenAddress (state) {
      return state.happyTokenAddress
    },
    getTestHappyTokenAddress (state) {
      return state.testHappyTokenAddress
    },
    getTestSendHappyTokenAddress (state) {
      return state.sendTestHappyTokenAddress
    },
    getTokenPrice (state) {
      return state.price
    },
    getSendHappyTokenAddress (state) {
      return state.sendHappyTokenAddress
    }
  }
}
