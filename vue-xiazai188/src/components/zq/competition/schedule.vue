<template>
  <div class="schedule_sfc">
    <div v-if="Schedules!=undefined || Periods!=undefined">
      <div v-if="schedules.Mode == 'Period'">
        <el-row class="dataTab-wrap bg-gray">
          <el-col :span="6"><div class="grid-content pre-data" @click="nextDate()" :index="nextindex" :qh="nextqh">前一期</div></el-col>
           <el-col :span="12" class="qhBox">
             <div class="grid-content curdata" @click="collapseDetailShow">{{lunList[lunstart]}}</div><i class="el-icon-caret-bottom el-icon-qh"></i>
           </el-col>
          <el-col :span="6"><div class="grid-content next-data" @click="preDate()" :index="preindex" :qh="preqh">后一期</div></el-col>
        </el-row>
        <div class="collapse" v-show="collapseShow">
            <div class="item"><a class="grid-content" v-for="(lunlist, lun1, index) in lunList" :key="index">{{lunlist}}</a>
            </div>
        </div>
        <div class="zhedie-item">
          <div class="zhedie-con" v-for="(PeriodArray, name, index1) in PeriodArrays" :key="index1">
            <div v-if="flag==11 && PeriodArray[name]!=undefined" >
              <div v-for="(perschedule, name, index2) in PeriodArray.Schedule" :key='index2'  > 
                <div class="table">
                  <el-row :gutter="3"  class="list" v-for="(item, name, index4) in perschedule[name]" :key='index4'>
                    <el-col :span="5">
                      <div class="grid-content little-word">
                      <p :lastdate="lastDate[index]">{{lastDate[index] | filterdatatime}}</p>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[2] + '.jpg'" class="img">
                      </div>                 
                    </el-col>                     
                    <el-col :span="5">
                      <div class="grid-content homename fl" v-if="Teams[item.Id[2]].ShortName!=''">
                      {{Teams[item.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fl" v-else>
                      {{Teams[item.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content fc score">
                        <span v-if="item.Score[0]==='' && item.Score[1]===''">-- : --</span> 
                        <span v-else>{{item.Score[0]}} : {{item.Score[1]}}</span>                  
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content awayname fr" v-if="Teams[item.Id[3]].ShortName!=''">
                      {{Teams[item.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fr" v-else>
                      {{Teams[item.Id[3]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[3] + '.jpg'" class="img">
                      </div>                 
                    </el-col>                     
                  </el-row>
                </div>
              </div>
            </div>
            <div v-else-if="flag==12">
              <div  >
                <div class="table">
                  <el-row :gutter="3"  class="list" v-for="(item, name, index4) in PeriodArray.Schedule" :key='index4'>
                    <el-col :span="5">
                      <div class="grid-content little-word">
                      <p :lastdate="lastDate[index]">{{lastDate[index] | filterdatatime}}</p>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[2] + '.jpg'" class="img">
                      </div>                 
                    </el-col>                     
                    <el-col :span="5">
                      <div class="grid-content homename fl" v-if="Teams[item.Id[2]].ShortName!=''">
                      {{Teams[item.Id[2]].ShortName}}
                      </div>
                      <div class="grid-content homename fl" v-else>
                      {{Teams[item.Id[2]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content fc score">
                        <span v-if="item.Score[0]==='' && item.Score[1]===''">-- : --</span> 
                        <span v-else>{{item.Score[0]}} : {{item.Score[1]}}</span>                  
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content awayname fr" v-if="Teams[item.Id[3]].ShortName!=''">
                      {{Teams[item.Id[3]].ShortName}}
                      </div>
                      <div class="grid-content awayname fr" v-else>
                      {{Teams[item.Id[3]].Name}}
                      </div>                  
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + item.Id[3] + '.jpg'" class="img">
                      </div>                 
                    </el-col>                     
                  </el-row>
                </div>              
              </div>
            </div>
          </div>
        </div>
        <div class="zhedie-item">

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
      'Schedules': '',
      'Periods': '',
      'PeriodArrays': {},
      'PeriodArray': {},
      'ScheduleArray': {},
      'lunList': {},
      'lunstart': '',
      'perSchedule11': {},
      'perSchedule12': {},
      'flag': 1,
      'collapseShow': false,
      'qhs': {},
      'selectqh': '',
      'selectedindex': 0,
      'preindex': 0,
      'nextindex': 0,
      'preqh': '',
      'nextqh': ''
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
        this.Periods = this.schedules.Period;
        if (this.Schedules !== undefined || this.Periods !== undefined) {
          if (this.schedules.Mode === 'Period') { // 杯赛period
            this.PeriodArrays = this.Periods;
            this.flag = 1;
            var lunarr, lun2, lun;
            for (var period1 in this.PeriodArrays) {
              if (this.PeriodArrays[period1]['Mode'] !== 'None') { // 杯赛none
              this.flag = 11;
              this.perSchedule11 = this.PeriodArrays[period1]['Schedule'];
              for (lun in this.perSchedule11) {  // a b c d
                  for (lun2 in this.perSchedule11[lun]) {
                    lunarr = period1 + lun;
                    if (this.perSchedule11[lun][lun2]['Score'] !== undefined) {
                      this.lunstart = lunarr;
                    }
                  }
                this.lunList[lunarr] = lunarr;  // 轮次
                // console.log(this.lunList[lunarr])
                }
              } else { // 杯赛group
                this.flag = 12;
                this.perSchedule12 = this.PeriodArrays[period1]['Schedule'];
                this.lunList[period1] = period1;
                for (lun2 in this.perSchedule12) {
                  lunarr = period1 + lun2;
                  if (this.perSchedule12[lun2]['Score'] !== undefined) {
                    this.lunstart = period1;
                    this.lunList[this.lunstart] = period1;
                  }
                }
              }
            }
          } else { // 联赛 round
           this.flag = 2;
            // break;
          };
        };
      }, response => {
      });
  },
  computed: {
    lastDate () {
      var lastdate = [];
      var Date1 = '';
      for (var perschedule11 in this.perSchedule11) {
        var itemmatch = ''; itemmatch = this.perSchedule11[perschedule11];
        for (var item in itemmatch) {
        var iteminfo = ''; iteminfo = itemmatch[item];
          if (typeof (iteminfo.Date.value) === 'undefined') {
            Date1 = parseInt(iteminfo.Date);
          } else {
            Date1 = parseInt(iteminfo.Date.value);
          };
        }
      var strDate = new Date(Date1);
      lastdate.push(strDate);
      };
      return lastdate;
    }
  },
  methods: {
    collapseDetailShow: function () {
      this.collapseShow = !this.collapseShow;
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
  margin-left:30px;
}
.bg-gray{
  background:#f5f5f5;
}
.little-word{
  font-size:12px;
  color: #b8bec7;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.nodata-mess{
  width:100%;
  text-align:center;
  padding:120px 0;
}
</style>
