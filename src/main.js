import Vue from 'vue'
import App from './App.vue'
import Cloudinary from "cloudinary-vue"

Vue.use(Cloudinary, {
  configuration: {
    cloudName: "dsteinberg" // this is my cloud name
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
