<template>
  <div class="zs-hdaoddsinfo">
    <div class="zhegie-wrap">
      <div calss="zhedie-box">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                亚盘列表        
            </div>
          </div>
          <div class="zhedie-con">
            <div class="tab-item">
              <div>
                <el-row :gutter="10" class="table-header little-word">
                  <el-col :span="6"><div class="grid-content fc">公司</div></el-col>
                  <el-col :span="9"><div class="grid-content fc">初盘</div></el-col>
                  <el-col :span="9"><div class="grid-content fc">即时</div></el-col>
                </el-row>
                <el-row :gutter="10" class="table-header little-word">
                  <el-col :span="6"><div class="grid-content fc">公司</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">主赔</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">客赔</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">让分</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">主赔</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">客赔</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">让分</div></el-col>
                </el-row>
                <div class="table-body" v-if="Datass!=undefined && Datass.length!=0">
                  <div v-for="(DatasS, str, index) in lastDatas" :key="index" class="fl listL">
                    <div v-for="(Datas, str, index2) in DatasS" :key="index2" class="pl-list" @click="ShowLogs(Datas.Cid)">
                      <el-row :gutter="10" >
                        <el-col :span="24" class="company"><div class="grid-content fc w_blue" :compname="CompName">{{CompName[index2]}}</div></el-col>
                        </el-row>
                    </div>
                  </div>
                  <div v-for="(DatasS, str, index) in firstDatas" :key="index" class="fl listM">
                    <div v-for="(Datas, str, index2) in DatasS" :key="index2" class="pl-list" @click="ShowLogs(Datas.Cid)">
                      <el-row :gutter="10" >
                        <el-col :span="8">
                          <div class="grid-content fc" >
                            <span>{{Datas.Data[0]}}</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content fc">
                            <span>{{Datas.Data[1]}}</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content fc">
                            <span>{{Datas.Data[2]}}</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div v-for="(DatasS, str, index) in lastDatas" :key="index" class="fl listR">
                    <div v-for="(Datas, str, index2) in DatasS" :key="index2" class="pl-list" @click="ShowLogs(Datas.Cid)">
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <div class="grid-content fc" >
                            <span>de{{Datas.Data[0]}}</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content fc">
                            <span>de{{Datas.Data[1]}}</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content fc">
                            <span>de{{Datas.Data[2]}}</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>          
                </div>
                <div class="nodata-mess" v-else>暂无数据</div>
              </div>
            </div>
          </div>
          <div class="pl-dialog">
            <el-dialog :title="CurCName + ' 亚盘变化'" :visible.sync="dialogTableVisible" top='10px' width="96%" open="LoadLogs" :cidlog="cidLog">
               <div>
                <el-row :gutter="4" class="table-header little-word">
                  <el-col :span="7"><div class="grid-content fc">公司</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">主赔</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">客赔</div></el-col>
                  <el-col :span="3"><div class="grid-content fc">让分</div></el-col>
                  <el-col :span="8"><div class="grid-content fc">变化时间</div></el-col>
                </el-row>
                <div class="table-body" v-if="Datass!=undefined && Datass.length!=0">
                  <div>
                    <div  v-if="CurLogs!=undefined && CurLogs.length!=0">
                      <el-row :gutter="4" class="pl-list" :key="index" v-for="(Logs, index) in CurLogs" >
                        <el-col :span="7" class="company" ><div class="grid-content fc w-blue" v-if="CurCName!=''">{{CurCName}}</div><div v-else>--</div></el-col>
                        <el-col :span="3">
                          <div class="grid-content fc" v-if="Logs.Data[0]!=undefined && Logs.Data[0]!=''">{{Logs.Data[0]}}</div>
                          <div class="fc" v-else>--</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content fc" v-if="Logs.Data[1]!=undefined && Logs.Data[1]!=''">{{Logs.Data[1]}}</div>
                          <div class="fc" v-else>--</div>
                        </el-col>  
                        <el-col :span="3">
                          <div class="grid-content fc" v-if="Logs.Data[2]!=undefined && Logs.Data[2]!=''">{{Logs.Data[2]}}%</div>
                          <div class="fc" v-else>--</div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content fc" :pldate="plDate">{{plDate[index] | filterdatatime}}</div>
                        </el-col>                                                          
                      </el-row>
                    </div>
                  </div>
                </div>
                <div class="nodata-mess" v-else>暂无数据</div>                
              </div>               
            </el-dialog>             
          </div>   
      </div>
    </div>     
  </div>
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,
      'hdaoddsinfo': {},
      'Datass': {},
      'lastDatas': [],
      'firstDatas': [],
      'dialogTableVisible': false,
      'cidLog': '',
      'CurLogs': [],
      'Logs': [],
      'CurCName': ''
    };
  },
  created () {
    var hdaoddsinfoUrl = 'live/Api/Api/index/cc/b_ahoddsinfo/id/' + this.matchid;
    this.$http.jsonp(hdaoddsinfoUrl).then(response => {
      response = response.body;
      this.hdaoddsinfo = response;
      this.Datass = this.hdaoddsinfo.Datas;
      var datas = this.Datass;
      var temp = {};
      var temp3 = {};
      for (var i = datas.length - 1; i >= 0; i--) {
        if (temp[datas[i].Cid] === 1) {
          continue;
        } else {
          temp[datas[i].Cid] = 1;
          temp3[datas[i].Cid] = datas[i];
        }
      }
      this.lastDatas.push(temp3);
      temp3 = {};
      var temp2 = {};
      for (var j = 0; j < datas.length; j++) {
        if (temp2[datas[j].Cid] === 1) {
          continue;
        } else {
          temp2[datas[j].Cid] = 1;
          temp3[datas[j].Cid] = datas[j];
        }
      }
      this.firstDatas.push(temp3);
    }, response => {});
  },
  filters: {
    filterdatatime: function (input) { // 时间过滤器 template中{{ 需要过滤的值 | 过滤器表达式}}
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
      var minutes = d.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    }
  },
  computed: {
    CompName () {
      var ComNameArray = [];
      var Datas = [];
      for (var i = 0; i < this.lastDatas.length; i++) {
        Datas = this.lastDatas[i];
      }
      for (var j in Datas) {
        var ComName = Datas[j].Cid;
        switch (ComName) {
        case '0':
        ComName = '澳門';
        break;
        case '1':
        ComName = '威廉希爾';
        break;
        case '2':
        ComName = '易勝博';
        break;
        case '3':
        ComName = '12BET';
        break;
        case '4':
        ComName = 'S2';
        break;
        case '5':
        ComName = '立博';
        break;
        case '6':
        ComName = '188BET';
        break;
        case '7':
        ComName = '10BET';
        break;
        default:
        ComName = '暂无信息';
        break;
        }
      ComNameArray.push(ComName);
      }
      return ComNameArray;
    },
    plDate () {
      var pldate = [];
      var Date1 = '';
      for (var i = 0; i < this.CurLogs.length; i++) {
        if (typeof (this.CurLogs[i].Date.value) === 'undefined') {
          Date1 = parseInt(this.CurLogs[i].Date);
        } else {
          Date1 = parseInt(this.CurLogs[i].Date.value);
        };
      var strDate = new Date(Date1);
      pldate.push(strDate);
      };
      return pldate;
    }
  },
  methods: {
    ShowLogs (Cid) {
      this.dialogTableVisible = true;
      this.cidLog = Cid;
      var ComName = '';
      switch (Cid) {
       case '0':
       ComName = '澳門';
       break;
       case '1':
       ComName = '威廉希爾';
       break;
       case '2':
       ComName = '易勝博';
       break;
       case '3':
       ComName = '12BET';
       break;
       case '4':
       ComName = 'S2';
       break;
       case '5':
       ComName = '立博';
       break;
       case '6':
       ComName = '188BET';
       break;
       case '7':
       ComName = '10BET';
       break;
       default:
       ComName = '暂无信息';
       break;
      }
      this.CurCName = ComName;
      if (this.Logs[Cid] !== undefined) {
        this.CurLogs = this.Logs[Cid];
        return;
      }
     this.Logs[Cid] = [];
      for (var index = this.Datass.length - 1; index >= 0; index--) {
        if (this.Datass[index].Cid === this.cidLog) {
        console.log(this.Datass[index]);
          this.Logs[Cid].push(this.Datass[index]);
        }
      }
      this.CurLogs = this.Logs[Cid];
      console.log(this.Logs[Cid]);
      // this.CurLogs = this.CurLogs.reverse();
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
.zhedie-con{
  .hd{
    font-size:14px;
    padding: 10px 10px 0;
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
.table-body{
  padding:5px 0;
  overflow:hidden;
  .el-row{
    padding: 15px 0;
    text-align:center;
    font-size:13px;
    width:100%;
  }
}
.pl-list{
  display:flex;
  border-bottom:1px solid #f9f9f9;
  .el-col{
    justify-content: center;
    display:flex;
    align-items:center;
  }
  .company{
    vertical-align: middle;
    display:flex;
    align-items:center;
    text-align:center;
    justify-content: center;
    font-size:14px;
    word-break:break-all;
  }
}
.pl-dialog{
    width:100%;
    margin-top:0;
}
.el-dialog{
  width:100%;
  margin-top:0;
}
.el-dialog__body{
  padding:0 20px;
}
.listL{
  width:25%;
}
.listM,.listR{
  width:37.5%;
}
.listL,.listM,.listR{
  .el-row{
  height:50px;
  }
}

</style>
