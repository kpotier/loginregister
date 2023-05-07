import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/index.scss";

import { I18nGlobal } from "./i18n";
import setupFontAwesome from "./fontawesome";

const i18n = I18nGlobal;
const app = createApp(App);
setupFontAwesome(app);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
