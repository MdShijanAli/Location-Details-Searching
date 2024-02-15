import 'primevue/resources/themes/aura-light-green/theme.css';
import "./style.css";

import { createPinia } from 'pinia';
import PrimeVue from "primevue/config";
import Dropdown from 'primevue/dropdown';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue);

app.component('Dropdown', Dropdown);

app.mount('#app')
