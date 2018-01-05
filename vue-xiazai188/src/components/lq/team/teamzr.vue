<template>
  <div class="teamstats">
    <div v-if="teamstats.id!=undefined">
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
                球员
          </div> 
          <div class="zhedie-con" v-if="Players!=undefined && Players.length!=0">         
              <div class="table">
                <el-row :gutter="5" v-for="(Player, index) in Players" :key='index' class="list">
                  <el-col :span="3">
                    <div class="grid-content fc">
                      <img :src="'http://static.caishencai.com/tiyu/images/lq-player/' + Player.Id + '.jpg'" class="img">
                    </div>               
                  </el-col>                     
                  <el-col :span="11">
                    <div class="grid-content fc" v-if="Player.Name!=''">{{Player.Name}}</div>
                    <div class="grid-content fc" v-else>--</div>                  
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content fc" v-if="Player.ShirtNo!=''"> {{Player.ShirtNo}}号</div>
                    <div class="grid-content fc" v-else>--</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content fc" v-if="Player.Position!=''">{{Player.Position}}</div> 
                    <div class="grid-content fc" v-else>--</div>                
                  </el-col>
                </el-row>
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
      'Players': {}
    };
  },
  created () {
    var teamszrsUrl = 'live/Api/Api/index/cc/b_teaminfo/id/' + this.teamid;
    this.$http.jsonp(teamszrsUrl).then(response => {
      response = response.body;
      this.teamstats = response;
      this.Players = this.teamstats.Players;
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
.table-header{
  padding:10px;
}
.title{
  font-size:14px;
  padding: 5px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
}
.table{
  padding:10px 15px;
  font-size:14px;
  .list{
    padding:10px 0;
    border-bottom:1px solid #f4f4f4;
    display:flex;
    justify-content:center;
    align-items:center; 
    &:last-child {
      border-bottom:0;
    }
    .img{
    width:33px;
    height:33px;
    display:inline-block;
    align-items:center;
    }
  }
}
</style>
