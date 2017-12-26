<template>
  <div class="gamegoaldata">
    <div class="well well-sm">
      <i class="sm-line"></i>
          比分细节
    </div>
    <div class="nodata-mess" v-if="gameinfo.AScore==undefined || gameinfo.AScore==''">暂无数据</div> 
    <div class="nodata-mess" v-else-if="gameinfo.AScore[0] == 0">暂无数据</div>   
    <div class="zhedie-con" v-else>
        <el-row :gutter="3" class="table-header little-word">
          <el-col :span="2"><div class="grid-content fc"></div></el-col>
          <el-col :span="5"><div class="grid-content fc"></div></el-col>
          <el-col :span="3" class="width-c margin-left"><div class="grid-content fc ">1节</div></el-col>
          <el-col :span="3" class="width-c"><div class="grid-content fc">2节</div></el-col>
          <el-col :span="3" class="width-c"><div class="grid-content fc">3节</div></el-col>
          <el-col :span="3" class="width-c"><div class="grid-content fc">4节</div></el-col>
          <el-col :span="3" class="width-c"><div class="grid-content fc">加时</div></el-col>
          <el-col :span="3" class="width-c"><div class="grid-content fc">总分</div></el-col>
        </el-row>          
        <div class="table">
          <el-row :gutter="3" class="list">
            <el-col :span="2">
              <div class="grid-content fc">
                <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + gameinfo.HomeTeam.Id + '.jpg'" class="img">
              </div>                 
            </el-col>
            <el-col :span="6">
              <div class="grid-content name">
              <p v-if="gameinfo.HomeTeam.ShortName!=''">{{gameinfo.HomeTeam.ShortName}}(主)</p>
              <p v-else>{{gameinfo.HomeTeam.Name}}(主)</p>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.AScore[1]}}
              </div>                 
            </el-col>                     
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.AScore[2]}}
              </div>                 
            </el-col> 
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.AScore[3]}}
              </div>                 
            </el-col>             
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.AScore[4]}}
              </div>                 
            </el-col>             
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.AScore[5]}}
              </div>                 
            </el-col>             
            <el-col :span="3">
              <div class="grid-content fc w_red">
                {{gameinfo.AScore[0]}}
              </div>                 
            </el-col>             
          </el-row>
          <el-row :gutter="3" class="list">
            <el-col :span="2">
              <div class="grid-content fc">
                <img :src="'http://static.caishencai.com/tiyu/images/teamInfo/' + gameinfo.AwayTeam.Id + '.jpg'" class="img">
              </div>                 
            </el-col>
            <el-col :span="6">
              <div class="grid-content name">
              <p v-if="gameinfo.AwayTeam.ShortName!=''">{{gameinfo.AwayTeam.ShortName}}(主)</p>
              <p v-else>{{gameinfo.AwayTeam.Name}}(主)</p>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.BScore[1]}}
              </div>                 
            </el-col>                     
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.BScore[2]}}
              </div>                 
            </el-col> 
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.BScore[3]}}
              </div>                 
            </el-col>             
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.BScore[4]}}
              </div>                 
            </el-col>             
            <el-col :span="3">
              <div class="grid-content fc">
                {{gameinfo.BScore[5]}}
              </div>                 
            </el-col>             
            <el-col :span="3">
              <div class="grid-content fc w_red">
                {{gameinfo.BScore[0]}}
              </div>                 
            </el-col>             
          </el-row>          
        </div>
    </div>
       
  </div>
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,  // 获得路由传过来的id值
      'gameinfo': {},
      'AScore': ''
    };
  },
  created () {
    var gameinfoUrl = 'live/Api/Api/index/cc/b_gameinfo/id/' + this.matchid;
    this.$http.jsonp(gameinfoUrl).then(response => {
      response = response.body;
      this.gameinfo = response;
    }, response => {
    });
  },
  computed: {
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
w_red{
  color:#f32b1b;
}
.little-word{
  font-size:12px;
  color:#b8bec7;
}
.fc{
  text-align:center;
}
.zhedie-con{
  width:100%;
  height:auto;
  overflow:hidden;
}
.margin-left{
  margin-left:33%;
}
.width-c{
  width:11%;
}
.well-sm{
    background:#f5f5f5;
    padding:8px 10px;
    font-size:12px;
  i.sm-line{
    width:2px;
    height:15px;
    background: #f32b1b;
    display: inline-block;
    vertical-align: middle;
  }
}
.nodata-mess{
  margin:100px 0;
  text-align:center;
}
.sk-box1{
  widdth:100%;
  padding-bottom:15px;
}
.f12{
  font-size:12px;
}
.f13{
  font-size:13px;
}
.table{
  font-size:14px;
  .list{
  padding:5px 0;
  &:first-child{
     padding-top:0;
    }
  }
}
.table-header {
  border-bottom:1px solid #f4f4f4;
  padding:10px 0;
}
.table{
  padding:15px 10px; 
  .list{
    padding:15px 0;
    display:flex;
    justify-content:center;
    align-items:center; 
    &:last-child {
      border-bottom:0;
    }
    .img{
    width:25px;
    height:25px;
    display:inline-block;
    align-items:center;
    }
    .name{
    font-size:12px;
    }
  }
}
</style>
