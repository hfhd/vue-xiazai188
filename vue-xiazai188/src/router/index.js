import Vue from 'vue';
import Router from 'vue-router';
import zq from '@/components/zq/zq';
import lq from '@/components/lq/lq';
import schedule_jc from '@/components/zq/schedule_jc';
import schedule_sfc from '@/components/zq/schedule_sfc';
import schedule_dc from '@/components/zq/schedule_dc';
import game from '@/components/zq/game/game';
import gamegoaldata from '@/components/zq/game/gamegoaldata';

import analyse from '@/components/zq/game/analyse';
import odds from '@/components/zq/game/odds';

import gameanalyse from '@/components/zq/game/gameanalyse';
import stat from '@/components/zq/game/stat';
import gameprediction from '@/components/zq/game/gameprediction';

import zs_hdaoddsinfo from '@/components/zq/game/zs_hdaoddsinfo';
import zs_ahoddsinfo from '@/components/zq/game/zs_ahoddsinfo';
import zs_ouoddsinfo from '@/components/zq/game/zs_ouoddsinfo';

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
    },
    {
      path: '/zq/game/gamegoaldata/:matchid',
      component: game,
      children: [
        {
          path: '/zq/game/gamegoaldata/:matchid',
          component: gamegoaldata
        },
        {
          path: '/zq/game/gameanalyse/:matchid',
          component: analyse,
          children: [
            {
              path: '/zq/game/gameanalyse/:matchid',
              component: gameanalyse
            },
            {
              path: '/zq/game/stat/:matchid',
              component: stat
            },
            {
              path: '/zq/game/gameprediction/:matchid',
              component: gameprediction
            }
          ]
        },
        {
          path: '/zq/game/odds/:matchid',
          component: odds,
          children: [
            {
              path: '/zq/game/zs_hdaoddsinfo/:matchid',
              component: zs_hdaoddsinfo
            },
            {
              path: '/zq/game/zs_ahoddsinfo/:matchid',
              component: zs_ahoddsinfo
            },
            {
              path: '/zq/game/zs_ouoddsinfo/:matchid',
              component: zs_ouoddsinfo
            }
          ]
        }
      ]
    }
   ]
});
