import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa' 
  },
  theme: {
    themes: {
      light: {
        primary: colors.deepPurple.darken3,
        secondary: colors.indigo.darken3
      }
    }
  }
});
