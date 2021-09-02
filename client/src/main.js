import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import axios from "axios";

const app = createApp(App);
// 引入element plus
installElementPlus(app);

// 服务器前缀
const baseURL = "http://localhost:3000";

// 全局配置axios
axios.defaults.baseURL = baseURL; // 配置前缀
axios.defaults.withCredentials = "true"; // 携带cookie
app.config.globalProperties.$axios = axios; // 添加到vue实例

app
  .use(store)
  .use(router)
  .mixin({
    data() {
      return { baseURL };
    },
  })
  .mount("#app");
