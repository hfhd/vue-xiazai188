<template>
  <div class="competition">
    <div class="gameTop"  v-if="comInfos!=undefined && comInfos.id!=undefined">
      <v-headerdetail></v-headerdetail>
      <el-row class="teaminfo-box">
        <el-col :span="24">
          <div class="grid-content right">
              <p class="pic"><img :src="'http://static.caishencai.com/tiyu/images/zq-competition/' + comInfos.id + '.jpg'"></p>
              <p class="name" v-if="comInfos.ShortName!=''">{{comInfos.ShortName}}</p><p class="name" v-else>{{comInfos.Name}}</p>
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
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div> 
    <div v-else class="nodata-mess">暂无信息</div>
  </div>
</template>

<script>
import headerDetail from '../../../components/header/headerDetail';

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
  },
  components: {
    'v-headerdetail': headerDetail
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
