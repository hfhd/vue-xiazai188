<template>
  <div class="gameanalyse">
      <div class="gametab-box">
        <el-row class="gametab2">
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/game/zs_hdaoddsinfo/' + matchid" >欧赔</router-link>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/game/zs_ahoddsinfo/' + matchid" >亚盘</router-link>
            </div>            
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/game/zs_ouoddsinfo/' + matchid" >大小盘</router-link>
            </div>            
          </el-col>
        </el-row>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>    
  </div>
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid  // 获得路由传过来的id值
    };
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
.gametab-box{
    width:100%;
    .gametab2{
      text-align:center;
      line-height:28px;
      .grid-content{
          & > a{
           font-size:12px;
           color:#b8bec7;
            &.router-link-active {
              color:#1b4a90;
            }
          }      
      } 
  }     
}
</style>
