<template>
  <div class="standing">
    <div class="" v-if="Area==1">
      <div>
        <div class="tab-box">
          <ul>
            <li v-for="(name, num, index) in AreaName" :key="index" @click="tabExent2(index)" :class="{'active': index == tabnum}">{{name}}</li>      
          </ul>      
        </div>
        <div class="zhegie-wrap">
          <div class="tab-item" v-for="(Standing, index, num) in Standings" :key="num" v-show="num==tabnum">
            <div class="nodata-mess" v-if="Standing==''">暂无数据</div>  
            <div calss="zhedie-box" v-else>
              <div class="zhedie-item zhedie-group">
                  <div class="zhedie-con">
                    <el-row :gutter="5" class="table-header little-word" >
                      <el-col :span="5" class="fc"><div class="grid-content  name">球队</div></el-col>
                      <el-col :span="2" class="fc"><div class="grid-content">连胜</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(场)</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(分区)</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(分岸)</div></el-col>
                      <el-col :span="2" class="fc"><div class="grid-content">胜率</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(主)</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(客)</div></el-col>                      
                    </el-row>          
                    <div class="table">
                      <el-row :gutter="5" v-for="(standing, index2) in Standing" :key='index2' class="list">
                        <el-col :span="5">
                          <div class="grid-content fc teamname" :teamname="teamName"><a :href="'#/lq/team/teamsc/' + standing[0]">{{teamName[index2]}}</a></div>           
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content fc little-word">{{standing[16]}}</div>      
                        </el-col>                   
                        <el-col :span="3">
                          <div class="grid-content fc little-word"><span>{{standing[2]}}</span> / <span>{{standing[3]}}</span></div>
                        </el-col>               
                        <el-col :span="4">
                          <div class="grid-content fc little-word"><span>{{standing[8]}}</span> / <span>{{standing[9]}}</span></div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content fc little-word"><span>{{standing[6]}}</span> / <span>{{standing[7]}}</span></div>
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content fc little-word">{{standing[4]}}</div>      
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content fc little-word"><span>{{standing[10]}}</span> / <span>{{standing[11]}}</span></div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content fc little-word"><span>{{standing[12]}}</span> / <span>{{standing[13]}}</span></div>
                        </el-col>
                      </el-row>
                    </div>     
                  </div>                  
              </div>
            </div>    
          </div>
        </div>
      </div>        
    </div>
     <!--1-->
    <div class="" v-else-if="Area==0">
      <div>
        <div class="zhegie-wrap">
          <div class="tab-item">
            <div calss="zhedie-box">
              <div class="zhedie-item zhedie-group">
                  <div class="zhedie-con">
                    <el-row :gutter="5" class="table-header little-word" >
                      <el-col :span="2" class="fc"><div class="grid-content">排名</div></el-col>
                      <el-col :span="7" class="fc"><div class="grid-content  name">球队</div></el-col>
                      <el-col :span="2" class="fc"><div class="grid-content">积分</div></el-col>
                      <el-col :span="2" class="fc"><div class="grid-content">分差</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负</div></el-col>
                      <el-col :span="2" class="fc"><div class="grid-content">胜率</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(主)</div></el-col>
                      <el-col :span="3" class="fc"><div class="grid-content">胜/负(客)</div></el-col>                      
                    </el-row>          
                    <div class="table" v-if="Standings!=undefined && Standings.length!=0">
                      <el-row :gutter="5" v-for="(standing, index) in Standings" :key='index' class="list">
                        <el-col :span="2">
                          <div class="grid-content fc little-word">{{standing[0]}}</div>           
                        </el-col>                      
                        <el-col :span="7">
                          <div class="grid-content fc teamname" :teamname="teamName2"><a :href="'#/lq/team/teamsc/' + standing[1]">{{teamName2[index]}}</a></div>           
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content fc little-word">{{standing[14]}}</div>      
                        </el-col>                   
                        <el-col :span="2">
                          <div class="grid-content fc little-word"><span>{{standing[9]}}</span></div>
                        </el-col>               
                        <el-col :span="3">
                          <div class="grid-content fc little-word"><span>{{standing[4]}}</span> / <span>{{standing[5]}}</span></div>
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content fc little-word">{{standing[6]}}</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content fc little-word"><span>{{standing[10]}}</span> / <span>{{standing[11]}}</span></div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content fc little-word"><span>{{standing[12]}}</span> / <span>{{standing[13]}}</span></div>
                        </el-col>
                      </el-row>
                    </div> 
                    <div class="nodata-mess" v-else>暂无数据</div>   
                  </div>                  
              </div>
            </div>    
          </div>
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
      'compid': this.$route.params.compid,
      'compstandings': {},
      'Standings': {},
      'Teams': {},
      'Area': '',
      'AreaName': {},
      'msg': '',
      'tabnum': 0
    };
  },
  created () {
    var standingUrl = 'live/Api/Api/index/cc/b_competitionstandings/id/' + this.compid;
    this.$http.jsonp(standingUrl).then(response => {
      response = response.body;
      this.compstandings = response;
      this.Standings = this.compstandings.Standings;
      this.Area = this.compstandings.Area;
      if (this.Area === 1) {
        this.AreaName = this.compstandings.AreaName;
      }
    }, response => {
    });
  },
  computed: {
    teamName () {
      var teamName = [];
      if (this.Area === 1) {
        for (var i in this.Standings) {
         i = (this.tabnum + 1);
         var Standing = this.Standings[i];
          if (Standing !== '') {
            for (var fq in Standing) {
               var teamname = Standing[fq][1].replace(/'/, '').replace(/'/, '');
               teamName.push(teamname);
            }
          }
        }
        return teamName;
      }
    },
    teamName2 () {
      var teamName = [];
      if (this.Area === 0) {
        if (this.Standings !== undefined && this.Standings.length !== 0) {
          for (var i in this.Standings) {
           var Standing = this.Standings[i];
            var teamname = Standing[2].replace(/'/, '').replace(/'/, '');
            teamName.push(teamname);
          }
          return teamName;
        }
      }
    }
  },
  methods: {
    tabExent2 (index) {
      this.tabnum = index;
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
.tab-box{
  background:#f5f5f5;
  width:96%;
  height:auto;
  overflow:hidden;
  padding:0 2%;
  li{
    text-align:center;
    padding:5px 0;
    margin:5px 0;
    float:left;
    width:100%/2;
    border-radius: 4px 4px 0 0;
    &.active{
      color:#fff;
      background:#428bca;
    }
  }
}
.title{
  font-size:14px;
  padding: 5px 10px 0;
}
.table-header {
  border-bottom:1px solid #f4f4f4;
  padding:10px 0;
}
.table{
  padding:5px 10px;
  font-size:14px;
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
    img{
      width:22px;
      height:22px;
      align-items:center;
      display:flex;
    }
  }
}
.zhedie-group{
  .zhedie-header{
    padding:4px 10px;
    background:#efeff4;
    font-size:12px;
  }
}
.teamname{
  font-size:12px;
}
</style>
