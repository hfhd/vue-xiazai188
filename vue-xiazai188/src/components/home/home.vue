<template>
  <div class="home">
    <el-row class="dataTab-wrap">
      <el-col :span="4"><div class="grid-content">前一期</div></el-col>
       <el-col :span="16">
        <div class="grid-content">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              default-value="2017-12-01">
            </el-date-picker>
          </div>
        </div>
       </el-col>
      <el-col :span="4"><div class="grid-content">后一期</div></el-col>
    </el-row>
    <el-carousel :autoplay="true" :interval="5000" arrow="hover" height="160px">
      <el-carousel-item v-for="item in homeData.LotteryS" >
        <h3>{{item.num}}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
const urlRode = 'http://api.tiyu.caishencai.com/Api/Api/index/cc/schedule_jc/id/2017-11-30';

export default {
  data () {
    return {
      value1: '',
      homeData: []
    };
  },
  created () {
    this.$http.jsonp(urlRode).then(response => {
      response = response.body;
      this.homeData = response;
     }, response => {
     });
  }
};
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 160px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
