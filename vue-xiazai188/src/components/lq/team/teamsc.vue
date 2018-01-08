<template>
  <div class="teamsc">
    <div v-if="TeamInfos!=undefined">
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
              球队信息        
          </div> 
          <div class="zhedie-con teaminfo" >    
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">英文名:</div></el-col>
              <el-col :span="18"><div class="grid-content">{{TeamInfos.EnName}}</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">城市:</div></el-col>
              <el-col :span="18"><div class="grid-content" v-if="TeamInfos.City!=undefined && TeamInfos.City!=''">{{TeamInfos.City}}</div><div v-else>--</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">球场:</div></el-col>
              <el-col :span="18"><div class="grid-content" v-if="TeamInfos.Arena!=undefined && TeamInfos.Arena!='' && TeamInfos.Arena.Name!=undefined && TeamInfos.Arena.Name!=''">{{TeamInfos.Arena.Name}}</div><div v-else>--</div></el-col>
            </el-row> 
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">容量:</div></el-col>
              <el-col :span="18"><div class="grid-content" v-if="TeamInfos.Arena!=undefined && TeamInfos.Arena!='' && TeamInfos.Arena.Capacity!=undefined && TeamInfos.Arena.Capacity!=''">{{TeamInfos.Arena.Capacity}}</div><div v-else>--</div></el-col>
            </el-row> 
            <el-row :gutter="10" v-if="Coach!=undefined && Coach!=''">
              <el-col :span="6"><div class="grid-content little-word" v-if="Coach.Position!=undefined && Coach.Position!=''">{{Coach.Position}}</div><div v-else  class="grid-content little-word" >--</div></el-col>
              <el-col :span="18"><div class="grid-content" v-if="Coach.Name!=undefined && Coach.Name!=''">{{Coach.Name}}</div><div v-else>--</div></el-col>
            </el-row> 
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">官网:</div></el-col>
              <el-col :span="18"><a :href="TeamInfos.website" class="grid-content w_blue" v-if="TeamInfos.Website!=undefined && TeamInfos.Website!=''">{{TeamInfos.Website}}</a><div v-else>--</div></el-col>
            </el-row> 
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">Email:</div></el-col>
              <el-col :span="18"><div class="grid-content" v-if="TeamInfos.Email!=undefined && TeamInfos.Email!=''">{{TeamInfos.Email}}</div><div v-else>--</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6"><div class="grid-content little-word">成立时间:</div></el-col>
              <el-col :span="18"><div class="grid-content" v-if="TeamInfos.EstablishDate!=undefined && TeamInfos.EstablishDate!=''">{{TeamInfos.EstablishDate}}</div><div v-else>--</div></el-col>
            </el-row>                                                          
          </div>  
        </div>
      </div>
      <div class="zhegie-wrap">
        <div calss="zhedie-box">
          <div class="well well-sm">
            <i class="sm-line"></i>
              球队简介        
          </div> 
          <div class="zhedie-con teamintro" v-if="TeamInfos.Intro!=undefined && TeamInfos.Intro!=''" >    
          <p>{{Intro}}</p>                                                        
          </div>
          <div class="nodata-mess" v-else>暂无简介</div>  
        </div>
      </div>   
    </div>
    <div class="nodata-mess" v-else>暂无球队信息</div>      
  </div>
</template>

<script>
export default {
  data () {
    return {
      'teamid': this.$route.params.teamid,
      'teaminfo': {},
      'TeamInfos': {},
      'Coach': {},
      'Intro': ''
    };
  },
  created () {
    var teaminforUrl = 'live/Api/Api/index/cc/b_teaminfo/id/' + this.teamid;
    this.$http.jsonp(teaminforUrl).then(response => {
      response = response.body;
      this.teaminfo = response;
      this.TeamInfos = this.teaminfo.TeamInfo;
      this.Coach = this.teaminfo.Coach;
      if (this.Coach !== undefined && this.Coach !== '') {
        this.Coach = this.Coach[0];
      }
      if (this.TeamInfos.Intro !== undefined && this.TeamInfos.Intro !== '') {  // 用浏览器内部转换器实现html解码
        var text = this.TeamInfos.Intro;
        var temp = document.createElement('div');
        temp.innerHTML = text;
        this.Intro = temp.innerText || temp.textContent;
        temp = null;
      }
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
.zhedie-con{
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
.w_blue{
  color:#428bca;
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
.teaminfo{
  padding:10px;
  .el-row{
  padding:4px 0;
  font-size:14px;
  }
}
.teamintro{
  padding:10px;
  line-height:30px;
  font-size:14px;
  text-indent:2rem;
}
</style>
