<template>
  <div class="stat">
     <div class="zhegie-wrap">
      <div calss="zhedie-box">
        <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                技术统计
            </div>
            <div class="fr">
              <button @click="dialogTableVisible = true" class="more">更多</button>
            </div>                 
        </div> 
        <div class="zhedie-con" v-if="HStatsT!=undefined">
          <ul class="fc padding10 dl" >
            <li v-for="(HStat, str, index) in HStatsT" :key="index"><div class="grid-content f20" v-if="HStat!=undefined && HStat.length!=0">{{HStat}}</div><div v-else class="f20">*</div></li>
          </ul>
          <ul class="fc padding10 dc">
            <li v-for="(StatN, str, index) in StatName" :key="index">
            <div class="grid-content little-word" v-if="StatN!=undefined && StatN.length!=0">{{StatN}}</div><div v-else class=" little-word">--</div></li>
          </ul>
          <ul class="fc padding10 dr">
            <li v-for="(AStat, index) in AStatsT" :key="index"><div class="grid-content f20" v-if="AStat!=undefined && AStat.length!=0"">{{AStat}}</div><div v-else class="f20">*</div></li>
          </ul>
        </div>
        <div v-else class="nodata-mess">暂无信息</div>
      </div>
    </div>
    <div class="pl-dialog">
      <el-dialog :visible.sync="dialogTableVisible" top='10px' width="96%">
        <ul class="ce-tab">
            <li lable="a" @click="cetabExent('a')" :class="{'active': cetabItemShowa}">主</li>
            <li lable="b" @click="cetabExent('b')" :class="{'active': cetabItemShowb}">客</li>                      
        </ul>
        <div>
          <div class="table-body dialogtable" v-show="cetabItemShowa" >
            <div v-if="HStats!=undefined">
              <el-row :gutter="10">
                <el-col :span="10" class="left">
                  <div class="grid-content padding10 little-word playername" v-for="(HStat, str, index) in HStats" :key="index" @click="showHCurPlayer(HStat[1])" :class="{'w_blue': HStat[1]==HomePalyerInfo[1]}">{{HStat[0]}}</div>
                </el-col>
                <el-col :span="14" class="right">
                  <div class="grid-content" v-if="HomePalyerInfo!=undefined && HomePalyerInfo.length!=0">
                      <div class="fc padding10 little-word">{{HomePalyerInfo[0]}}</div>
                      <el-row :gutter="10" class="playin">
                        <el-col :span="12" class="little-word"><div class="grid-content fc" v-for="(playerInfo, str, index) in playerinfos">{{playerInfo}}</div></el-col>
                        <el-col :span="12" class="fc">
                          <div class="grid-content">{{HomePalyerInfo[3]}}</div>
                          <div class="grid-content" :pos="HPos">{{HPos}}</div>
                          <div class="grid-content">{{HomePalyerInfo[4]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[5]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[6]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[7]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[8]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[9]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[10]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[11]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[12]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[13]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[14]}}</div>
                          <div class="grid-content">{{HomePalyerInfo[15]}}</div>
                          <div class="grid-content" v-if="HomePalyerInfo[16]!=undefined && HomePalyerInfo[16]!=''">{{HomePalyerInfo[16]}}</div>
                          <div class="grid-content" v-else>*</div>
                          <div class="grid-content" v-if="HomePalyerInfo[17]!=undefined && HomePalyerInfo[17]!=''">{{HomePalyerInfo[17]}}</div>
                          <div class="grid-content" v-else>*</div>                          
                        </el-col>
                      </el-row>
                  </div>
                  <div class="nodata-mess" v-else>暂无数据</div> 
                </el-col>
              </el-row>             
            </div>
            <div class="nodata-mess" v-else>暂无主队数据</div>                 
          </div>
          <!--主-->
          <div class="table-body"  v-show="cetabItemShowb" >
            <div v-if="AStats!=undefined">
              <el-row :gutter="10">
                <el-col :span="10" class="left">
                  <div class="grid-content padding10 little-word playername" v-for="(AStat, str, index) in AStats" :key="index" @click="showACurPlayer(AStat[1])" :class="{'w_blue': AStat[1]==AwayPalyerInfo[1]}">{{AStat[0]}}</div>
                </el-col>
                <el-col :span="14" class="right">
                  <div class="grid-content" v-if="AwayPalyerInfo!=undefined && AwayPalyerInfo.length!=0">
                      <div class="fc padding10 little-word">{{AwayPalyerInfo[0]}}</div>
                      <el-row :gutter="10" class="playin">
                        <el-col :span="12" class="little-word"><div class="grid-content fc" v-for="(playerInfo, str, index) in playerinfos">{{playerInfo}}</div></el-col>
                        <el-col :span="12" class="fc">
                          <div class="grid-content">{{AwayPalyerInfo[3]}}</div>
                          <div class="grid-content" :pos="APos">{{APos}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[4]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[5]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[6]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[7]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[8]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[9]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[10]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[11]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[12]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[13]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[14]}}</div>
                          <div class="grid-content">{{AwayPalyerInfo[15]}}</div>
                          <div class="grid-content" v-if="AwayPalyerInfo[16]!=undefined && AwayPalyerInfo[16]!=''">{{AwayPalyerInfo[16]}}</div>
                          <div class="grid-content" v-else>*</div>
                          <div class="grid-content" v-if="AwayPalyerInfo[17]!=undefined && AwayPalyerInfo[17]!=''">{{AwayPalyerInfo[17]}}</div>
                          <div class="grid-content" v-else>*</div>                          
                        </el-col>
                      </el-row>
                  </div>
                  <div class="nodata-mess" v-else>暂无数据</div> 
                </el-col>
              </el-row>             
            </div>
            <div class="nodata-mess" v-else>暂无客队数据</div> 
          </div>
          <!--客-->                
        </div>               
      </el-dialog>             
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,
      'gamestat': {},
      'HStatsT': {},
      'AStatsT': {},
      'HStats': {},
      'AStats': {},
      'playerId': '',
      'HomePalyerInfo': {},
      'AwayPalyerInfo': {},
      'StatName': {
        0: '',
        1: '投篮',
        2: '三分',
        3: '罚球',
        4: '进攻',
        5: '防守',
        6: '总数',
        7: '助攻',
        8: '犯规',
        9: '抢断',
        10: '失误',
        11: '盖帽',
        12: '得分',
        13: '快攻',
        14: '扣篮'
      },
      'playerinfos': {
        0: '时间',
        1: '位置',
        2: '投篮',
        3: '三分',
        4: '罚球',
        5: '进攻',
        6: '防守',
        7: '总数',
        8: '助攻',
        9: '犯规',
        10: '抢断',
        11: '失误',
        12: '盖帽',
        13: '得分',
        14: '快攻',
        15: '扣篮'
      },
      'dialogTableVisible': false,
      'cetabItemShowa': true,
      'cetabItemShowb': false
    };
  },
  created () {
    var gamegoaldataUrl = 'live/Api/Api/index/cc/b_gamestat/id/' + this.matchid;
    this.$http.jsonp(gamegoaldataUrl).then(response => {
      response = response.body;
      this.gamestat = response;
      this.HStatsT = this.gamestat.H_Stat_Total;
      this.AStatsT = this.gamestat.A_Stat_Total;
      this.HStats = this.gamestat.H_Stat;
      this.AStats = this.gamestat.A_Stat;
      this.HomePalyerInfo = this.HStats[0];
      this.AwayPalyerInfo = this.AStats[0];
    }, response => {});
  },
  computed: {
    HPos () {
      var pos = this.HomePalyerInfo[2];
      switch (pos) {
        case '1':
        pos = '首发';
        break;
        case 'F':
        pos = '前锋';
        break;
        case 'C':
        pos = '中锋';
        break;
        case 'G':
        pos = '后卫';
        break;
        default:
        pos = '暂无信息';
        break;
      }
      return pos;
    },
    APos () {
      var pos = this.AwayPalyerInfo[2];
      switch (pos) {
        case '1':
        pos = '首发';
        break;
        case 'F':
        pos = '前锋';
        break;
        case 'C':
        pos = '中锋';
        break;
        case 'G':
        pos = '后卫';
        break;
        default:
        pos = '暂无信息';
        break;
      }
      return pos;
    }
  },
  methods: {
    cetabExent (lable) {
      if (lable === 'a') {
        this.cetabItemShowa = true;
        this.cetabItemShowb = false;
      } else if (lable === 'b') {
        this.cetabItemShowa = false;
        this.cetabItemShowb = true;
      }
    },
    showHCurPlayer (playerId) {
    this.playerId = playerId;
      if (this.HStats !== undefined) {
        for (var i = 0; i < this.HStats.length; i++) {
          if (this.playerId === this.HStats[i][1]) {
            this.HomePalyerInfo = this.HStats[i];
          }
        }
      }
    },
    showACurPlayer (playerId) {
    this.playerId = playerId;
      if (this.AStats !== undefined) {
        for (var i = 0; i < this.AStats.length; i++) {
          if (this.playerId === this.AStats[i][1]) {
            this.AwayPalyerInfo = this.AStats[i];
          }
        }
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
.none{
  display:none;
}
.padding10{
  padding: 10px 0;
}
.playin{
  .grid-content{
     height:35px;
    line-height:35px; 
  }
}
.f20{
  font-size:18px;
}
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
  }
  .dl,.dr{
    width:30%;
  }
  .dc{
    width:100% - 60%;
  }
  .dl,.dr,.dc{
    float:left;
    li{
      height:40px;
      line-height:40px;
    }
  }
}
.dialogtable{
  margin-top:10px;
  .right{
  border-left:1px solid #f5f5f5;
  }
}
.more{
  padding:4px 6px;
  font-size:12px;
  border-radius:5px;
  background:#fff;
  border:1px solid #adadad;
}
.ce-tab{
  margin:0 auto;
  display: flex;
  justify-content: center;
  li{
    margin:0 10px;
    padding: 3px 10px;
    border:1px solid #adadad;
    border-radius:5px;
    font-size:14px;
    &.active{
    background:#428bca;
    color:#fff;
    }
  }
}
.w_blue{
  color:#1b4a90;
}
</style>
