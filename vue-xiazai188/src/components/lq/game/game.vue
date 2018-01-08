<template>
  <div class="game">
    <div v-if="gameinfo.HomeTeam!=undefined">
      <div class="gameTop">
        <div class="gameheader-wrap">
          <el-row class="gameheader">
            <el-col :span="3" ><div class="grid-content"><i class="el-icon-arrow-left el-icon" @click="backHistory"></i></div></el-col>
            <el-col :span="18">
              <router-link :to="'/lq/competition/schedule/' + gameinfo.Competition.Id" :competitionid="gameinfo.Competition.Id" class="grid-content">{{gameinfo.Competition.ShortName}}</router-link>
            </el-col>
            <el-col :span="3"><div class="grid-content"  @click="menuTabShow = !menuTabShow"><i class="el-icon-menu el-icon"></i></div></el-col>
          </el-row>
        </div>
        <el-row class="gameinfo-box">
          <el-col :span="8">
            <div class="grid-content left">
              <router-link :to="'/lq/team/teamsc/' + gameinfo.HomeTeam.Id" :homeTeamid="gameinfo.HomeTeam.Id">
                <p class="pic"><img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + gameinfo.HomeTeam.Id + '.jpg'"></p>
                <p class="name" v-if="gameinfo.HomeTeam.ShortName!=''">{{gameinfo.HomeTeam.ShortName}}</p><p class="name" v-else>{{gameinfo.HomeTeam.Name}}</p>
                <p class="little-word">{{gameinfo.Competition.ShortName}}排名{{gameinfo.HomeTeam.Rank}}</p>
              </router-link>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content middle">
                <p class="vs"><span class="score" v-if="gameinfo.AScore[0]!=undefined && gameinfo.AScore[0]!=''">{{gameinfo.AScore[0]}}</span><span class="score" v-else>--</span> : <span class="score" v-if="gameinfo.BScore[0]!=undefined && gameinfo.BScore[0]!=''">{{gameinfo.BScore[0]}}</span><span class="score" v-else>--</span></p>
                <p class="little-word" :lastupdate="lastupDate" v-if="lastupDate!=''">{{lastupDate | filterdatatime}}</p>
                <p class="little-word" v-else>--</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content right">
              <router-link :to="'/lq/team/teamsc/' + gameinfo.AwayTeam.Id" :homeTeamid="gameinfo.AwayTeam.Id">
                <p class="pic"><img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + gameinfo.AwayTeam.Id + '.jpg'"></p>
                <p class="name" v-if="gameinfo.AwayTeam.ShortName!=''">{{gameinfo.AwayTeam.ShortName}}</p><p class="name" v-else>{{gameinfo.AwayTeam.Name}}</p>
                <p class="little-word">{{gameinfo.Competition.ShortName}}排名{{gameinfo.AwayTeam.Rank}}</p>
              </router-link>
            </div>
          </el-col>
        </el-row>
        <div class="gametab-box">
          <el-row class="gametab1">
            <el-col :span="8">
              <div class="grid-content">
                <router-link :to="'/lq/game/b_gamegoaldata/' + matchid" :gameinfo="gameinfo">赛况<i></i></router-link>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <router-link :to="'/lq/game/b_gameanalyse/' + matchid" >分析<i></i></router-link>
              </div>            
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <router-link :to="'/lq/game/b_hdaoddsinfo/' + matchid" >赔率<i></i></router-link>
              </div>            
            </el-col>
          </el-row>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div v-else class="nodata-mess">暂无比赛信息</div>
    <v-menutab v-show="menuTabShow"></v-menutab>
  </div>
</template>

<script>
import menutab from '../../../components/header/menutab';

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,  // 获得路由传过来的id值
      'gameinfo': {},
      'lastupdate': '',
      'menuTabShow': false
    };
  },
  filters: {
    filterdatatime: function (input) { // 时间过滤器 template中{{ 需要过滤的值 | 过滤器表达式}}
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
      var minutes = d.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    }
  },
  created () {
    var gameinforUrl = 'live/Api/Api/index/cc/b_gameinfo/id/' + this.matchid;
    this.$http.jsonp(gameinforUrl).then(response => {
      response = response.body;
      this.gameinfo = response;
    }, response => {
    });
  },
  computed: {
    lastupDate () {
      var lastupdate;
      if (typeof (this.gameinfo.Date.value) === 'undefined') {
        lastupdate = parseInt(this.gameinfo.Date);
      } else {
        lastupdate = parseInt(this.gameinfo.Date.value);
      };
      return lastupdate;
    }
  },
  methods: {
    backHistory () {
      window.history.go(-1);
    }
  },
  components: {
    'v-menutab': menutab
  }
};
</script>

<style lang="less" scoped>
  a{
    text-decoration: none; 
    color:#000;
    display:block
  } 
  a:hover,a:visited{
    text-decoration: none;border:0;
  }
  p{
    margin:0;
    padding:0;
  }
  .gameheader-wrap{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:50px;
    line-height:50px;
    background:#fff;
    .gameheader{
      background:#f32b1b;
      color:#fff;
      height:50px;
      line-height:50px;
      text-align:center;
      a{
        color:#fff;
      }
      .el-icon{
        font-size:28px;
        padding:10px 0;
      }
      .el-icon-arrow-left{
        float:left;
        padding-left:4px;
      }
      .el-icon-menu{
        float:right;
        padding-right:8px;
      }
    }
  }
  .gameinfo-box{
    width:100%;
    height:auto;
    background:#f32b1b;
    color:#fff;
    padding:0 0 10px;
    a{
    color:#FFF;
    display:block;
    }
    .grid-content{
      text-align:center;
    }
    .left{
      float:left;
      padding-left:15px;
    }
    .right{
      float:right;
      padding-right:15px;
    }
    .pic{
      img{
        width:28px;
        height:28px;
      }
    }
    .name{
      padding:8px 0 4px;
    }
    .little-word{
      font-size:12px;
      color: #cecbcb;
    }
    .vs{
      margin-top:10px;
      margin-bottom:15px;
      span{
        padding:5px 12px;
        background:#ba2a1f;
        font-size:22px;
      }
    }
  }
  .gametab-box{
    width:100%;
    .gametab1{
      text-align:center;
      line-height:34px;
      .grid-content{
          i{

          }
          & > a{
           font-size:14px;
            &.router-link-active i{
                width: 35px;
                height: 2px;
                background: #f32b1b;
                margin: 0 auto;
                display:block;
            }
          }      
      }      
    }
  }
  .nodata-mess{
    margin:100px 0;
    text-align:center;
  }
</style>
