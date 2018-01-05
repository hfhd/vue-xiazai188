<template>
  <div class="schedule_sfc">
    <div v-if="schedules!=undefined && schedules.length!=0">
      <div>
        <el-row class="dataTab-wrap bg-gray">
          <el-col :span="6"><div class="grid-content pre-data" @click="preDate(selectqh)" >前一期</div></el-col>
           <el-col :span="12" class="qhBox">
             <div class="grid-content curdata" @click.stop.prevent="collapseDetailShow" v-text="selectqh"></div><i class="el-icon-caret-bottom el-icon-qh"></i>
           </el-col>
          <el-col :span="6"><div class="grid-content next-data" @click="nextDate(selectqh)">后一期</div></el-col>
        </el-row>
        <div class="collapse" v-show="collapseShow">
            <div class="item">
              <div  v-for="(Round, str, index) in RoundGame" :key="index">
                <p class="little-word clear fl" >{{Round.Name}}</p>
                <a class="grid-content" v-for="(month, str, index) in Round.month" :key="index"" @click="tabExent(Round.Name,month)" :class="{'active': Round.Name+month == tabnum}">{{month}}</a>
              </div>
            </div>
        </div>
      </div>
      <div class="zhegie-wrap">
        <div v-for="(Round, str, index) in RoundGame" :key="index">
          <div class="tab-item" v-for="(matchGame, str, index) in Round.matchGame" :key="index"  v-show="Round.Name+str+'月'==tabnum">
            <div class="zhedie-con">
              <div class="table hasA">
                <a v-for="(item, str, index) in matchGame" :key="index" :href="'#/lq/game/b_gamegoaldata/' + item.Id[0]"  class="list">
                  <el-row :gutter="5">
                    <el-col :span="5">
                      <div class="grid-content little-word">
                      <p :lastdate="lastDate[str]">{{lastDate[str] | filterdatatime}}</p>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + item.Id[2] + '.jpg'" class="img">
                      </div>                 
                    </el-col>                     
                    <el-col :span="5">
                      <div class="grid-content awayname fr" v-if="Teams[item.Id[2]].Name!=''">
                      {{Teams[item.Id[2]].Name}}
                      </div>
                      <div class="grid-content awayname fr" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fc score">
                        <span v-if="item.HomeScore">{{item.HomeScore[0]}} : {{item.AwayScore[0]}}</span> 
                        <span v-else>{{statusArray[item.Status]}}</span>                  
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content awayname fr" v-if="Teams[item.Id[3]].Name!=''">
                      {{Teams[item.Id[3]].Name}}
                      </div>
                      <div class="grid-content awayname fr" v-else>
                      --
                      </div>                  
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + item.Id[3] + '.jpg'" class="img">
                      </div>                 
                    </el-col>               
                  </el-row>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--杯赛结束-->
    </div>
    <div v-else class="nodata-mess">暂无数据</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'compid': this.$route.params.compid,
      'schedules': {},
      'RoundGame': {},
      'Teams': {},
      'monthStart': {},
      'RoundMonth': [],
      'Round': {},
      'Month': {},
      'selectqh': '',
      'collapseShow': false,
      'tabnum': '',
      'statusArray': {
        0: '未开始',
        1: '第一节',
        2: '第一节完',
        3: '第二节',
        4: '第二节完',
        5: '第三节',
        6: '第三节完',
        7: '第四节',
        8: '第四节完',
        9: '完场',
        10: '加时',
        11: '完场(加)',
        12: '中断',
        13: '取消',
        14: '延期',
        15: '腰斩',
        16: '待定'
      }
    };
  },
  created () {
      var defaultqh = 'live/Api/Api/index/cc/b_competitionschedule/id/' + this.compid;
      this.$http.jsonp(defaultqh).then(response => {
        response = response.body;
        this.schedules = response;
        this.RoundGame = this.schedules.RoundGame;
        this.Teams = this.schedules.Team;
        this.monthStart = this.schedules.monthStart;
        for (var rg in this.RoundGame) {
          this.Round = this.RoundGame[rg];
          var RoundName = this.Round.Name;
          var months = this.Round.month;
          for (var m in months) {
            this.Month = months[m];
            this.RoundMonth.push(RoundName + this.Month);
          }
        }
        this.selectqh = this.monthStart.Name;
        this.tabnum = this.selectqh;
      }, response => {
      });
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
  computed: {
    lastDate () {
      var lastdate = [];
      var Date1 = '';
      for (var Round in this.RoundGame) {
        var matchGame = ''; matchGame = this.RoundGame[Round].matchGame;
        for (var mg in matchGame) {
        var itemMatch = ''; itemMatch = matchGame[mg];
          for (var item in itemMatch) {
            var iteminfo = ''; iteminfo = itemMatch[item];
            if (typeof (iteminfo.Date.value) === 'undefined') {
              Date1 = parseInt(iteminfo.Date);
            } else {
              Date1 = parseInt(iteminfo.Date.value);
            };
          var strDate = new Date(Date1);
          lastdate.push(strDate);
          }
        }
      };
      console.log(lastdate);
      return lastdate;
    }
  },
  methods: {
    collapseDetailShow: function () {
      this.collapseShow = !this.collapseShow;
    },
    tabExent (Round, Month) {
      this.tabnum = Round + Month;
      this.selectqh = Round + Month;
      this.collapseShow = false;
    },
    preDate (qh) {  // 前一期
      for (var i = 0; i < this.RoundMonth.length; i++) {
        if (this.RoundMonth[i] === qh) {
        var pre = this.RoundMonth[i - 1];
          this.selectqh = pre;
          this.tabnum = pre;
          if (i <= 0) {
            this.selectqh = this.RoundMonth[0];
            this.tabnum = this.RoundMonth[0];
          }
        }
      }
    },
    nextDate (qh) {  // 后一期
      var len = this.RoundMonth.length;
      for (var i = 0; i < len; i++) {
        if (this.RoundMonth[i] === qh) {
        var pre = this.RoundMonth[(i + 1)];
          this.selectqh = pre;
          this.tabnum = pre;
          if (i >= len - 1) {
            this.selectqh = this.RoundMonth[len - 1];
            this.tabnum = this.RoundMonth[len - 1];
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
p{margin:0;}
a{color:#000;}
.tab{
    width:100%;
    height:40px;
    line-height:40px;
    .tab-item{
      float:left;
      text-align:center;
      width:20%;
      font-weight:bold;
      & > a{
        font-size:16px;
        &.router-link-active{
          color:#3498db;
        }
      }
    }
}
.dataTab-wrap{
  font-size:14px;
  height:50px;
  .select-data{
   margin:5px 0;
    display: flex;
    justify-content: center;
  .block,input{
    font-size:14px;
   }
  }
  .next-data,.pre-data,.curdata{
    line-height:50px;
    text-align:center;
  }
}
.listCon-wrap{
  width:100%;
  .itemList{
    width:100%;
    border-top:1px solid #f5f5f5;
    padding:2px 0;
  }
  p{
    padding:4px;
  }
  .left,.middle,.right{
    text-align:center;
  }
  .pic{
    width:40px;
    height:40px;
    margin:0 auto;
    img{
      width:40px;
      height:40px;  
    }
  }
  .name{
    font-size:14px;
  }
  .vs{
    font-size:26px;
  }
}
.collapse{
  width:100%;
  background:#f5f5f5;
  height:auto;
  overflow-y:scroll;
  .item a{
    width:100/4 - 2.8%;
    margin:0 1% 15px;
    border: 1px solid #fff;
    background:#fff;
    text-align:center;
    line-height:50px;
    height:50px;
    float:left;
    text-decoration:none;
    color:#000;
    border-radius: 5px;
    flex:1;
    font-size:12px;
    &:hover{
      color:#f32b1b;
    }
    &.active{
     background:#f32b1b;
     color:#fff;
    }

  }
}
.qhBox{
  position:relative;
}
.el-icon-qh{
  position:absolute;
  top:18px;
  left:50%;
  margin-left:37px;
  z-index:0;
}
.bg-gray{
  background:#f5f5f5;
}
.little-word{
  font-size:12px;
  color: #b8bec7;
}
.fc{
  text-align:center;
}
.grid-content {
    border-radius: 4px;
  }
.nodata-mess{
  width:100%;
  text-align:center;
  padding:120px 0;
}
.clear{
  clear:both;
}
.collapse{
  .item{
   padding: 0 10px;
  p{
    padding-bottom:5px;
  }
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
    .score{
    font-size:13px;
    }
  }
}
.hasA{
  .list{
    width:100%;
    overflow:hidden;
    .el-row{
       width:100%;
    }
  }
}
</style>
