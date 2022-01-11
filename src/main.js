import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './views/Normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import $ from 'jquery';
import _ from "lodash"

window.axios=axios
window.$ = $
window.jQuery=$
window._ = _

createApp(App).use(ElementPlus).use(VueAxios, axios).use(store).use(router).use(BootstrapVue3).mount('#app')
