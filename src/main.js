import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button"

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'

import Paginator from 'primevue/paginator'
import InputText from 'primevue/inputtext'
//createApp(App).use(store).use(router, PrimeVue, PrimeIcons).mount('#app')

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)

app.component('Paginator', Paginator)
app.component('InputText', InputText)

app.mount('#app')
