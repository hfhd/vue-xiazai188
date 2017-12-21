<template>
  <div class="standing">
    <div class="" v-if="flag==1">
      <div v-for="(Standing, index) in Standings" :key="index">
        <div class="tab-box">
          <ul>
            <li @click="tabExent('a')" :class="{'active': tabExtentShowa}">总</li>
            <li @click="tabExent('b')" :class="{'active': tabExtentShowb}">主</li>
            <li @click="tabExent('c')" :class="{'active': tabExtentShowc}">客</li>          
          </ul>      
        </div>
        <div class="zhegie-wrap">
          <div class="tab-item" v-show="tabExtentShowa"><!--总-->
            <div calss="zhedie-box"> 
              <div class="zhedie-con">
                <el-row :gutter="6" class="table-header little-word" >
                  <el-col :span="9" class="fc"><div class="grid-content  name">球队</div></el-col>
                  <el-col :span="2" class="fc"><div class="grid-content">赛</div></el-col>
                  <el-col :span="5" class="fc"><div class="grid-content">胜/平/负</div></el-col>
                  <el-col :span="4" class="fc"><div class="grid-content">进/失</div></el-col>
                  <el-col :span="4" class="fc"><div class="grid-content">积分/扣分</div></el-col>
                </el-row>          
                <div class="table" v-if="Standing.Total!=undefined && Standing.Total.length!=0">
                  <el-row :gutter="6" v-for="(Total, index) in Standing.Total" :key='index' class="list">
                    <el-col :span="1">
                      <div class="grid-content fc little-word">{{index+1}}</div>                 
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + Total.Team +'.jpg'">
                      </div>                 
                    </el-col>                   
                    <el-col :span="8">
                      <div class="grid-content" v-if="Teams[Total.Team].ShortName!=undefined && Teams[Total.Team].ShortName!=''">
                        {{Teams[Total.Team].ShortName}}
                      </div>
                      <div class="grid-content" v-else>Teams[Total.Team].Name</div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fr score">{{Total.Data[0]}}</div>
                    </el-col>                  
                    <el-col :span="6">
                      <div class="grid-content fr score"><span>{{Total.Data[1]}}</span> / <span>{{Total.Data[2]}}</span> / <span>{{Total.Data[3]}}</span></div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fr score"><span>{{Total.Data[4]}}</span> / <span>{{Total.Data[5]}}</span></div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fr score"><span>{{Total.Data[6]}}</span> / <span>{{Total.Data[7]}}</span></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="nodata-mess" v-else>暂无数据</div>         
              </div>
            </div>
          </div>
           <!--总 over-->
          <div class="tab-item" v-show="tabExtentShowb"><!--主-->
            <div calss="zhedie-box"> 
              <div class="zhedie-con">
                <el-row :gutter="10" class="table-header little-word" >
                  <el-col :span="9" class="fc"><div class="grid-content  name">球队</div></el-col>
                  <el-col :span="2" class="fc"><div class="grid-content">赛</div></el-col>
                  <el-col :span="5" class="fc"><div class="grid-content">胜/平/负</div></el-col>
                  <el-col :span="4" class="fc"><div class="grid-content">进/失</div></el-col>
                  <el-col :span="4" class="fc"><div class="grid-content">积分/扣分</div></el-col>
                </el-row>          
                <div class="table" v-if="Standing.Home!=undefined && Standing.Home.length!=0">
                  <el-row :gutter="6" v-for="(Home, index) in Standing.Home" :key='index' class="list">
                    <el-col :span="1">
                      <div class="grid-content fc little-word">{{index+1}}</div>                 
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + Home.Team +'.jpg'">
                      </div>                 
                    </el-col>                   
                    <el-col :span="8">
                      <div class="grid-content" v-if="Teams[Home.Team].ShortName!=undefined && Teams[Home.Team].ShortName!=''">
                        {{Teams[Home.Team].ShortName}}
                      </div>
                      <div class="grid-content" v-else>Teams[Home.Team].Name</div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fr score">{{Home.Data[0]}}</div>
                    </el-col>                  
                    <el-col :span="6">
                      <div class="grid-content fr score"><span>{{Home.Data[1]}}</span> / <span>{{Home.Data[2]}}</span> / <span>{{Home.Data[3]}}</span></div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fr score"><span>{{Home.Data[4]}}</span> / <span>{{Home.Data[5]}}</span></div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fr score"><span>{{Home.Data[6]}}</span> / <span>{{Home.Data[7]}}</span></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="nodata-mess" v-else>暂无数据</div>         
              </div>
            </div>
          </div>
           <!--主 over-->
          <div class="tab-item" v-show="tabExtentShowc"><!--客-->
            <div calss="zhedie-box"> 
              <div class="zhedie-con">
                <el-row :gutter="6" class="table-header little-word" >
                  <el-col :span="9" class="fc"><div class="grid-content  name">球队</div></el-col>
                  <el-col :span="2" class="fc"><div class="grid-content">赛</div></el-col>
                  <el-col :span="5" class="fc"><div class="grid-content">胜/平/负</div></el-col>
                  <el-col :span="4" class="fc"><div class="grid-content">进/失</div></el-col>
                  <el-col :span="4" class="fc"><div class="grid-content">积分/扣分</div></el-col>
                </el-row>          
                <div class="table" v-if="Standing.Away!=undefined && Standing.Away.length!=0">
                  <el-row :gutter="6" v-for="(Away, index) in Standing.Away" :key='index' class="list">
                    <el-col :span="1">
                      <div class="grid-content fc little-word">{{index+1}}</div>                 
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc">
                        <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + Away.Team +'.jpg'">
                      </div>                 
                    </el-col>                   
                    <el-col :span="8">
                      <div class="grid-content" v-if="Teams[Away.Team].ShortName!=undefined && Teams[Away.Team].ShortName!=''">
                        {{Teams[Away.Team].ShortName}}
                      </div>
                      <div class="grid-content" v-else>Teams[Away.Team].Name</div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content fc score">{{Away.Data[0]}}</div>
                    </el-col>                  
                    <el-col :span="6">
                      <div class="grid-content fc score"><span>{{Away.Data[1]}}</span> / <span>{{Away.Data[2]}}</span> / <span>{{Away.Data[3]}}</span></div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fc score"><span>{{Away.Data[4]}}</span> / <span>{{Away.Data[5]}}</span></div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fc score"><span>{{Away.Data[6]}}</span> / <span>{{Away.Data[7]}}</span></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="nodata-mess" v-else>暂无数据</div>         
              </div>
            </div>
          </div>
           <!--客 over-->                      
        </div>        
      </div> 
    </div>
    <!--主客场分类结束-->
    <div class="" v-if="flag==2">
      <div>
        <div class="tab-box">
          <ul>
            <li v-for="(flag, num, index) in Standings" :key="index" @click="tabExent2(index)" :class="{'active': index == tabnum}">{{num}}</li>      
          </ul>      
        </div>
        <div class="zhegie-wrap">
          <div class="tab-item" v-for="(Standing, index, num) in Standings" :key="num" v-show="num==tabnum">
            <div calss="zhedie-box" v-if="Standing.Total!=undefined && Standing.Total.length!=0">
              <div class="zhedie-item zhedie-group" v-for="(group, num) in groupArrays">
                  <div class="zhedie-header" >{{group.Group}}组</div>
                  <div class="zhedie-con">
                    <el-row :gutter="6" class="table-header little-word" >
                      <el-col :span="9" class="fc"><div class="grid-content  name">球队</div></el-col>
                      <el-col :span="2" class="fc"><div class="grid-content">赛</div></el-col>
                      <el-col :span="5" class="fc"><div class="grid-content">胜/平/负</div></el-col>
                      <el-col :span="4" class="fc"><div class="grid-content">进/失</div></el-col>
                      <el-col :span="4" class="fc"><div class="grid-content">积分/扣分</div></el-col>
                    </el-row>          
                    <div class="table" v-if="group.data!=undefined && group.data.length!=0">
                      <el-row :gutter="6" v-for="(Total, index) in group.data" :key='index' class="list">
                        <el-col :span="1">
                          <div class="grid-content fc little-word">{{index+1}}</div>                 
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content fc">
                            <img :src="'http://static.caishencai.com/tiyu/images/zq-team/' + Total.Team +'.jpg'">
                          </div>                 
                        </el-col>                   
                        <el-col :span="8">
                          <div class="grid-content" v-if="Teams[Total.Team].ShortName!=undefined && Teams[Total.Team].ShortName!=''">
                            {{Teams[Total.Team].ShortName}}
                          </div>
                          <div class="grid-content" v-else>Teams[Total.Team].Name</div>
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content fr score">{{Total.Data[0]}}</div>
                        </el-col>                  
                        <el-col :span="6">
                          <div class="grid-content fr score"><span>{{Total.Data[1]}}</span> / <span>{{Total.Data[2]}}</span> / <span>{{Total.Data[3]}}</span></div>
                        </el-col>
                        <el-col :span="5">
                          <div class="grid-content fr score"><span>{{Total.Data[4]}}</span> / <span>{{Total.Data[5]}}</span></div>
                        </el-col>
                        <el-col :span="5">
                          <div class="grid-content fr score"><span>{{Total.Data[6]}}</span> / <span>{{Total.Data[7]}}</span></div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="nodata-mess" v-else>暂无数据</div>         
                  </div>                  
              </div>
            </div> 
            <div class="nodata-mess" v-else>暂无数据</div>        
          </div>
        </div>
      </div>        
    </div>
     <!--qita 分类结束-->
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
      'standingTotals': {},
      'groupArrays': [],
      'flag': '',
      'activeName': 'first',
      'tabExtentShowa': true,
      'tabExtentShowb': false,
      'tabExtentShowc': false,
      'tabnum': 0
    };
  },
  created () {
    var standingUrl = 'live/Api/Api/index/cc/competitionstanding/id/' + this.compid;
    this.$http.jsonp(standingUrl).then(response => {
      response = response.body;
      this.compstandings = response;
      this.Standings = this.compstandings.Standing;
      this.Teams = this.compstandings.Team;
      if (this.Standings !== undefined && this.Standings.length !== 0) {
        for (var index in this.Standings) {
            var rankTotal = this.Standings[index]['Total'];
            var rankHome = this.Standings[index]['Home'];
            if (rankHome !== undefined && rankTotal !== undefined) {
                this.flag = 1;
                break;
            } else if (rankHome === undefined && rankTotal !== undefined) {
              for (var item in rankTotal) {
                  if (rankTotal[item]['Group'] !== undefined) {
                   this.flag = 2;
                  }
              }
              break;
          }
        }
      };
      if (this.flag === 2) {
        for (var index4 in this.Standings) {
          this.standingTotals = this.Standings[index4]['Total'];
          var groups = {};
          for (var index3 in this.standingTotals) {
            var i = this.standingTotals[index3];
            if (!groups[i.Group]) {
              this.groupArrays.push({
                Group: i.Group,
                Teamid: i.Team,
                data: [i]
              });
              groups[i.Group] = i;
            } else {
              for (var index2 in this.groupArrays) {
                var groupArray = this.groupArrays[index2];
                // console.log(groupArray);
                if (groupArray.Group === i.Group) {
                  groupArray.data.push(i);
                  break;
                }
              }
            }
          }
          // console.log(this.groupArrays);
        }
      }
    }, response => {
    });
  },
  computed: {
  },
  methods: {
    tabExent (lable) {
      if (lable === 'a') {
        this.tabExtentShowa = true;
        this.tabExtentShowb = false;
        this.tabExtentShowc = false;
      } else if (lable === 'b') {
        this.tabExtentShowa = false;
        this.tabExtentShowb = true;
        this.tabExtentShowc = false;
      } else if (lable === 'c') {
        this.tabExtentShowb = false;
        this.tabExtentShowc = true;
        this.tabExtentShowa = false;
      }
    },
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
    width:100%/3;
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
</style>
