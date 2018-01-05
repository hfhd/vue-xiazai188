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
              <div class="hd" :selectum="selectNum">近{{selectNum}}场交战</div>              
              <el-row :gutter="3" class="table-header little-word">
                <el-col :span="5"><div class="grid-content fl">赛事</div></el-col>
                <el-col :span="4"><div class="grid-content fc">主队</div></el-col>
                <el-col :span="5"><div class="grid-content fc">比分</div></el-col>
                <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
                <el-col :span="2"><div class="grid-content fc">让球</div></el-col>
                <el-col :span="3"><div class="grid-content fc">大小球</div></el-col>
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
                      <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + History.Id[2] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                     
                  <el-col :span="4">
                    <div class="grid-content homename fl" v-if="Teams[History.Id[2]]!='' && Teams[History.Id[2]]!=null">
                    {{Teams[History.Id[2]]}}
                    </div>
                    <div class="grid-content homename fl" v-else>
                    --
                    </div>                  
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content fc score">
                      <span v-if="History.AScore[0]==='' && History.BScore[0]===''">-- : --</span> 
                      <span v-else>{{History.AScore[0]}} : {{History.BScore[0]}}</span>                  
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content awayname fr" v-if="Teams[History.Id[3]]!='' && Teams[History.Id[3]]!=null">
                    {{Teams[History.Id[3]]}}
                    </div>
                    <div class="grid-content awayname fr" v-else>--</div>                  
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + History.Id[3] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                     
                  <el-col :span="3">
                    <div class="grid-content fc" v-if="History.Handicap!=undefined && History.Handicap!=''">{{History.Handicap}}</div>
                    <div class="grid-content fc" v-else>--</div>         
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc" v-if="History.Overunder!='' && History.Overunder!=undefined" >{{History.Overunder}}</div>
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
              <div class="hd" :selectnumfix="selectNumFix">近{{selectNumFix}}场交战</div>     
              <el-row :gutter="3" class="table-header little-word">
                <el-col :span="5"><div class="grid-content fl">赛事</div></el-col>
                <el-col :span="7"><div class="grid-content fc">主队</div></el-col>
                <el-col :span="7"><div class="grid-content fc">客队</div></el-col>
                <el-col :span="5"><div class="grid-content fc">时间</div></el-col>
              </el-row>          
              <div class="table">
                <el-row :gutter="3" v-for="(Fixture, index) in Fixtures" :key='index' v-if="index<10" class="list">
                  <el-col :span="5">
                    <div class="grid-content little-word">
                      <p v-if="Competitions[Fixture.Id[1]].ShortName!=''">{{Competitions[Fixture.Id[1]].ShortName}}</p>
                      <p v-else>{{Competitions[Fixture.Id[1]].Name}}</p>
                      <p :fixturedate="FixtureDate[index]">{{FixtureDate[index] | filterdatatime}}</p>
                    </div>                    
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + Fixture.Id[2] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                 
                  <el-col :span="5">
                    <div class="grid-content homename fl" v-if="Teams[Fixture.Id[2]]!=''">
                    {{Teams[Fixture.Id[2]]}}
                    </div>
                    <div class="grid-content homename fl" v-else>
                    --
                    </div>                  
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc little-word" >vs</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content awayname fr" v-if="Teams[Fixture.Id[3]]!=''">
                    {{Teams[Fixture.Id[3]]}}
                    </div>
                    <div class="grid-content awayname fr" v-else>
                    --
                    </div>                                   
                  </el-col>
                  <el-col :span="2">
                    <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + Fixture.Id[3] + '.jpg'" class="img">                                    
                  </el-col>                  
                  <el-col :span="5">
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
                盘路数据
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="tabExent('a')" :class="{'active': tabItemShowa}">全场</li>
                <li lable="b" @click="tabExent('b')" :class="{'active': tabItemShowb}">半场</li>
              </ul>
            </div>                
          </div> 
          <div class="zhedie-con" v-if="OddsWay!=undefined && OddsWay.length!=0">
            <div class="tab-item" v-show="tabItemShowa">
              <div class="tj-Con">
                <div class="tj-item-box">
                  <div class="title">让球盘路</div>
                  <div v-if="Handicap!=undefined && HFull!=undefined && HFull.length!=0">
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center"></td>
                              <td colspan="3"  align="center">总</td>
                              <td colspan="3"  align="center">主</td>
                              <td colspan="3"  align="center">客</td>
                          </tr>
                          <tr>
                              <td align="center" width="35"></td>
                              <td align="center">赢</td>
                              <td align="center">平</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">平</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">平</td>
                              <td align="center">输</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr v-for="(Full, str, index) in HFull" :key="index" v-if="str.substr(0, 2)=='L_'">
                            <td align="center little-word">近{{str.substring(2)}}</td>
                            <td align="center" v-for="(data, str, index) in Full" :key="index">{{data}}</td>
                          </tr>                                                                           
                        </tbody>
                      </table>
                    </div>
                    <div class="BarBox" v-if="HFull.Last6!=undefined && HFull.Last6.length!=0">
                      <div class="hd">最近6场走势</div>
                      <div class="con">
                        <p class="trend-info">
                          <span v-for="(last6, str, index) in HFull.Last6" class="trendname" :hfzzt="HFullTrend">{{HFullTrend[str]}}<i v-if="last6==0" class="zzt_2"></i><i v-else-if="last6==1" class="zzt_0"></i><i v-if="last6==2" class="zzt_1"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="nodata-mess" v-else>暂无让球盘路全场数据</div>
                </div>
                <div class="tj-item-box">
                  <div class="title">大小球盘路</div>
                  <div v-if="Overunder!=undefined && OFull!=undefined && OFull.length!=0">
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center"></td>
                              <td colspan="3"  align="center">总</td>
                              <td colspan="3"  align="center">主</td>
                              <td colspan="3"  align="center">客</td>
                          </tr>
                          <tr>
                              <td align="center" width="35"></td>
                              <td align="center">大分</td>
                              <td align="center">平盘</td>
                              <td align="center">小分</td>
                              <td align="center">大分</td>
                              <td align="center">平盘</td>
                              <td align="center">小分</td>
                              <td align="center">大分</td>
                              <td align="center">平盘</td>
                              <td align="center">小分</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr v-for="(Full, str, index) in OFull" :key="index" v-if="str.substr(0, 2)=='L_'">
                            <td align="center little-word">近{{str.substring(2)}}</td>
                            <td align="center" v-for="(data, str, index) in Full" :key="index">{{data}}</td>
                          </tr>                                                                           
                        </tbody>
                      </table>
                    </div>
                    <div class="BarBox" v-if="OFull.Last6!=undefined && OFull.Last6.length!=0">
                      <div class="hd">最近6场走势</div>
                      <div class="con">
                        <p class="trend-info">
                          <span v-for="(last6, str, index) in OFull.Last6" class="trendname" :hfzzt="OFullTrend">{{OFullTrend[str]}}<i v-if="last6==0" class="zzt_2"></i><i v-else-if="last6==1" class="zzt_0"></i><i v-if="last6==2" class="zzt_1"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="nodata-mess" v-else>暂无大小球盘路全场数据</div>
                </div>
              </div>
            </div>
            <div class="tab-item" v-show="tabItemShowb">
              <div class="tj-Con">
                <div class="tj-item-box">
                  <div class="title">让球盘路</div>
                  <div v-if="Handicap!=undefined && HHalf!=undefined && HHalf.length!=0">
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center"></td>
                              <td colspan="3"  align="center">总</td>
                              <td colspan="3"  align="center">主</td>
                              <td colspan="3"  align="center">客</td>
                          </tr>
                          <tr>
                              <td align="center" width="35"></td>
                              <td align="center">赢</td>
                              <td align="center">平</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">平</td>
                              <td align="center">输</td>
                              <td align="center">赢</td>
                              <td align="center">平</td>
                              <td align="center">输</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr v-for="(Full, str, index) in HHalf" :key="index" v-if="str.substr(0, 2)=='L_'">
                            <td align="center little-word">近{{str.substring(2)}}</td>
                            <td align="center" v-for="(data, str, index) in Full" :key="index">{{data}}</td>
                          </tr>                                                                           
                        </tbody>
                      </table>
                    </div>
                    <div class="BarBox" v-if="HHalf.Last6!=undefined && HHalf.Last6.length!=0">
                      <div class="hd">最近6场走势</div>
                      <div class="con">
                        <p class="trend-info">
                          <span v-for="(last6, str, index) in HHalf.Last6" class="trendname" :hfzzt="HHalfTrend">{{HHalfTrend[str]}}<i v-if="last6==0" class="zzt_2"></i><i v-else-if="last6==1" class="zzt_0"></i><i v-if="last6==2" class="zzt_1"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="nodata-mess" v-else>暂无让球盘路半场数据</div>
                </div>
                <div class="tj-item-box">
                  <div class="title">大小球盘路</div>
                  <div v-if="Overunder!=undefined && OHalf!=undefined && OHalf.length!=0">
                    <div class="table">
                      <table width="100%">
                        <thead class="little-word table-header fc">
                          <tr class="little-word">
                              <td align="center"></td>
                              <td colspan="3"  align="center">总</td>
                              <td colspan="3"  align="center">主</td>
                              <td colspan="3"  align="center">客</td>
                          </tr>
                          <tr>
                              <td align="center" width="35"></td>
                              <td align="center">大分</td>
                              <td align="center">平盘</td>
                              <td align="center">小分</td>
                              <td align="center">大分</td>
                              <td align="center">平盘</td>
                              <td align="center">小分</td>
                              <td align="center">大分</td>
                              <td align="center">平盘</td>
                              <td align="center">小分</td>
                          </tr>
                        </thead>
                        <tbody class="table-body">
                          <tr v-for="(Full, str, index) in OHalf" :key="index" v-if="str.substr(0, 2)=='L_'">
                            <td align="center little-word">近{{str.substring(2)}}</td>
                            <td align="center" v-for="(data, str, index) in Full" :key="index">{{data}}</td>
                          </tr>                                                                           
                        </tbody>
                      </table>
                    </div>
                    <div class="BarBox" v-if="OHalf.Last6!=undefined && OHalf.Last6.length!=0">
                      <div class="hd">最近6场走势</div>
                      <div class="con">
                        <p class="trend-info">
                          <span v-for="(last6, str, index) in OHalf.Last6" class="trendname" :hfzzt="OHalfTrend">{{OHalfTrend[str]}}<i v-if="last6==0" class="zzt_2"></i><i v-else-if="last6==1" class="zzt_0"></i><i v-if="last6==2" class="zzt_1"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="nodata-mess" v-else>暂无大小球盘路半场数据</div>
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
      'Fixtures': {},
      'OddsWay': {},
      'Handicap': {},
      'Overunder': {},
      'HFull': {},
      'HHalf': {},
      'OFull': {},
      'OHalf': {},
      'tabItemShowa': true,
      'tabItemShowb': false
    };
  },
  created () {
    var teamstatsUrl = 'live/Api/Api/index/cc/b_teamstats/id/' + this.teamid;
    this.$http.jsonp(teamstatsUrl).then(response => {
      response = response.body;
      this.teamstats = response;
      this.Historys = this.teamstats.Historys;
      this.Competitions = this.teamstats.Competition;
      this.Teams = this.teamstats.Team;
      this.Fixtures = this.teamstats.Fixtures;
      this.OddsWay = this.teamstats.OddsWay;
      if (this.OddsWay !== undefined && this.OddsWay.length !== 0) {
        this.Handicap = this.OddsWay.Handicap;
        if (this.Handicap !== undefined && this.Handicap.length !== 0) {
          this.HFull = this.Handicap.Full;
          this.HHalf = this.Handicap.Half;
        }
        this.Overunder = this.OddsWay.Overunder;
        if (this.Overunder !== undefined && this.Overunder.length !== 0) {
          this.OFull = this.Overunder.Full;
          this.OHalf = this.Overunder.Half;
        }
      }
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
    selectNum () {
      var num = 0;
      if (this.Historys.length > 10) {
        num = 10;
      } else {
         num = this.Historys.length;
      }
      return num;
    },
    selectNumFix () {
      var num = 0;
      if (this.Fixtures.length > 10) {
        num = 10;
      } else {
         num = this.Fixtures.length;
      }
      return num;
    },
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
    },
    HFullTrend () {
      var Trend = [];
      var text = '';
      var str = this.HFull.Last6;
      if (str !== undefined && this.length !== 0) {
        for (var i in str) {
          switch (str[i]) {
            case 0:
            text = '平';
            break;
            case 1:
            text = '赢';
            break;
            case 2:
            text = '输';
            break;
            default:
            break;
          }
          Trend.push(text);
        }
        return Trend;
      }
    },
    OFullTrend () {
      var Trend = [];
      var text = '';
      var str = this.OFull.Last6;
      if (str !== undefined && this.length !== 0) {
        for (var i in str) {
          switch (str[i]) {
            case 0:
            text = '平';
            break;
            case 1:
            text = '赢';
            break;
            case 2:
            text = '输';
            break;
            default:
            break;
          }
          Trend.push(text);
        }
        return Trend;
      }
    },
    HHalfTrend () {
      var Trend = [];
      var text = '';
      var str = this.HHalf.Last6;
      if (str !== undefined && this.length !== 0) {
        for (var i in str) {
          switch (str[i]) {
            case 0:
            text = '平';
            break;
            case 1:
            text = '赢';
            break;
            case 2:
            text = '输';
            break;
            default:
            break;
          }
          Trend.push(text);
        }
        return Trend;
      }
    },
    OHalfTrend () {
      var Trend = [];
      var text = '';
      var str = this.OHalf.Last6;
      if (str !== undefined && this.length !== 0) {
        for (var i in str) {
          switch (str[i]) {
            case 0:
            text = '平';
            break;
            case 1:
            text = '赢';
            break;
            case 2:
            text = '输';
            break;
            default:
            break;
          }
          Trend.push(text);
        }
        return Trend;
      }
    }
  },
  methods: {
    tabExent (lable) {
      if (lable === 'a') {
        this.tabItemShowa = true;
        this.tabItemShowb = false;
      } else if (lable === 'b') {
        this.tabItemShowa = false;
        this.tabItemShowb = true;
      };
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
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
  }
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
      font-size:13px;
    }
    .img{
    width:25px;
    height:25px;
    display:inline-block;
    align-items:center;
    }
    .awayname,.homename {
      font-size:13px;
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
.fr-tab{
  overflow:hidden;
  li{
    float:left;
    padding:5px 8px;
    margin: 0 3px;
    border:1px solid #ccc;
    background:#fff;
    border-radius:5px;
    &.active{
    background:#357ebd;
    border:1px solid #357ebd;
    color:#fff;
    }
  }
}
.BarBox{
  .hd{
    text-align:center;
    color: #b8bec7;
    font-size: 12px;
  }
  .con{
    height: auto;
    zoom: 1;
    overflow: hidden;
    margin-bottom: 30px;
    justify-content: center;
    display: flex;
    margin-top:10px;
  }
  .trend-info{
    line-height: 25px;
    float: left;
    display: inline-block;
    margin: 0 5px;     
    span{
      float: left;
      width: 18px;
      height: 90px;
      margin-right: 15px;
      text-align: center; 
      display:block;
      i{
        display:block;
        width:18px;
        height:90px;
         background: url(../../../common/img/yzs-pic.png) no-repeat; 
      }  
    }
    .zzt_0{
       background-position: 0px -35px;      
    }
    .zzt_1{
       background-position: -20px -35px;
    } 
    .zzt_2{
       background-position: -120px -35px;
    } 
    .trendname{
      color:#428bca;
      font-size:13px;
    }
  }
}

</style>
