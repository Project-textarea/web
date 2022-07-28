import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes.js';

const router = new Router({
    mode: 'history',
    // mode: 'hash',
    routes: [].concat(Routes)
});
Vue.routerGo = router;

router.beforeEach((to, from, next) => {
    next();
})
export default router;
