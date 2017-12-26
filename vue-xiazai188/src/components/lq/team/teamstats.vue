<template>
  <div class="teamstats">
    <div v-if="teamstats.id!=undefined">
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
                近年赛绩
          </div> 
          <div class="zhedie-con" v-if="Historys!=undefined && Historys.length!=0">
              <el-row :gutter="3" class="table-header little-word">
                <el-col :span="5"><div class="grid-content fl">赛事</div></el-col>
                <el-col :span="5"><div class="grid-content fc">主队</div></el-col>
                <el-col :span="3"><div class="grid-content fc">比分</div></el-col>
                <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
                <el-col :span="4"><div class="grid-content fc">红牌比分</div></el-col>
                <el-col :span="2"><div class="grid-content fc">让球</div></el-col>
              </el-row>          
              <div class="table">
                <el-row :gutter="3" v-for="(History, index) in Historys" :key='index' v-if="index<10" class="list">
                  <el-col :span="5">
                    <div class="grid-content little-word">
                    <p v-if="Competitions[History.Id[1]].ShortName!=''">{{Competitions[History.Id[1]].ShortName}}</p>
                    <p v-else>{{Competitions[History.Id[1]].Name}}</p>
                    <p :historydate="HistoryDate[index]">{{HistoryDate[index] | filterdata}}</p>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + History.Id[2] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                     
                  <el-col :span="5">
                    <div class="grid-content homename fl" v-if="Teams[History.Id[2]].ShortName!=''">
                    {{Teams[History.Id[2]].ShortName}}
                    </div>
                    <div class="grid-content homename fl" v-else>
                    {{Teams[History.Id[2]].Name}}
                    </div>                  
                  </el-col>
                  <el-col :span="3">
                    <div class="grid-content fc score">
                      <span v-if="History.Score[0]==='' && History.Score[1]===''">-- : --</span> 
                      <span v-else>{{History.Score[0]}} : {{History.Score[1]}}</span>                  
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content awayname fr" v-if="Teams[History.Id[3]].ShortName!=''">
                    {{Teams[History.Id[3]].ShortName}}
                    </div>
                    <div class="grid-content awayname fr" v-else>
                    {{Teams[History.Id[3]].Name}}
                    </div>                  
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + History.Id[3] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                     
                  <el-col :span="4">
                    <div class="grid-content fc" v-if="History.RedCard[0]==='' && History.RedCard[1]===''" >--</div>
                    <div class="grid-content fc" v-else>{{History.RedCard[0]}}:{{History.RedCard[1]}}</div>          
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc" v-if="History.Handicap!=undefined && History.Handicap!=''">{{History.Handicap}}</div>
                    <div class="grid-content fc" v-else>--</div>         
                  </el-col>
                </el-row>
              </div>
          </div>
          <div class="nodata-mess" v-else>暂无数据</div>    
        </div>
      </div>
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
                未来赛程
          </div> 
          <div class="zhedie-con" v-if="Fixtures!=undefined && Fixtures.length!=0">
              <el-row :gutter="3" class="table-header little-word">
                <el-col :span="4"><div class="grid-content fl">赛事</div></el-col>
                <el-col :span="7"><div class="grid-content fc">主队</div></el-col>
                <el-col :span="7"><div class="grid-content fc">客队</div></el-col>
                <el-col :span="6"><div class="grid-content fc">时间</div></el-col>
              </el-row>          
              <div class="table">
                <el-row :gutter="3" v-for="(Fixture, index) in Fixtures" :key='index' v-if="index<10" class="list">
                  <el-col :span="4">
                    <div class="grid-content little-word">
                      <div v-if="Competitions[Fixture.Id[1]].ShortName!=''">{{Competitions[Fixture.Id[1]].ShortName}}</div>
                      <div v-else>{{Competitions[Fixture.Id[1]].Name}}</div>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + Fixture.Id[2] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                 
                  <el-col :span="5">
                    <div class="grid-content homename fl" v-if="Teams[Fixture.Id[2]].ShortName!=''">
                    {{Teams[Fixture.Id[2]].ShortName}}
                    </div>
                    <div class="grid-content homename fl" v-else>
                    {{Teams[Fixture.Id[2]].Name}}
                    </div>                  
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc little-word" >vs</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content awayname fr" v-if="Teams[Fixture.Id[3]].ShortName!=''">
                    {{Teams[Fixture.Id[3]].ShortName}}
                    </div>
                    <div class="grid-content awayname fr" v-else>
                    {{Teams[Fixture.Id[3]].Name}}
                    </div>                                   
                  </el-col>
                  <el-col :span="2">
                    <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + Fixture.Id[3] + '.jpg'" class="img">                                    
                  </el-col>                  
                  <el-col :span="6">
                     <div class="grid-content fc little-word" :fixturedate="FixtureDate[index]">{{FixtureDate[index] | filterdatatime}}</div>         
                  </el-col>
                </el-row>
              </div>
          </div>
          <div class="nodata-mess" v-else>暂无数据</div>    
        </div>
      </div>
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
                球队统计
          </div> 
          <div class="zhedie-con" v-if="Stats!=undefined && Stats.length!=0">
            <div class="tj-Con">
              <div class="tj-item-box">
                <div class="title">总入球数(场数)，单双统计</div>
                <div class="table">
                  <el-row :gutter="5" class="little-word table-header fc">
                    <el-col :span="4"><div class="grid-content">0-1球</div></el-col>
                    <el-col :span="4"><div class="grid-content">2-3球</div></el-col>
                    <el-col :span="4"><div class="grid-content">4-6球</div></el-col>
                    <el-col :span="4"><div class="grid-content">7球或以上</div></el-col>
                    <el-col :span="4"><div class="grid-content">单数</div></el-col>
                    <el-col :span="4"><div class="grid-content">双数</div></el-col>
                  </el-row>
                  <div class="table-body">
                    <el-row :gutter="5" class="fc ds-padding">
                      <el-col :span="4" v-for="(TotalGoal, index) in Stats.TotalGoal" :key="index"><div class="grid-content">{{TotalGoal}}</div></el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="tj-item-box">
                <div class="title">进球统计</div>
                <div class="table">
                  <table width="100%">
                    <thead class="little-word table-header fc">
                      <tr class="little-word">
                          <td align="center" width="35"></td>
                          <td align="center">净胜2+</td>
                          <td align="center">净胜1</td>
                          <td align="center">平局</td>
                          <td align="center">净负1</td>
                          <td align="center">净负2+</td>
                          <td align="center">进球数0</td>
                          <td align="center">进球数1</td>
                          <td align="center">进球数2</td>
                          <td align="center">进球数3+</td>
                      </tr>
                    </thead>
                    <tbody class="table-body">
                      <tr>
                        <td align="center little-word">总</td>
                        <td align="center" v-for="(goalTotal, index) in StatsGoal.Total" :key="index">{{goalTotal}}</td>
                      </tr>
                      <tr>
                        <td align="center little-word">主</td>
                        <td align="center" v-for="(goalHome, index) in StatsGoal.Home" :key="index">{{goalHome}}</td>
                      </tr>
                      <tr>
                        <td align="center little-word">客</td>
                        <td align="center" v-for="(goalAway, index) in StatsGoal.Away" :key="index">{{goalAway}}</td>
                      </tr>
                      <tr>
                        <td align="center little-word">中立</td>
                        <td align="center" v-for="(goalNeutral, index) in StatsGoal.Neutral" :key="index">{{goalNeutral}}</td>
                      </tr>                                                                            
                    </tbody>
                  </table>
                </div>
              </div> 
              <div class="tj-item-box">
                <div class="title">以往盘路</div>
                <div class="table">
                  <table width="100%">
                    <thead class="little-word table-header fc">
                      <tr class="little-word">
                          <td align="center"></td>
                          <td colspan="3"  align="center">上盘</td>
                          <td colspan="3"  align="center">下盘</td>
                          <td colspan="3"  align="center">平盘</td>
                      </tr>
                      <tr>
                          <td align="center" width="35"></td>
                          <td align="center">赢</td>
                          <td align="center">走</td>
                          <td align="center">输</td>
                          <td align="center">赢</td>
                          <td align="center">走</td>
                          <td align="center">输</td>
                          <td align="center">赢</td>
                          <td align="center">走</td>
                          <td align="center">输</td>
                      </tr>
                    </thead>
                    <tbody class="table-body">
                      <tr>
                        <td align="center little-word">总</td>
                        <td align="center" v-for="(OddsTotal, index) in StatsOdds.Total" :key="index">{{OddsTotal}}</td>
                      </tr>
                      <tr>
                        <td align="center little-word">主</td>
                        <td align="center" v-for="(OddsHome, index) in StatsOdds.Home" :key="index">{{OddsHome}}</td>
                      </tr>
                      <tr>
                        <td align="center little-word">客</td>
                        <td align="center" v-for="(OddsAway, index) in StatsOdds.Away" :key="index">{{OddsAway}}</td>
                      </tr>
                      <tr>
                        <td align="center little-word">中立</td>
                        <td align="center" v-for="(OddsNeutral, index) in StatsOdds.Neutral" :key="index">{{OddsNeutral}}</td>
                      </tr>                                                                            
                    </tbody>
                  </table>
                </div>
              </div>                                                                        
            </div>           
          </div>
          <div class="nodata-mess" v-else>暂无数据</div>    
        </div>
      </div>      
    </div>
    <div class="nodata-mess" v-else>暂无数据</div>      
  </div>
