<template>
  <div class="gameanalyse">
      <div class="gametab-box">
        <el-row class="gametab2">
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/game/gameanalyse/' + matchid" >战绩</router-link>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/game/stat/' + matchid" >技术</router-link>
            </div>            
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/game/gameprediction/' + matchid" >阵容</router-link>
            </div>            
          </el-col>
        </el-row>
      </div>
      <router-view></router-view>    
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
.tab{
    width:100%;
    height:25;
    line-height:25px;
    background:#f32b1b;
    text-align:center;
    display:flex;
    justify-content: center;
    .tab-item{
      float:left;
      width:20%;
      font-weight:500;
      text-align:center;
      & > a{
       color:#fff;
       font-size:14px;
        &.router-link-active{
          color:#fff;
        }
        &.router-link-active p{
            width: 30px;
            height: 2px;
            background: #fff;
            margin: 0 auto;
            margin-top: 4px;
        }
      }
    }
  }
</style>
