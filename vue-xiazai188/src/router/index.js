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

import schedule_jclq from '@/components/lq/schedule_jclq';

import bteam from '@/components/lq/team/team';
import bteamzr from '@/components/lq/team/teamzr';
import bteamsc from '@/components/lq/team/teamsc';
import bteamstats from '@/components/lq/team/teamstats';

import bgame from '@/components/lq/game/game';

import bgamegoaldata from '@/components/lq/game/gamegoaldata';
import banalyse from '@/components/lq/game/analyse';
import bodds from '@/components/lq/game/odds';

import bgameanalyse from '@/components/lq/game/gameanalyse';
import bstat from '@/components/lq/game/stat';
import bgameprediction from '@/components/lq/game/gameprediction';

import b_hdaoddsinfo from '@/components/lq/game/zs_hdaoddsinfo';
import b_ahoddsinfo from '@/components/lq/game/zs_ahoddsinfo';
import b_ouoddsinfo from '@/components/lq/game/zs_ouoddsinfo';

import bcompetition from '@/components/lq/competition/competition';
import bschedule from '@/components/lq/competition/schedule';
import bshooter from '@/components/lq/competition/shooter';
import bstanding from '@/components/lq/competition/standing';

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
      component: lq,
      children: [
        {
          path: '/lq/schedule_jc',
          component: schedule_jclq
        }
      ],
      redirect: '/lq/schedule_jc'
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
    },
    {
      path: '/lq/team/teamsc/:teamid',
      component: bteam,
      children: [
        {
          path: '/lq/team/teamsc/:teamid',
          component: bteamsc
        },
        {
          path: '/lq/team/teamstats/:teamid',
          component: bteamstats
        },
        {
          path: '/lq/team/teamzr/:teamid',
          component: bteamzr
        }
      ]
    },
    {
      path: '/lq/game/gamegoaldata/:matchid',
      component: bgame,
      children: [
        {
          path: '/lq/game/b_gamegoaldata/:matchid',
          component: bgamegoaldata
        },
        {
          path: '/lq/game/b_gameanalyse/:matchid',
          component: banalyse,
          children: [
            {
              path: '/lq/game/b_gameanalyse/:matchid',
              component: bgameanalyse
            },
            {
              path: '/lq/game/b_gamestat/:matchid',
              component: bstat
            },
            {
              path: '/lq/game/b_gameprediction/:matchid',
              component: bgameprediction
            }
          ]
        },
        {
          path: '/lq/game/odds/:matchid',
          component: bodds,
          children: [
            {
              path: '/lq/game/b_hdaoddsinfo/:matchid',
              component: b_hdaoddsinfo
            },
            {
              path: '/lq/game/b_ahoddsinfo/:matchid',
              component: b_ahoddsinfo
            },
            {
              path: '/lq/game/b_ouoddsinfo/:matchid',
              component: b_ouoddsinfo
            }
          ]
        }
      ]
    },
    {
      path: '/lq/competition/schedule/:compid',
      component: bcompetition,
      children: [
        {
          path: '/lq/competition/schedule/:compid',
          component: bschedule
        },
        {
          path: '/lq/competition/shooter/:compid',
          component: bshooter
        },
        {
          path: '/lq/competition/standing/:compid',
          component: bstanding
        }
      ]
    }
   ]
});
