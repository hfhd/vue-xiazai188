<template>
  <div class="gameprediction">
    <div  class="zhegie-wrap">
      <div calss="zhedie-box">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                球员阵容
            </div>
            <div class="fr">
              <ul class="fr-tab">
                <li lable="a" @click="tabExent('a')" :class="{'active': tabItemShowa}">主</li>
                <li lable="b" @click="tabExent('b')" :class="{'active': tabItemShowb}">客</li>
              </ul>
            </div>
          </div>
          <div class="zhedie-con" v-if="Lineups!=undefined">
            <div class="tab-item" v-show="tabItemShowa">
              <div v-if="HomePlayers!=undefined && HomePlayers.length!=0">
                <el-row :gutter="5" class="table-header little-word">
                  <el-col :span="8"><div class="grid-content fc">球员</div></el-col>
                  <el-col :span="4"><div class="grid-content fc">号码</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">位置</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">状态</div></el-col>
                </el-row>
                <div class="table-body">
                  <el-row :gutter="5" v-for="(HomePlayer, index) in HomePlayers" :key="index">
                    <el-col :span="8"><div class="grid-content">{{HomePlayer.Name}}</div></el-col>
                    <el-col :span="4"><div class="grid-content" v-if="HomePlayer.ShitNo!=null">{{HomePlayer.ShitNo}}</div><div v-else>--</div></el-col>
                    <el-col :span="6"><div class="grid-content" :homeplayerpos="HomeplayerPos">{{HomeplayerPos[index]}}</div></el-col>
                    <el-col :span="6"><div class="grid-content" :homeplayerstatus="HomeplayerStatus">{{HomeplayerStatus[index]}}</div></el-col>
                  </el-row>
                </div>
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--近期比赛主队 完-->
            <div class="tab-item" v-show="tabItemShowb"> <!--近期比赛客队-->
              <div v-if="AwayPlayers!=undefined && AwayPlayers.length!=0">
                <el-row :gutter="5" class="table-header little-word">
                  <el-col :span="8"><div class="grid-content fc">球员</div></el-col>
                  <el-col :span="4"><div class="grid-content fc">号码</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">位置</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">状态</div></el-col>
                </el-row>
                <div class="table-body">
                  <el-row :gutter="5" v-for="(AwayPlayer, index) in AwayPlayers" :key="index">
                    <el-col :span="8"><div class="grid-content">{{AwayPlayer.Name}}</div></el-col>
                    <el-col :span="4"><div class="grid-content" v-if="AwayPlayer.ShitNo!=null">{{AwayPlayer.ShitNo}}</div><div v-else>--</div></el-col>
                    <el-col :span="6"><div class="grid-content" :awayplayerpos="AwayplayerPos">{{AwayplayerPos[index]}}</div></el-col>
                    <el-col :span="6"><div class="grid-content" :awayplayerstatus="AwayplayerStatus">{{AwayplayerStatus[index]}}</div></el-col>
                  </el-row>
                </div>              
              </div>
              <div class="nodata-mess" v-else>暂无数据</div>
            </div>
            <!--近期比赛客队 完-->
          </div> 
          <div class="nodata-mess" v-else>暂无数据</div>    
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,
      'gameprediction': {},
      'Lineups': {},
      'HomePlayers': {},
      'AwayPlayers': {},
      'tabItemShowa': true,
      'tabItemShowb': false
    };
  },
  created () {
    var gamepredictionUrl = 'live/Api/Api/index/cc/gameprediction/id/' + this.matchid;
    this.$http.jsonp(gamepredictionUrl).then(response => {
      response = response.body;
      this.gameprediction = response;
      this.Lineups = this.gameprediction.Lineup;
      this.AwayPlayers = this.Lineups.AwayPlayers;
      this.HomePlayers = this.Lineups.HomePlayers;
    }, response => {});
  },
  computed: {
    HomeplayerPos () {
      var posarray = [];
      var pos = '';
      for (var i = 0; i < this.HomePlayers.length; i++) {
        if (this.HomePlayers[i].Pos === 0) {
          pos = '守门员';
        } else if (this.HomePlayers[i].Pos === 1) {
          pos = '后卫';
        } else if (this.HomePlayers[i].Pos === 2) {
          pos = '中场';
        } else if (this.HomePlayers[i].Pos === 3) {
          pos = '前锋';
        }
        posarray.push(pos);
      };
      return posarray;
    },
    HomeplayerStatus () {
      var statusarray = [];
      var status = '';
      for (var i = 0; i < this.HomePlayers.length; i++) {
        if (this.HomePlayers[i].Status === 0) {
          status = '后备球员';
        } else if (this.HomePlayers[i].Status === 1) {
          status = '停赛球员';
        } else if (this.HomePlayers[i].Status === 2) {
          status = '伤病球员';
        } else if (this.HomePlayers[i].Status === 3) {
          status = '首发球员';
        } else if (this.HomePlayers[i].Status === 4) {
          status = '其他原因缺阵球员';
        }
        statusarray.push(status);
      };
      return statusarray;
    },
    AwayplayerPos () {
      var posarray = [];
      var pos = '';
      for (var i = 0; i < this.AwayPlayers.length; i++) {
        if (this.AwayPlayers[i].Pos === 0) {
          pos = '守门员';
        } else if (this.AwayPlayers[i].Pos === 1) {
          pos = '后卫';
        } else if (this.AwayPlayers[i].Pos === 2) {
          pos = '中场';
        } else if (this.AwayPlayers[i].Pos === 3) {
          pos = '前锋';
        }
        posarray.push(pos);
      };
      return posarray;
    },
    AwayplayerStatus () {
      var statusarray = [];
      var status = '';
      for (var i = 0; i < this.AwayPlayers.length; i++) {
        if (this.AwayPlayers[i].Status === 0) {
          status = '后备球员';
        } else if (this.AwayPlayers[i].Status === 1) {
          status = '停赛球员';
        } else if (this.AwayPlayers[i].Status === 2) {
          status = '伤病球员';
        } else if (this.AwayPlayers[i].Status === 3) {
          status = '首发球员';
        } else if (this.AwayPlayers[i].Status === 4) {
          status = '其他原因缺阵球员';
        }
        statusarray.push(status);
      };
      return statusarray;
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
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
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
.title{
  font-size:14px;
  padding: 5px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
  padding:10px 0;
}
.table-body{
  padding:5px 0;
  .el-row{
    padding: 10px 0;
    text-align:center;
    font-size:14px;
  }
} 
</style>
