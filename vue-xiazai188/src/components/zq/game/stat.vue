<template>
  <div class="stat">
     <div class="zhegie-wrap">
      <div calss="zhedie-box">
        <div class="well well-sm">
          <i class="sm-line"></i>
            技术统计        
        </div> 
        <div class="zhedie-con" v-if="Stats!=undefined && Stats.length!=0">
          <el-row :gutter="10" class="fc padding10" v-for="(Stat, index) in Stats" :key="index">
            <el-col :span="6"><div class="grid-content f20" v-if="Stat.Home!=undefined && Stat.Home.length!=0">{{Stat.Home}}</div><div v-else class="f20">*</div></el-col>
            <el-col :span="12"><div class="grid-content little-word" v-if="Stat.Name!=''">{{Stat.Name}}</div><div v-else class="little-word">--</div></el-col>
            <el-col :span="6"><div class="grid-content f20" v-if="Stat.Away!=undefined && Stat.Away.length!=0"">{{Stat.Away}}</div><div v-else class="f20">*</div></el-col>
          </el-row>
        </div>
        <div v-else class="nodata-mess">暂无信息</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,
      'gamegoaldata': {},
      'Stats': {}
    };
  },
  created () {
    var gamegoaldataUrl = 'live/Api/Api/index/cc/gamegoaldata/id/' + this.matchid;
    this.$http.jsonp(gamegoaldataUrl).then(response => {
      response = response.body;
      this.gamegoaldata = response;
      this.Stats = this.gamegoaldata.Stat;
    }, response => {});
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
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
  }
}
.padding10{
  padding: 10px 0;
}
.f20{
  font-size:20px;
}
</style>