</template>

<script>
export default {
  data () {
    return {
      'teamid': this.$route.params.teamid,
      'teamstats': {},
      'Historys': {},
      'Competitions': {},
      'Teams': {},
      'Stats': {},
      'Fixtures': {},
      'StatsGoal': {},
      'StatsOdds': {}
    };
  },
  created () {
    var teamstatsUrl = 'live/Api/Api/index/cc/teamstats/id/' + this.teamid;
    this.$http.jsonp(teamstatsUrl).then(response => {
      response = response.body;
      this.teamstats = response;
      this.Historys = this.teamstats.Historys;
      this.Competitions = this.teamstats.Competition;
      this.Teams = this.teamstats.Team;
      this.Stats = this.teamstats.Stats;
      this.Fixtures = this.teamstats.Fixtures;
      this.StatsOdds = this.Stats.Odds;
      this.StatsGoal = this.Stats.Goal;
    }, response => {});
  },
  filters: {
    filterdata: function (input) { // 时间过滤器 template中{{ 需要过滤的值 | 过滤器表达式}}
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      // var hour = d.getHours();
      // var minutes = d.getMinutes();
      // var seconds = d.getSeconds();
      return year + '-' + month + '-' + day;
    },
    filterdatatime: function (input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
      var minutes = d.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    }
  },
  computed: {
    HistoryDate () {
      var historydate = [];
      var Date1 = '';
      for (var i = 0; i < this.Historys.length; i++) {
        if (typeof (this.Historys[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.Historys[i].Date);
        } else {
          Date1 = parseInt(this.Historys[i].Date.value);
        };
        historydate.push(Date1);
      }
      return historydate;
    },
    FixtureDate () {
      var fixturedate = [];
      var Date1 = '';
      for (var i = 0; i < this.Fixtures.length; i++) {
        if (typeof (this.Fixtures[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.Fixtures[i].Date);
        } else {
          Date1 = parseInt(this.Fixtures[i].Date.value);
        };
        fixturedate.push(Date1);
      }
      return fixturedate;
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
.table-header{
  padding:10px;
}
.table{
  padding:10px;
  font-size:14px;
  .list{
  padding:5px 0;
  &:first-child{
     padding-top:0;
    }
  }
  .sg{
    color:#fff;
    text-align:center;
  }
  .bglittle{
    text-align:center; 
    background:#f5f5f5;
    padding:6px; 
  }
}
.title{
  font-size:14px;
  padding: 5px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
}
.table{
  padding:15px 10px; 
  .list{
    padding:15px 0;
    border-bottom:1px solid #f4f4f4;
    display:flex;
    justify-content:center;
    align-items:center; 
    &:last-child {
      border-bottom:0;
    }
    .time{
      font-size:12px;
    }
    .score{
      background:#f4f4f4;
      padding:5px 0;
      border-radius:2px;
    }
    .img{
    width:25px;
    height:25px;
    display:inline-block;
    align-items:center;
    }
  }
}
.tj-Con{
  padding:5px 0;
}
.tj-item-box{
  .table{
    font-size:13px;
    padding:10px;
  }
  .table-header {
    border-bottom:1px solid #f4f4f4;
    td{
     border-bottom:1px solid #f4f4f4; 
     padding:5px 0;
    }
  }
  .table-body{
    padding:10px 0;
    td{
      padding:5px 0;
    }
  } 
}
</style>
