<template>
  <div class="schedule_sfc">
    <div v-if="Schedules!=undefined || Periods!=undefined">
      <div v-if="schedules.Mode == 'Period'">
        <el-row class="dataTab-wrap bg-gray">
          <el-col :span="6"><div class="grid-content pre-data" @click="preDate(selectqh)">前一期</div></el-col>
           <el-col :span="12" class="qhBox">
             <div class="grid-content curdata" @click="collapseDetailShow" v-text="selectqh">{{lunList[lunstart]}}</div><i class="el-icon-caret-bottom el-icon-qh"></i>
           </el-col>
          <el-col :span="6"><div class="grid-content next-data"  @click="nextDate(selectqh)">后一期</div></el-col>
        </el-row>
        <div class="collapse" v-show="collapseShow">
            <div class="item"><a class="grid-content" v-for="(lunlist, lun1, index) in RoundMonth" :key="index" @click="tabExent(lunlist)" :class="{'active': lunlist == tabnum}">{{lunlist}}</a>
            </div>
        </div>
        <div class="zhedie-item">
          <div class="zhedie-con" v-for="(Period, str, index1) in Periods" :key="index1">
            <div v-if="Period['Mode'] !== 'None'">
              <div v-for="(itemMatch, name, index2) in Period.Schedule" :key='index2' class="item table" v-show="str+name == tabnum"> 
                <a v-for="(item, name, index2) in itemMatch" :key='index2' class="list" :href="'#/zq/game/gamegoaldata/' + item.Id[0]" >
                 <el-row :gutter="5">
                  <el-col :span="5">
                    <div class="grid-content little-word">
                    <p>{{item['Date']['value']=='undefined' ? new Date(parseInt(item['Date'])) : new Date(parseInt(item['Date']['value'])) | filterdatatime}}</p>
                    </div>
                  </el-col> 
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[2] + '.jpg'" class="img">
                    </div>                 
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content awayname fc" v-if="Teams[item.Id[2]].ShortName!=''">
                    {{Teams[item.Id[2]].ShortName}}
                    </div>
                    <div class="grid-content awayname fc" v-else>
                    --
                    </div>                  
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content fc score">
                      <span v-if="item['Score']">{{item.Score[0]}} : {{item.Score[1]}}</span> 
                      <span v-else>--:--</span>                  
                    </div>
                  </el-col>
                   <el-col :span="5">
                    <div class="grid-content awayname fc" v-if="Teams[item.Id[3]].ShortName!=''">
                    {{Teams[item.Id[3]].ShortName}}
                    </div>
                    <div class="grid-content awayname fc" v-else>
                    --
                    </div>                  
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[3] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                                                
                </el-row>
                </a>
              </div>
            </div>
            <div v-else>
              <div class="item table"  v-show="str == tabnum">
                <a v-for="(item, name, index2) in Period.Schedule" :key='index2' class="list" :href="'#/zq/game/gamegoaldata/' + item.Id[0]" >
                 <el-row :gutter="5">
                  <el-col :span="5">
                    <div class="grid-content little-word">
                    <p>{{item['Date']['value']=='undefined' ? new Date(parseInt(item['Date'])) : new Date(parseInt(item['Date']['value'])) | filterdatatime}}</p>
                    </div>
                  </el-col> 
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[2] + '.jpg'" class="img">
                    </div>                 
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content awayname fc" v-if="Teams[item.Id[2]].ShortName!=''">
                    {{Teams[item.Id[2]].ShortName}}
                    </div>
                    <div class="grid-content awayname fc" v-else>
                    --
                    </div>                  
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content fc score">
                      <span v-if="item['Score']">{{item.Score[0]}} : {{item.Score[1]}}</span> 
                      <span v-else>--:--</span>                  
                    </div>
                  </el-col>
                   <el-col :span="5">
                    <div class="grid-content awayname fc" v-if="Teams[item.Id[3]].ShortName!=''">
                    {{Teams[item.Id[3]].ShortName}}
                    </div>
                    <div class="grid-content awayname fc" v-else>
                    --
                    </div>                  
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[3] + '.jpg'" class="img">
                    </div>                 
                  </el-col>                                                
                </el-row>
                </a>                
              </div>           
            </div>
          </div>
        </div>
        <div class="zhedie-item">
        </div>       
      </div>
      <!--杯赛结束-->
      <div v-else>
        <el-row class="dataTab-wrap bg-gray">
          <el-col :span="6"><div class="grid-content pre-data" @click="preDate(selectqh)">前一期</div></el-col>
           <el-col :span="12" class="qhBox">
             <div class="grid-content curdata" @click="collapseDetailShow" v-text="selectqh">{{lunList[lunstart]}}</div><i class="el-icon-caret-bottom el-icon-qh"></i>
           </el-col>
          <el-col :span="6"><div class="grid-content next-data"  @click="nextDate(selectqh)">后一期</div></el-col>
        </el-row>
        <div class="collapse" v-show="collapseShow">
            <div class="item"><a class="grid-content" v-for="(lunlist, lun1, index) in RoundMonth" :key="index" @click="tabExent(lunlist)" :class="{'active': lunlist == tabnum}">{{lunlist}}</a>
            </div>
        </div>
        <div class="zhedie-item">
          <div class="zhedie-con">
            <div v-for="(itemMatch, str, index) in Schedules" :key='index' class="item table" v-show="str == tabnum"> 
              <a  v-for="(item, name, index) in itemMatch" :key='index'  class="list" :href="'#/zq/game/gamegoaldata/' + item.Id[0]" >
               <el-row :gutter="5">
                <el-col :span="5">
                  <div class="grid-content little-word">
                  <p>{{item['Date']['value']=='undefined' ? new Date(parseInt(item['Date'])) : new Date(parseInt(item['Date']['value'])) | filterdatatime}}</p>
                  </div>
                </el-col> 
                <el-col :span="2">
                  <div class="grid-content fc">
                    <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[2] + '.jpg'" class="img">
                  </div>                 
                </el-col>
                <el-col :span="5">
                  <div class="grid-content awayname fc" v-if="Teams[item.Id[2]].ShortName!=''">
                  {{Teams[item.Id[2]].ShortName}}
                  </div>
                  <div class="grid-content awayname fc" v-else>
                  --
                  </div>                  
                </el-col>
                <el-col :span="5">
                  <div class="grid-content fc score">
                    <span v-if="item['Score']">{{item.Score[0]}} : {{item.Score[1]}}</span> 
                    <span v-else>--:--</span>                  
                  </div>
                </el-col>
                 <el-col :span="5">
                  <div class="grid-content awayname fc" v-if="Teams[item.Id[3]].ShortName!=''">
                  {{Teams[item.Id[3]].ShortName}}
                  </div>
                  <div class="grid-content awayname fc" v-else>
                  --
                  </div>                  
                </el-col>
                <el-col :span="2">
                  <div class="grid-content fc">
                    <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[3] + '.jpg'" class="img">
                  </div>                 
                </el-col>                                                
              </el-row>
              </a>              
            </div>
          </div>
        </div>
      </div>
      <!--联赛结束-->
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
      'Schedules': '',
      'Periods': '',
      'Teams': {},
      'lunList': {},   // 杯赛赛次 1216 149
      'lunstart': '',
      'RoundMonth': [],
      'perSchedule11': {},
      'perSchedule12': {},
      'selectqh': '',
      'collapseShow': false,
      'tabnum': ''
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
      var defaultqh = 'live/Api/Api/index/cc/competitionschedule/id/' + this.compid;
      this.$http.jsonp(defaultqh).then(response => {
        response = response.body;
        this.schedules = response;
        this.Schedules = this.schedules.Schedule;
        this.Teams = this.schedules.Team;
        if (this.Schedules !== undefined || this.schedules.Period !== undefined) {
          if (this.schedules.Mode === 'Period') { // 杯赛period
            this.Periods = this.schedules.Period;
            var lunciName, lunci, gs;
            for (var period1 in this.Periods) {
              if (this.Periods[period1]['Mode'] !== 'None') { // 杯赛group
              this.perSchedule11 = this.Periods[period1]['Schedule'];
              for (lunci in this.perSchedule11) {  // a b c d
                  for (gs in this.perSchedule11[lunci]) {
                    lunciName = period1 + lunci;
                    this.lunstart = lunciName;
                  }
                this.lunList[lunciName] = lunciName;  // 轮次
                }
              } else { // 杯赛none
                this.perSchedule12 = this.Periods[period1]['Schedule'];
                this.lunList[period1] = period1;
                for (gs in this.perSchedule12) {
                  lunciName = period1 + lunci;
                  if (this.perSchedule12[gs]['Score'] !== undefined) {
                    this.lunstart = period1;
                    this.lunList[this.lunstart] = period1;
                  }
                }
               // console.log(this.lunList)
              }
            };
            // 默认状态下的首次赛事 轮次
            if (this.lunstart !== '') {
              this.selectqh = this.lunList[this.lunstart];
              this.tabnum = this.selectqh;
            } else {
              this.selectqh = this.lunList[this.lunList.length];
              this.tabnum = this.selectqh;
            }
          } else { // 联赛 round
            for (var Schedule in this.Schedules) {
              var itemMatch = this.Schedules[Schedule];
              var tmp = this.RoundMonth;
              tmp.push(Schedule);
                for (var gr in itemMatch) {
                  if (itemMatch[gr]['Score'] !== undefined) {
                      this.lunstart = Schedule;
                  }
                }
            }
            // 默认状态下的首次赛事 轮次
            if (this.lunstart !== '') {
              this.selectqh = this.RoundMonth[this.lunstart - 1];
              this.tabnum = this.selectqh;
            } else {
              this.selectqh = this.RoundMonth[this.RoundMonth.length];
              this.tabnum = this.selectqh;
            }
          };
        };
        // object转array
        var temp = this.RoundMonth;
        for (var key in this.lunList) {  // key是属性,object[key]是值
           temp.push(key); // 往数组中放属性
        }
      }, response => {
      });
  },
  computed: {
  },
  methods: {
    collapseDetailShow: function () {
      this.collapseShow = !this.collapseShow;
    },
    tabExent (lunlist) {
      this.tabnum = lunlist;
      this.selectqh = lunlist;
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
.fr{
    text-align:right;
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
    .el-row{
    width:100%;
    }
  }
}

</style>
