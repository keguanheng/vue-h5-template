import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import { getRequest, postRequest } from "./util/axios";
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
