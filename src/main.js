import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { BootstrapVue3 } from "bootstrap-vue-3";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "@/icons.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

import "@/styles/style.scss";

app
  .use(createPinia())
  .use(router)
  .use(BootstrapVue3)
  .use(Antd)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
