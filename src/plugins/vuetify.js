import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#ffffff',
        secondary: '#F2C779',
        accent: '#BE3D06',
        error: '#769C26',
      },
    },
  },
});
