<template>
  <div class="shooter">
    <div class="tab-box">
          <ul>
            <li @click="tabExent('a')" :class="{'active': tabExtentShowa}">球队</li>
            <li @click="tabExent('b')" :class="{'active': tabExtentShowb}">球员</li> 
          </ul>      
        </div>
        <div class="zhegie-wrap">
          <div class="tab-item" v-show="tabExtentShowa">
            <div v-if="Teams!=undefined && Teams.length!=0">
              <div class="fr RightRowNav">
                <ul class="centerTab">
                    <li v-for="(teamtype, str, index) in Teams" :teamtype="TeamType"  @click="tabExent2(index)" :class="{'active': index == tabnum}">{{TeamType[index]}}</li>
                </ul>
              </div>
              <div class="row leftSlideBox">
                <div class="col-xs-3 left-row">
                    <ul class="team-left">
                        <li><a>球队</a></li>
                        <li><a>场数</a></li>
                        <li><a>得分</a></li>
                        <li><a>投篮命中率</a></li>
                        <li><a>三分命中率</a></li>
                        <li><a>罚球命中率</a></li>
                        <li><a>进攻</a></li>
                        <li><a>防守</a></li>
                        <li><a>篮板总数</a></li>
                        <li><a>助攻</a></li>
                        <li><a>犯规</a></li>
                        <li><a>抢断</a></li>
                        <li><a>失误</a></li>
                        <li><a>盖帽</a></li>
                        <li><a>快攻成功率</a></li>
                        <li><a>扣篮</a></li>
                    </ul>
                </div>
                <div class="col-xs-9 rightRowBox">
                  <div class="tab-item" v-for="(Team, index, num) in Teams" :key="num" v-show="num==tabnum">
                    <div v-if="Team.length==0"  class="nodata-mess">暂无数据</div>
                    <div v-else>
                      <table class="table">
                        <tbody class="table-body">
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team" v-if="team[1]!='' && team[1]!=undefined"><a :href="'#/lq/team/teamsc/' + team[0]" class="w_blue">{{team[1]}}</a></td>
                              <td align="center" v-else></td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[2]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[17]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[3]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[5]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[7]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[9]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[10]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[11]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[12]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[13]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[14]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[15]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[16]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[18]}}</td>
                          </tr>
                          <tr class="team">
                              <td align="center" v-for="(team, str, index) in Team">{{team[20]}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nodata-mess" v-else>暂无数据</div>  
          </div>
          <div class="tab-item" v-show="tabExtentShowb">
            <div v-if="Players!=undefined && Players.length!=0">
              <div class="fr RightRowNav">
                <ul class="centerTab">
                    <li v-for="(teamtype, str, index) in Players" :teamtype="PlayerType"  @click="tabExent3(index)" :class="{'active': index == tabnum3}">{{TeamType[index]}}</li>
                </ul>
              </div>
              <div class="row leftSlideBox">
                <div class="col-xs-3 left-row">
                    <ul class="player-left">
                      <li class="playernametit"><a>球员</a></li>
                      <li><a>场数</a></li>
                      <li><a>首发场数</a></li>
                      <li><a>得分</a></li>
                      <li><a>时间（分）</a></li>
                      <li><a>投篮命中率</a></li>
                      <li><a>三分命中率</a></li>
                      <li><a>罚球命中率</a></li>
                      <li><a>进攻</a></li>
                      <li><a>防守</a></li>
                      <li><a>篮板总数</a></li>
                      <li><a>助攻</a></li>
                      <li><a>犯规</a></li>
                      <li><a>抢断</a></li>
                      <li><a>失误</a></li>
                      <li><a>盖帽</a></li>
                      <li><a>快攻成功率</a></li>
                      <li><a>扣篮</a></li>
                    </ul>
                </div>
                <div class="col-xs-9 rightRowBox">
                  <div class="tab-item" v-for="(Team, index, num) in Players" :key="num" v-show="num==tabnum3">
                    <div v-if="Team.length==0"  class="nodata-mess">暂无数据</div>
                    <div v-else>
                      <table class="table">
                        <tbody class="table-body">
                          <tr class="player playername">
                              <td align="center" v-for="(team, str, index) in Team" v-if="team[1]!=0 && team[1]!=undefined" :key="index">{{team[1]}}
                              </td>
                              <td align="center" v-else>--</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[2]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[3]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[19]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[4]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[5]}}</td>
                          </tr>
                          <tr class="player"> 
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[7]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[9]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[11]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[12]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[13]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[14]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[15]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[16]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[17]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[18]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[20]}}</td>
                          </tr>
                          <tr class="player">
                              <td align="center" v-for="(team, str, index) in Team" :key="index">{{team[22]}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nodata-mess" v-else>暂无数据</div>  
          </div>
        </div>
    </div>     
  </div>
</template>

<script>
export default {
  data () {
    return {
      'compid': this.$route.params.compid,
      'compshooters': {},
      'Players': {},
      'Teams': {},
      'teamName': [],
      'tabExtentShowa': true,
      'tabExtentShowb': false,
      'tabnum': 0,
      'tabnum3': 0
    };
  },
  created () {
    var shooterUrl = 'live/Api/Api/index/cc/b_competitionstats/id/' + this.compid;
    this.$http.jsonp(shooterUrl).then(response => {
      response = response.body;
      this.compshooters = response;
      this.Players = this.compshooters.player;
      this.Teams = this.compshooters.team;
    }, response => {
    });
  },
  computed: {
    TeamType () {
      var Typename = [];
      var typeName = '';
      if (this.Teams !== undefined && this.Teams.length !== 0) {
        for (var type in this.Teams) {
         if (type === 'Regular') {
             typeName = '常规赛';
         } else {
             typeName = '季后赛';
         };
         Typename.push(typeName);
        }
        return Typename;
      }
    },
    PlayerType () {
      var Typename = [];
      var typeName = '';
      if (this.Players !== undefined && this.Players.length !== 0) {
        for (var type in this.Players) {
         if (type === 'Regular') {
             typeName = '常规赛';
         } else {
             typeName = '季后赛';
         };
         Typename.push(typeName);
        }
        return Typename;
      }
    }
  },
  methods: {
    tabExent (lable) {
      if (lable === 'a') {
        this.tabExtentShowa = true;
        this.tabExtentShowb = false;
      } else if (lable === 'b') {
        this.tabExtentShowa = false;
        this.tabExtentShowb = true;
      }
    },
    tabExent2 (index) {
      this.tabnum = index;
    },
    tabExent3 (index) {
      this.tabnum3 = index;
    }
  }
};
</script>

<style lang="less" scoped>
a{
  text-decoration: none; 
  color:#000;
} 
a:hover,a:visited{
  text-decoration: none;border:0;
}
p,ul,li{
  margin:0;
  padding:0;
}
ul,li,ol{
  list-style:none;
}
.zhedie-con{
  width:100%;
  height:auto;
  overflow:hidden;
}
.well-sm{
    background:#f5f5f5;
    padding:8px 10px;
    font-size:12px;
    overflow:hidden;
  i.sm-line{
    width:2px;
    height:15px;
    background: #f32b1b;
    display: inline-block;
    vertical-align: middle;
  }
  .fl{
    padding-top: 5px;
  }
}
.nodata-mess{
  margin:100px 0;
  text-align:center;
}
.bg_blue{
  background:#428bca;
}
.bg_red{
    background:#f32b1b;
}
.bg_green{
    background:#05a548;
}
.little-word{
  font-size:12px;
  color:#b8bec7;
}
.fr{
  float:right;
}
.fl{
  float:left;
}
.fc{
  text-align:center;
}
.tab-box{
  background:#f5f5f5;
  width:96%;
  height:auto;
  overflow:hidden;
  padding:0 2%;
  li{
    text-align:center;
    padding:5px 0;
    margin:5px 0;
    float:left;
    width:100%/2;
    border-radius: 4px 4px 0 0;
    &.active{
      color:#fff;
      background:#428bca;
    }
  }
}
.title{
  font-size:14px;
  padding: 5px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
  padding:10px 0;
}
.rightRowBox{
  overflow-x:scroll;
}
.RightRowNav {
  padding-right: 30px;
  display: flex;
  justify-content: center;
  .centerTab{
    display: flex;
    justify-content: center;
    li{
      float:left;
      margin-bottom:-1px;
      padding:4px 25px;
      font-size:12px;
      margin-right:2px; 
      &.active{
      color:#1b4a90;
      font-weight:bold;
      }
    }
  }
}
.leftSlideBox {
  .left-row {
     background: #efeff4;
     padding-top:22px;
     .team-left{
      li{
        position: relative;
        display: block;
        line-height: 34px;
        height:34px;
        text-align:center;
        a{
          font-size:12px;
        }
      }
     }
    .player-left{
      padding-top:0;
      li{
        position: relative;
        display: block;
        text-align:center;
        height:36px;
        line-height:36px;
        a{
          font-size:12px;
        }
      }
    }
  }
}
.rightRowBox{
  .table{
    width: 100%;
    max-width: 100%;
    table-layout: fixed;
  }
  .w_blue{
    color:#428bca;
  }
  .team{
   td{
    padding: 0px 2px;
    height:32px;
    line-height:32px;
    width: 60px;
    font-size:12px;
    a{
    display:inline-block;
    }
   }
  }
  .player{
   td{
    padding: 0 2px;
    width: 85px;
    font-size:12px;
     height:34px;
    a{
    display:inline-block;
    }
   }
  }
  .playernametit{
   height:20px;
  }
}
.col-xs-3{
  width:25%;
  float:left;
}
.col-xs-9{
  width:75%;
  float:left;
}

</style>
