<template>
  <div class="shooter">
    <div>
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
                射手榜
          </div> 
          <div class="zhedie-con" v-if="Shooters!=undefined && Shooters.length!=0">
              <el-row :gutter="10" class="table-header little-word">
                <el-col :span="17"><div class="grid-content  name">球员/球队</div></el-col>
                <el-col :span="7"><div class="grid-content fr">进球/点球</div></el-col>
              </el-row>          
              <div class="table">
                <el-row :gutter="10" v-for="(Shooter, index) in Shooters" :key='index' class="list">
                  <el-col :span="3">
                    <div class="grid-content fc little-word">
                      {{index+1}}
                    </div>                 
                  </el-col>                  
                  <el-col :span="14">
                    <div class="grid-content ">
                    <p >{{Shooter.PlayerName}}</p>
                    <p class="little-word">{{Shooter.TeamName}}</p>
                    </div>
                  </el-col>                   
                  <el-col :span="7">
                    <div class="grid-content fr score">
                      <span>{{Shooter.Data[0]}}</span> / <span>{{Shooter.Data[1]}}</span>       
                    </div>
                  </el-col>
                </el-row>
              </div>
          </div>
          <div class="nodata-mess" v-else>暂无数据</div>    
        </div>
      </div>
    </div>     
  </div>
</template>

<script>
export default {
  data () {
    return {
      'compid': this.$route.params.compid,
      'compshooters': {},
      'Shooters': {}
    };
  },
  created () {
    var shooterUrl = 'live/Api/Api/index/cc/competitionshooter/id/' + this.compid;
    this.$http.jsonp(shooterUrl).then(response => {
      response = response.body;
      this.compshooters = response;
      this.Shooters = this.compshooters.Shooter;
    }, response => {
    });
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
.table-header{
  padding:10px;
}
.table{
  padding:10px;
  font-size:14px;
  .list{
  padding:5px 0;
  &:first-child{
     padding-top:0;
    }
  }
  .sg{
    color:#fff;
    text-align:center;
  }
  .bglittle{
    text-align:center; 
    background:#f5f5f5;
    padding:6px; 
  }
}
.title{
  font-size:14px;
  padding: 5px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
  .name{
  padding-left:17.5%;
  }
}
.table{
  padding:15px 10px; 
  .list{
    padding:15px 0;
    border-bottom:1px solid #f4f4f4;
    display:flex;
    justify-content:center;
    align-items:center; 
    &:last-child {
      border-bottom:0;
    }
    .score{
      padding-right:10px;
    }
  }
}
</style>
