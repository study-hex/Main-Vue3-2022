import { createApp } from '../node_modules/vue/dist/vue.esm-bundler.js';
// import { createApp } from 'vue'

import App from './AppJS.js'
// import App from '/src/App.vue'
import DeskApp from './DeskAppJS.js'
/** end of import */


// #DEV:-router
createApp(App).mount('#app')
createApp(DeskApp).mount('#deskApp')