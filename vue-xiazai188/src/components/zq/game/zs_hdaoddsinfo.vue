<template>
  <div class="zs-hdaoddsinfo">
    <div class="zhegie-wrap">
      <div calss="zhedie-box">
          <div class="well well-sm">
            <div class="fl">
                <i class="sm-line"></i>
                欧赔列表        
            </div>
          </div>
          <div class="zhedie-con">
            <div class="tab-item">
              <div>
                <el-row :gutter="10" class="table-header little-word">
                  <el-col :span="6"><div class="grid-content fc">公司</div></el-col>
                  <el-col :span="6"><div class="grid-content fc">欧赔</div></el-col>
                  <el-col :span="7"><div class="grid-content fc">赔率</div></el-col>
                  <el-col :span="5"><div class="grid-content fc">返还率</div></el-col>
                </el-row>
                <div class="table-body" v-if="Datass!=undefined && Datass.length!=0">
                  <el-row :gutter="10" class="pl-list"  v-for="(Datas, index) in Datass" :key="index">
                    <el-col :span="6" class="company"><div class="grid-content fc" v-if="Datas.Name!=''">{{Datas.Name}}</div><div v-else>--</div></el-col>
                    <el-col :span="6">
                      <div class="grid-content fc">
                        <p class="pl-num"><span>{{Datas.Data[0]}}</span>/<span>{{Datas.Data[1]}}</span>/<span>{{Datas.Data[2]}}</span></p>
                        <p class="pl-num"><span>{{Datas.Data[7]}}</span>/<span>{{Datas.Data[8]}}</span>/<span>{{Datas.Data[9]}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content fc">
                        <p class="pl-num"><span>{{Datas.Data[3]}}</span>/<span>{{Datas.Data[4]}}</span>/<span>{{Datas.Data[5]}}</span></p>
                        <p class="pl-num"><span>{{Datas.Data[10]}}</span>/<span>{{Datas.Data[11]}}</span>/<span>{{Datas.Data[12]}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content fc">
                        <p class="pl-num">{{Datas.Data[6]}}</p>
                        <p class="pl-num">{{Datas.Data[13]}}</p>
                      </div>
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
</template>

<script>

export default {
  data () {
    return {
      'matchid': this.$route.params.matchid,
      'hdaoddsinfo': {},
      'Datass': {}
    };
  },
  created () {
    var hdaoddsinfoUrl = 'live/Api/Api/index/cc/zs_hdaoddsinfo/id/' + this.matchid;
    this.$http.jsonp(hdaoddsinfoUrl).then(response => {
      response = response.body;
      this.hdaoddsinfo = response;
      this.Datass = this.hdaoddsinfo.Datas;
    }, response => {});
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
  .el-row{
    padding: 10px 0;
    text-align:center;
    font-size:14px;
  }
}
.pl-list{
  display:flex;
  border-bottom:1px solid #f9f9f9;
  .pl-num{
    font-size:13px;
    padding: 4px 0;
  }
  .company{
    vertical-align: middle;
    display:flex;
    align-items:center;
    text-align:center;
    justify-content: center;
  }
}
</style>
