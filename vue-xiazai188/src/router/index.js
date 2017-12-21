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

import team from '@/components/zq/team/team';
import teamzr from '@/components/zq/team/teamzr';
import teamsc from '@/components/zq/team/teamsc';
import teamstats from '@/components/zq/team/teamstats';

import competition from '@/components/zq/competition/competition';
import schedule from '@/components/zq/competition/schedule';
import shooter from '@/components/zq/competition/shooter';
import standing from '@/components/zq/competition/standing';

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
    },
    {
      path: '/zq/team/teamsc/:teamid',
      component: team,
      children: [
        {
          path: '/zq/team/teamsc/:teamid',
          component: teamsc
        },
        {
          path: '/zq/team/teamstats/:teamid',
          component: teamstats
        },
        {
          path: '/zq/team/teamzr/:teamid',
          component: teamzr
        }
      ]
    },
    {
      path: '/zq/competition/schedule/:compid',
      component: competition,
      children: [
        {
          path: '/zq/competition/schedule/:compid',
          component: schedule
        },
        {
          path: '/zq/competition/shooter/:compid',
          component: shooter
        },
        {
          path: '/zq/competition/standing/:compid',
          component: standing
        }
      ]
    }
   ]
});
