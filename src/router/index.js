import Vue from 'vue';
import Router from 'vue-router';

import Default from '@/containers/Default';
import SeriesWrapper from '@/views/Series/SeriesWrapper';

Vue.use(Router);

let caminhos = [
  {
    path: '/series',
    name: 'Series',
    component: SeriesWrapper,
  },
];

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: Default,
      children: caminhos,
      redirect: '/series',
    },
  ],
});
