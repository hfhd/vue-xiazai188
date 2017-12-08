import Vue from 'vue';
import Router from 'vue-router';
import zq from '@/components/zq/zq';
import lq from '@/components/lq/lq';
import schedule_jc from '@/components/zq/schedule_jc';
import schedule_sfc from '@/components/zq/schedule_sfc';
import schedule_dc from '@/components/zq/schedule_dc';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/zq',
      component: zq,
      redirect: '/zq/schedule_jc'
    },
    {
      path: '/zq',
      name: 'zq',
      component: zq,
      children: [
        {
          path: '/zq/schedule_dc',
          component: schedule_dc
        },
        {
          path: '/zq/schedule_sfc',
          component: schedule_sfc
        },
        {
          path: '/zq/schedule_jc',
          component: schedule_jc
        }
      ],
       redirect: '/zq/schedule_jc'
    },
    {
      path: '/lq',
      name: 'lq',
      component: lq
    }
   ]
});
