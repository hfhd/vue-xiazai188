<template>
  <div class="schedule_jc">
    <el-row class="dataTab-wrap bg-gray">
      <el-col :span="4"><div class="grid-content pre-data" @click="preDate(value1)">前一期</div></el-col>
       <el-col :span="16">
        <div class="grid-content select-data">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value1"
              type="date"
              default-value="2017-12-01" 
              :picker-options="pickerBeginDateAfter" 
              @change="updateDate(value1)" style="font-size:14px; height:30px;">
            </el-date-picker>
          </div>
        </div>
       </el-col>
      <el-col :span="4"><div class="grid-content next-data" @click="nextDate((value1))">后一期</div></el-col>
    </el-row>
    <div class="listCon-wrap" v-if="schedulejc.LotteryS!=undefined && schedulejc.LotteryS.length!=0">
      <div v-for="(item, index) in schedulejc.LotteryS" :key="item.id" class="itemList">
        <router-link :to="'/lq/game/b_gamegoaldata/' + item.matchId" :matchId="item.matchId">
          <el-row v-if="item.GameInfo!=null">
            <el-col :span="8">
              <div class="grid-content left">
                  <p class="little-word">{{item.GameInfo.Competition.ShortName}}</p>
                  <p class="pic"><img :src="homeTeamImg[index]"></p>
                  <p class="name" v-if="item.GameInfo.HomeTeam.ShortName != ''">{{item.GameInfo.HomeTeam.ShortName}}</p>
                  <p class="name" v-else>{{item.GameInfo.HomeTeam.Name}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content middle">
                  <p class="state">{{statusArray[item.GameInfo.Status]}}</p>
                  <p class="vs" v-if="item.GameInfo.AScore[0] != ''">{{item.GameInfo.AScore[0]}}:{{item.GameInfo.BScore[0]}}</p>
                  <p class="vs" v-else>--:--</p>
              </div>
            </el-col>
            <el-col :span="8">
            <div class="grid-content right">
                  <p class="little-word">{{item.starttime}}</p>
                  <p class="pic"><img :src="awayTeamImg[index]"></p>
                  <p class="name" v-if="item.GameInfo.AwayTeam.ShortName != ''">{{item.GameInfo.AwayTeam.ShortName}}</p>
                  <p class="name" v-else>{{item.GameInfo.AwayTeam.Name}}</p>
            </div>
            </el-col>
          </el-row>
        </router-link>
      </div>    
    </div>
    <div v-else class="nodata-mess">暂无数据</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'schedulejc': {},
      'value1': new Date(),
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
      },
      'urlRode': '',
      'beginDateVal': '',
      pickerBeginDateAfter: {
        disabledDate: (time) => {
        }
      }
    };
  },
  created () {
    var strcurDate = new Date();
    var defalutYear = strcurDate.getFullYear();
    var defalutMon = (strcurDate.getMonth() + 1) > 10 ? (strcurDate.getMonth() + 1) : '0' + (strcurDate.getMonth() + 1);
    var defalutDate = strcurDate.getDate() >= 10 ? strcurDate.getDate() : '0' + strcurDate.getDate();
    var defalutTime = defalutYear + '-' + defalutMon + '-' + defalutDate;
    var urlRode = 'live/Api/Api/index/cc/b_schedule_jc/id/' + defalutTime;
    this.$http.jsonp(urlRode).then(response => {
      response = response.body;
      this.schedulejc = response;
    }, response => {
    });
  },
  computed: {
    homeTeamImg () {
      var hometeamimg = [];
      for (var i = 0; i < this.schedulejc.LotteryS.length; i++) {
        if (this.schedulejc.LotteryS[i].GameInfo !== null) {
          var hometeamimgone = this.schedulejc.LotteryS[i].GameInfo.HomeTeam.Id;
          var hometeamimgtwo = 'http://static.caishencai.com/tiyu/images/zq-team/' + hometeamimgone + '.jpg';
          hometeamimg.push(hometeamimgtwo);
        }
      };
      return hometeamimg;
    },
    awayTeamImg () {
      var awayteamimg = [];
      for (var i = 0; i < this.schedulejc.LotteryS.length; i++) {
        if (this.schedulejc.LotteryS[i].GameInfo !== null) {
          var awayteamimgone = this.schedulejc.LotteryS[i].GameInfo.AwayTeam.Id;
          var awayteamimgtwo = 'http://static.caishencai.com/tiyu/images/zq-team/' + awayteamimgone + '.jpg';
          awayteamimg.push(awayteamimgtwo);
        }
      };
      return awayteamimg;
    }
  },
  methods: {
    updateDate (value1) {
      var strcurDate = value1;
      var defalutYear = strcurDate.getFullYear();
      var defalutMon = (strcurDate.getMonth() + 1) > 10 ? (strcurDate.getMonth() + 1) : '0' + (strcurDate.getMonth() + 1);
      var defalutDate = strcurDate.getDate() >= 10 ? strcurDate.getDate() : '0' + strcurDate.getDate();
      var defalutTime = defalutYear + '-' + defalutMon + '-' + defalutDate;
      this.$http.jsonp('live/Api/Api/index/cc/b_schedule_jc/id/' + defalutTime).then(response => {
        response = response.body;
        this.schedulejc = response;
      }, response => {
      });
    },
    preDate (curdate) {
      var predate = curdate.setDate(curdate.getDate() - 1);
      var strcurDate = new Date(predate);
      var defalutYear = strcurDate.getFullYear();
      var defalutMon = (strcurDate.getMonth() + 1) >= 10 ? (strcurDate.getMonth() + 1) : '0' + (strcurDate.getMonth() + 1);
      var defalutDate = strcurDate.getDate() >= 10 ? strcurDate.getDate() : '0' + strcurDate.getDate();
      var defalutTime = defalutYear + '-' + defalutMon + '-' + defalutDate;
      this.value1 = new Date(defalutTime);
      this.$http.jsonp('live/Api/Api/index/cc/b_schedule_jc/id/' + defalutTime).then(response => {
        response = response.body;
        this.schedulejc = response;
      }, response => {
      });
    },
    nextDate (curdate) {
      var predate = curdate.setDate(curdate.getDate() + 1);
      var strcurDate = new Date(predate);
      var defalutYear = strcurDate.getFullYear();
      var defalutMon = (strcurDate.getMonth() + 1) >= 10 ? (strcurDate.getMonth() + 1) : '0' + (strcurDate.getMonth() + 1);
      var defalutDate = strcurDate.getDate() >= 10 ? strcurDate.getDate() : '0' + strcurDate.getDate();
      var defalutTime = defalutYear + '-' + defalutMon + '-' + defalutDate;
      this.value1 = new Date(defalutTime);
      this.$http.jsonp('live/Api/Api/index/cc/b_schedule_jc/id/' + defalutTime).then(response => {
        response = response.body;
        this.schedulejc = response;
      }, response => {
      });
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
  .next-data,.pre-data{
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
  a{
    display:block;
  }
}
.bg-gray{
  background:#f5f5f5;
}
.little-word{
  font-size:12px;
  color: #b8bec7;
}

.el-row {
  }
  .el-col {
    
}
.nodata-mess{
  width:100%;
  text-align:center;
  padding:120px 0;
}
</style>
