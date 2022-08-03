const Vue = require('vue');
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import router from './router';
import http from "./request/http";
import walletContact from "./utils/walletconnec";
Vue.prototype.$http = http;
Vue.prototype.$walletContact = walletContact;

Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
    next()

});
// import Vconsole from 'vconsole';
// let vConsole = new Vconsole();
// export default vConsole;

import utilsEvent from './utils/utils'

Vue.prototype.utilsEvent = utilsEvent;//main.js
import {newMessage} from  './utils/resetMessage.js';
Vue.prototype.$message = newMessage;

