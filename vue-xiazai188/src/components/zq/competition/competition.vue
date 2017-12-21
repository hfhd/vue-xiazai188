<template>
  <div class="competition" v-if="comInfos!=undefined && comInfos.id!=undefined">
    <div class="gameTop">
      <div class="gameheader-wrap">
        <el-row class="gameheader">
          <el-col :span="12"><div class="grid-content"><i class="el-icon-arrow-left el-icon"></i></div></el-col>
          <el-col :span="12" ><div class="grid-content fr"><i class="el-icon-menu el-icon"></i></div></el-col>
        </el-row>
      </div>
      <el-row class="teaminfo-box">
        <el-col :span="24">
          <div class="grid-content right">
            <a href>
              <p class="pic"><img :src="'http://static.caishencai.com/tiyu/images/zq-competition/' + comInfos.id + '.jpg'"></p>
              <p class="name" v-if="comInfos.ShortName!=''">{{comInfos.ShortName}}</p><p class="name" v-else>{{comInfos.Name}}</p>
            </a>
          </div>
        </el-col>
      </el-row>
      <div class="teamtab-box">
        <el-row class="">
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/competition/schedule/' + compid" >赛程<i class="el-icon-caret-top"></i></router-link>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/competition/standing/' + compid" >积分榜<i class="el-icon-caret-top"></i></router-link>
            </div>            
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <router-link :to="'/zq/competition/shooter/' + compid" >射手榜<i class="el-icon-caret-top"></i></router-link>
            </div>            
          </el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>    
  </div>
  <div v-else class="nodata-mess">暂无信息</div>
</template>

<script>
export default {
  data () {
    return {
     'compid': this.$route.params.compid,
     'comInfos': {}
    };
  },
  created () {
    var compinforUrl = 'live/Api/Api/index/cc/competitioninfo/id/' + this.compid;
    this.$http.jsonp(compinforUrl).then(response => {
      response = response.body;
      this.comInfos = response;
    }, response => {
    });
  }
};
</script>

<style lang="less" scoped>
  a{
    text-decoration: none; 
    color:#000;
    display:block
  } 
  a:hover,a:visited{
    text-decoration: none;border:0;
  }
  p{
    margin:0;
    padding:0;
  }
  .gameheader-wrap{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:50px;
    line-height:50px;
    background:#fff;
    .gameheader{
      background:#f32b1b;
      color:#fff;
      height:50px;
      line-height:50px;
      text-align:center;
      .el-icon{
        font-size:28px;
        padding:10px 0;
      }
      .el-icon-arrow-left{
        float:left;
        padding-left:4px;
      }
      .el-icon-menu{
        float:right;
        padding-right:8px;
      }
    }
  }
  .teaminfo-box{
    width:100%;
    height:auto;
    background:#f32b1b;
    color:#fff;
    padding:0 0 10px;
    a{
    color:#FFF;
    display:block;
    }
    .grid-content{
      text-align:center;
    }
    .pic{
      img{
        width:55px;
        height:55px;
      }
    }
    .name{
      padding:8px 0 4px;
      font-size:20px;
    }
  }
  .teamtab-box{
    width:100%;
    background:#f32b1b;
    & a{
       color:#fff;
      text-align:center;
      padding-bottom:10px;
      font-size:15px;
      position:relative;
        &.router-link-active i{
        display:block;      
        }      
    }
    .el-icon-caret-top{
      position: absolute;
      bottom: -5px;
      left: 45%; 
      display:none;      
    }
  }
  .nodata-mess{
    margin:100px 0;
    text-align:center;
  }
</style>
