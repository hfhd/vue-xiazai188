<template>
  <div class="schedule_sfc">
    <el-row class="dataTab-wrap bg-gray">
      <el-col :span="6"><div class="grid-content pre-data" @click="nextDate()" :index="nextindex" :qh="nextqh">前一期</div></el-col>
       <el-col :span="12" class="qhBox">
         <div class="grid-content curdata" @click="collapseDetailShow" v-text="selectqh" :index="selectedindex"></div><i class="el-icon-caret-bottom el-icon-qh"></i>
       </el-col>
      <el-col :span="6"><div class="grid-content next-data" @click="preDate()" :index="preindex" :qh="preqh">后一期</div></el-col>
    </el-row>

    <div class="collapse" v-show="collapseShow" v-if="qhs.DegreeLst!=undefined && qhs.DegreeLst.length!=0">
        <div class="item"><a class="grid-content" :class="{'active':selectqh===qh}" v-for="(qh,index) in qhs.DegreeLst" :key="qh.id" @click="updateDate(qh,index)">{{qh}}</a></div>
    </div>
    <div v-else class="nodata-mess">暂无数据</div>

    <div class="listCon-wrap" v-if="schedulesfc.LotteryS!=undefined && schedulesfc.LotteryS.length!=0">
      <div v-for="(item, index) in schedulesfc.LotteryS" :key="item.id" class="itemList">
        <a href="">
          <el-row v-if="schedulesfc.LotteryS[index].GameInfo!=null">
            <el-col :span="8">
              <div class="grid-content left">
                  <p class="little-word">{{item.GameInfo.Competition.ShortName}}</p>
                  <p class="pic"><img :src="homeTeamImg[index]"></p>
                  <p class="name">{{item.GameInfo.HomeTeam.ShortName}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content middle">
                  <p class="state">{{statusArray[item.GameInfo.Status]}}</p>
                  <p class="vs" v-if="item.GameInfo.Score != ''">{{item.GameInfo.Score[0]}}:{{item.GameInfo.Score[1]}}</p>
                  <p class="vs" v-else>--:--</p>
                  <p class="little-word" v-if="item.GameInfo.Half != ''" >半场 {{item.GameInfo.Half}}</p>
                  <p  class="little-word" v-else>半场</p>
              </div>
            </el-col>
            <el-col :span="8">
            <div class="grid-content right">
                  <p class="little-word">{{item.starttime}}</p>
                  <p class="pic"><img :src="awayTeamImg[index]"></p>
                  <p class="name">{{item.GameInfo.AwayTeam.ShortName}}</p>
            </div>
            </el-col>
          </el-row>        
        </a>
      </div>
    </div>
    <div v-else class="nodata-mess">暂无数据</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'schedulesfc': {},
      'collapseShow': false,
      'qhs': {},
      'statusArray': {
        0: '未开始',
        1: '上半场',
        2: '中场',
        3: '下半场',
        4: '完场',
        5: '中断',
        6: '取消',
        7: '加时',
        8: '加时',
        9: '加时',
        10: '完场',
        11: '点球大战',
        12: '全场结束',
        13: '延期',
        14: '腰斩',
        15: '待定',
        16: '金球',
        17: '未开始'
      },
      'selectqh': '',
      'selectedindex': 0,
      'preindex': 0,
      'nextindex': 0,
      'preqh': '',
      'nextqh': ''
    };
  },
  created () {
    var strcurDate = new Date();
    var defalutYear = strcurDate.getFullYear();
    var urlQh = 'live/Api/Api/index/cc/schedule_sfc_degree/id/' + defalutYear;

    this.$http.jsonp(urlQh).then(response => {
      response = response.body;
      this.qhs = response;
      this.qhs.DegreeLst.sort();  // 获得qh数组后 倒叙排列
      this.qhs.DegreeLst.reverse();
      this.selectqh = this.qhs.CurDegree;  // 赋予selectqh data定义后 在获得qh值后的初始值  之后再点击事件updateDate中改变

      for (var i = 0; i < this.qhs.DegreeLst.length; i++) {
        if (this.selectqh === this.qhs.DegreeLst[i]) {
          this.selectedindex = i;
          this.preindex = (i - 1);  // 后一期
          if (this.preindex < 0) {
            this.preindex = 0;
          }
          this.preqh = this.qhs.DegreeLst[this.preindex];

          this.nextindex = (i + 1); // 前一期
          if (this.nextindex >= this.qhs.DegreeLst.length) {
            this.preindex = (this.qhs.DegreeLst.length - 1);
          }
          this.nextqh = this.qhs.DegreeLst[this.nextindex];

          this.selectedindex = i;
        }
      }

      var defaultqh = 'live/Api/Api/index/cc/schedule_sfc/id/' + this.qhs.CurDegree;
      this.$http.jsonp(defaultqh).then(response => {
        response = response.body;
        this.schedulesfc = response;
      }, response => {
      });
    }, response => {
    });
  },
  computed: {
    homeTeamImg () {
      var hometeamimg = [];
      for (var i = 0; i < this.schedulesfc.LotteryS.length; i++) {
        if (this.schedulesfc.LotteryS[i].GameInfo !== null) {
         var hometeamimgone = this.schedulesfc.LotteryS[i].GameInfo.HomeTeam.Id;
         var hometeamimgtwo = 'http://static.caishencai.com/tiyu/images/zq-team/' + hometeamimgone + '.jpg';
         hometeamimg.push(hometeamimgtwo);
        }
      }
      return hometeamimg;
    },
    awayTeamImg () {
     var awayteamimg = [];
     for (var i = 0; i < this.schedulesfc.LotteryS.length; i++) {
        if (this.schedulesfc.LotteryS[i].GameInfo !== null) {
          var awayteamimgone = this.schedulesfc.LotteryS[i].GameInfo.AwayTeam.Id;
          var awayteamimgtwo = 'http://static.caishencai.com/tiyu/images/zq-team/' + awayteamimgone + '.jpg';
          awayteamimg.push(awayteamimgtwo);
        }
     }
     return awayteamimg;
    }
  },
  methods: {
    collapseDetailShow: function () {
      this.collapseShow = !this.collapseShow;
    },
    updateDate (qh, index) {
      var selectedqh = 'live/Api/Api/index/cc/schedule_sfc/id/' + qh;
      this.$http.jsonp(selectedqh).then(response => {
        response = response.body;
        this.schedulesfc = response;
      }, response => {
      });
      this.collapseShow = false;
      this.selectqh = qh;// 点击事件updateDate触发qh值改变

      for (var i = 0; i < this.qhs.DegreeLst.length; i++) {
        if (this.qhs.DegreeLst[i] === this.selectqh) {
            this.selectedindex = i;
        };

        this.nextindex = (this.selectedindex + 1); // 前一期
        if (this.nextindex >= this.qhs.DegreeLst.length) { // 点击前一期到最后时 index不再减 为最后一期index-1 即length
          this.nextindex = this.qhs.DegreeLst.length;
        }
        this.nextqh = this.qhs.DegreeLst[this.nextindex];
        if (this.nextindex === this.qhs.DegreeLst.length) { // 当在最后一期时 加载的数据为length-1
          this.nextqh = this.qhs.DegreeLst[this.qhs.DegreeLst.length - 1];
        }

        this.preindex = (this.selectedindex - 1); // 后一期
        if (this.preindex < 0) {
          this.preindex = -1;
        }
        this.preqh = this.qhs.DegreeLst[this.preindex];
        if (this.preindex === -1) {   // 最后一期
          this.preqh = this.qhs.DegreeLst[0];
        }
      }
    },
    nextDate () { // 前一期
      var selectedqh = 'live/Api/Api/index/cc/schedule_sfc/id/' + this.nextqh;
      this.$http.jsonp(selectedqh).then(response => {
        response = response.body;
        this.schedulesfc = response;
      }, response => {
      });
      this.selectqh = this.nextqh; // 中间值

      for (var i = 0; i < this.qhs.DegreeLst.length; i++) {
        if (this.qhs.DegreeLst[i] === this.selectqh) {
            this.selectedindex = i;
        };

        this.nextindex = (this.selectedindex + 1); // 前一期
        if (this.nextindex >= this.qhs.DegreeLst.length) { // 点击前一期到最后时 index不再减 为最后一期index-1 即length
          this.nextindex = this.qhs.DegreeLst.length;
        }
        this.nextqh = this.qhs.DegreeLst[this.nextindex];
        if (this.nextindex === this.qhs.DegreeLst.length) { // 当在最后一期时 加载的数据为length-1
          this.nextqh = this.qhs.DegreeLst[this.qhs.DegreeLst.length - 1];
        }

        this.preindex = (this.selectedindex - 1); // 后一期
        if (this.preindex < 0) {
          this.preindex = -1;
        }
        this.preqh = this.qhs.DegreeLst[this.preindex];
        if (this.preindex === -1) {   // 最后一期
          this.preqh = this.qhs.DegreeLst[0];
        }
      }
    },
    preDate () { // 后一期
      var selectedqh = 'live/Api/Api/index/cc/schedule_sfc/id/' + this.preqh;
      this.$http.jsonp(selectedqh).then(response => {
        response = response.body;
        this.schedulesfc = response;
      }, response => {
      });
      this.selectqh = this.preqh; // 中间值
      for (var i = 0; i <= this.qhs.DegreeLst.length; i++) {
        if (this.qhs.DegreeLst[i] === this.selectqh) {
            this.selectedindex = i;
        };

        this.nextindex = (this.selectedindex + 1); // 前一期
        if (this.nextindex >= this.qhs.DegreeLst.length) {
          this.nextindex = this.qhs.DegreeLst.length;
        }
        this.nextqh = this.qhs.DegreeLst[this.nextindex];
        if (this.nextindex === this.qhs.DegreeLst.length) { // 当在最后一期时 加载的数据为length-1
          this.nextqh = this.qhs.DegreeLst[this.qhs.DegreeLst.length - 1];
        }

        this.preindex = (this.selectedindex - 1); // 后一期
        if (this.preindex < 0) {
          this.preindex = -1;
        }
        this.preqh = this.qhs.DegreeLst[this.preindex];
        if (this.preindex === -1) {   // 最后一期
          this.preqh = this.qhs.DegreeLst[0];
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
