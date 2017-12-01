import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home/home';
import news from '@/components/news/news';
import ruanjian from '@/components/ruanjian/ruanjian';
import games from '@/components/games/games';
import zuanti from '@/components/zuanti/zuanti';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/ruanjian',
      name: 'ruanjian',
      component: ruanjian
    },
    {
      path: '/games',
      name: 'games',
      component: games
    },
    {
      path: '/zuanti',
      name: 'zuanti',
      component: zuanti
    }
   ]
});
