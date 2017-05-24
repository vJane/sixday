import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import Details from '@/views/Details';
import Lists from '@/views/Lists';
import Map from '@/views/Map';
import Personal from '@/views/Personal';
import Calendar from '@/views/Calendar';
import WeatherPage from '@/views/WeatherPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
    },
    {
      path: '/lists',
      name: 'Lists',
      component: Lists,
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
    },
    {
      path: '/weather',
      name: 'WeatherPage',
      component: WeatherPage,
    },
  ],
});
