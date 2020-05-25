import Vue from 'vue';
import VueRouter from 'vue-router';
import Charts from '../views/Charts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Charts',
    component: Charts,
  },
  {
    path: '/data',
    name: 'Table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
