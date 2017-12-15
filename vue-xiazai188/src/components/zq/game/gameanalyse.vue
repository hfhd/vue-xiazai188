<template>
  <div class="gameanalyse">
    <div class="zhegie-wrap">
      <div calss="zhedie-box" v-if="meetings!=undefined && meetings!=''">
        <div class="well well-sm">
          <i class="sm-line"></i>
              历史交战
        </div> 
        <div class="zhedie-con">
            <div class="hd" :selectum="selectNum">近{{selectNum}}场交战</div>
            <el-row :gutter="2" class="table-header little-word">
              <el-col :span="5"><div class="grid-content">赛事</div></el-col>
              <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
              <el-col :span="4"><div class="grid-content fc">比分(半场)</div></el-col>
              <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
              <el-col :span="4" >
                <div class="grid-content fr">
                  <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link">
                      赛果<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">赛果</el-dropdown-item>
                      <el-dropdown-item command="b">让球</el-dropdown-item>
                      <el-dropdown-item command="c">红牌比分</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>          
            <div class="table">
              <el-row :gutter="5" v-for="(meeting, index) in meetings" :key='index' v-if="index<10" class="list">
                <el-col :span="5">
                  <div class="grid-content little-word">
                  <p v-if="competitions[meeting.Id[1]].ShortName!=''">{{competitions[meeting.Id[1]].ShortName}}</p>
                  <p v-else>{{competitions[meeting.Id[1]].Name}}</p>
                  <p :meetingdate="meetingDate[index]">{{meetingDate[index] | filterdata}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content homename fc" v-if="teams[meeting.Id[2]].ShortName!=''">
                  {{teams[meeting.Id[2]].ShortName}}
                  </div>
                  <div class="grid-content homename fc" v-else>
                  {{teams[meeting.Id[2]].Name}}
                  </div>                  
                </el-col>
                <el-col :span="4">
                  <div class="grid-content score">
                    <span v-if="meeting.Score[0]===''">--:--</span> 
                    <span v-else>{{meeting.Score[0]}}:{{meeting.Score[1]}}</span>                   
                    <span class="little-word" v-if="meeting.Half=='' || meeting.Half==undefined">--:--</span> 
                    <span class="little-word" v-else>({{meeting.Half}})</span>                   
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content awayname fc" v-if="teams[meeting.Id[3]].ShortName!=''">
                  {{teams[meeting.Id[3]].ShortName}}
                  </div>
                  <div class="grid-content awayname fc" v-else>
                  {{teams[meeting.Id[3]].Name}}
                  </div>                  
                </el-col>
                <el-col :span="3">
                  <div class="grid-content sg" :matchresult="matchResult" :class="matchBgcolor[index]" v-show="matchResultShow">{{matchResult[index]}}</div>
                  <div class="grid-content bglittle" v-show="HandicapShow">{{meeting.Handicap}}</div>
                  <div class="grid-content bglittle" v-if="meeting.RedCard[0]===''" v-show="matchresultShow">--</div>
                  <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{meeting.RedCard[0]}}:{{meeting.RedCard[1]}}</div>          
                </el-col>
              </el-row>
            </div>
        </div>    
      </div>
      <div class="nodata-mess" v-else>暂无数据</div>
    </div>
    <div  class="zhegie-wrap">
      <div calss="zhedie-box" v-if="teamHistorys!=undefined">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                近期战绩
            </div>
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="tabExent('a')" >主</li>
                <li lable="b" @click="tabExent('b')">客</li>
              </ul>
            </div>
          </div>
          <div class="zhedie-con">
            <div class="tab-item" v-show="tabItemShowa">
              <div v-if="homeHistorys!=undefined && homeHistorys.length!=0">
                <div class="hd" :homehistoryNum="homeHistoryNum">近{{homeHistoryNum}}场交战</div>
                <el-row :gutter="2" class="table-header little-word">
                  <el-col :span="5"><div class="grid-content">赛事</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">主队</div></el-col>
                  <el-col :span="4"><div class="grid-content fc">比分(半场)</div></el-col>
                  <el-col :span="5"><div class="grid-content fc">客队</div></el-col>
                  <el-col :span="4" >
                    <div class="grid-content fr">
                      <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                          赛果<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">赛果</el-dropdown-item>
                          <el-dropdown-item command="b">让球</el-dropdown-item>
                          <el-dropdown-item command="c">红牌比分</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
                <div class="table">
                  <el-row :gutter="5" v-for="(homeHistory, index) in homeHistorys" :key='index' v-if="index<10" class="list">
                    <el-col :span="5">
                      <div class="grid-content little-word">
                      <p v-if="competitions[homeHistory.Id[1]].ShortName!=''">{{competitions[homeHistory.Id[1]].ShortName}}</p>
                      <p v-else>{{competitions[homeHistory.Id[1]].Name}}</p>
                      <p :teamHistorydate="teamHistoryDate[index]">{{teamHistoryDate[index] | filterdata}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content homename fc" v-if="teams[homeHistory.Id[2]].ShortName!=''">
                      {{teams[homeHistory.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fc" v-else>
                      {{teams[homeHistory.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content score">
                        <span v-if="homeHistory.Score[0]===''">--:--</span> 
                        <span v-else>{{homeHistory.Score[0]}}:{{homeHistory.Score[1]}}</span>                   
                        <span class="little-word" v-if="homeHistory.Half=='' || homeHistory.Half==undefined">--:--</span> 
                        <span class="little-word" v-else>({{homeHistory.Half}})</span>                   
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content awayname fc" v-if="teams[homeHistory.Id[3]].ShortName!=''">
                      {{teams[homeHistory.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fc" v-else>
                      {{teams[homeHistory.Id[3]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content sg" :teamhistoryresult="teamhistoryResult" :class="teamhistoryBgcolor[index]" v-show="matchResultShow">{{teamhistoryResult[index]}}</div>
                      <div class="grid-content bglittle" v-show="HandicapShow">{{homeHistory.Handicap}}</div>
                      <div class="grid-content bglittle" v-if="homeHistory.RedCard[0]===''" v-show="matchresultShow">--</div>
                      <div class="grid-content bglittle" v-else  v-show="RedCardShow">{{homeHistory.RedCard[0]}}:{{homeHistory.RedCard[1]}}</div>          
                    </el-col>
                  </el-row> 
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <div class="tab-item" v-show="tabItemShowb">
              客
            </div>
          </div>     
      </div>
      <div class="nodata-mess" v-else>暂无数据</div>
    </div>     
  </div>
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid, // 获得路由传过来的id值
      'gameanalyse': {},
      'meetings': {},
      'competitions': {},
      'teamHistorys': {},
      'homeHistorys': {},
      'teams': {},
      'matchResultShow': true,
      'HandicapShow': false,
      'RedCardShow': false,
      'tabItemShowa': true,
      'tabItemShowb': false
    };
  },
  created () {
    var gameanalyseUrl = 'http://api.tiyu.caishencai.com/Api/Api/index/cc/gameanalyse/id/' + this.matchid;
    this.$http.jsonp(gameanalyseUrl).then(response => {
      response = response.body;
      this.gameanalyse = response;
      this.meetings = this.gameanalyse.Meeting;
      this.competitions = this.gameanalyse.Competition;
      this.teams = this.gameanalyse.Team;
      this.teamHistorys = this.gameanalyse.TeamHistory;
      this.homeHistorys = this.teamHistorys.Home;
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
      }
  },
  computed: {
    selectNum () {
      var num = 0;
      if (this.meetings.length > 10) {
        num = 10;
      } else {
         num = this.meetings.length;
      }
      return num;
    },
    homeHistoryNum () {
      var num = 0;
      if (this.homeHistorys.length > 10) {
        num = 10;
      } else {
         num = this.homeHistorys.length;
      }
      return num;
    },
    meetingDate () {
      var meetingdate = [];
      var Date1 = '';
      for (var i = 0; i < this.meetings.length; i++) {
        if (typeof (this.meetings[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.meetings[i].Date);
        } else {
          Date1 = parseInt(this.meetings[i].Date.value);
        };
      var strDate = new Date(Date1);
      meetingdate.push(strDate);
      };
      return meetingdate;
    },
    teamHistoryDate () {
      var teamHistorydate = [];
      var Date1 = '';
      for (var i = 0; i < this.homeHistorys.length; i++) {
        if (typeof (this.homeHistorys[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.homeHistorys[i].Date);
        } else {
          Date1 = parseInt(this.homeHistorys[i].Date.value);
        };
      var strDate = new Date(Date1);
      teamHistorydate.push(strDate);
      };
      return teamHistorydate;
    },    
    matchResult () {
      var matchresult = [];
      var matchresult1 = '';
      for (var i = 0; i < this.meetings.length; i++) {
        var homescore = this.meetings[i].Score[0];
        var awayscore = this.meetings[i].Score[1];
        if (homescore > awayscore) {
           matchresult1 = '胜';
        } else if (homescore === awayscore) {
           matchresult1 = '平';
        } else if (homescore < awayscore) {
           matchresult1 = '负';
        }
        matchresult.push(matchresult1);
      };
      return matchresult;
    },   
    teamhistoryResult () {
      var matchresult = [];
      var matchresult1 = '';
      for (var i = 0; i < this.homeHistorys.length; i++) {
        var homescore = this.homeHistorys[i].Score[0];
        var awayscore = this.homeHistorys[i].Score[1];
        if (homescore > awayscore) {
           matchresult1 = '胜';
        } else if (homescore === awayscore) {
           matchresult1 = '平';
        } else if (homescore < awayscore) {
           matchresult1 = '负';
        }
        matchresult.push(matchresult1);
      };
      return matchresult;
    },
    matchBgcolor () {
      var bgcolor = [];
      var bgcolor1 = '';
      for (var i = 0; i < this.meetings.length; i++) {
        var homescore = this.meetings[i].Score[0];
        var awayscore = this.meetings[i].Score[1];
        if (homescore > awayscore) {
           bgcolor1 = 'bg_red';
        } else if (homescore === awayscore) {
           bgcolor1 = 'bg_green';
        } else if (homescore < awayscore) {
           bgcolor1 = 'bg_blue';
        }
        bgcolor.push(bgcolor1);
      };
      return bgcolor;
    },
    teamhistoryBgcolor () {
      var bgcolor = [];
      var bgcolor1 = '';
      for (var i = 0; i < this.homeHistorys.length; i++) {
        var homescore = this.homeHistorys[i].Score[0];
        var awayscore = this.homeHistorys[i].Score[1];
        if (homescore > awayscore) {
           bgcolor1 = 'bg_red';
        } else if (homescore === awayscore) {
           bgcolor1 = 'bg_green';
        } else if (homescore < awayscore) {
           bgcolor1 = 'bg_blue';
        }
        bgcolor.push(bgcolor1);
      };
      return bgcolor;
    }
  },  
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        this.matchResultShow = true;
        this.HandicapShow = false;
        this.RedCardShow = false;
      } else if (command === 'b') {
        this.matchResultShow = false;
        this.HandicapShow = true;
        this.RedCardShow = false;
      } else if (command === 'c') {
        this.matchResultShow = false;
        this.HandicapShow = false;
        this.RedCardShow = true;
      }
    },
    tabExent (lable) {
      if (lable === 'a') {
        this.tabItemShowa = true;
        this.tabItemShowb = false;
      } else if (lable === 'b') {
        this.tabItemShowa = false;
        this.tabItemShowb = true;
      }
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
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
  }
}
.table-header{
  padding:10px;
}
.table{
  padding:10px;
  font-size:13px;
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
.el-dropdown{
  font-size:12px;
  color:#b8bec7;  
}
.el-dropdown-menu__item{
    font-size:12px;
    padding:0 5px;
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
</style>
