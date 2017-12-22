<template>
  <div class="headerdetail">
    <div class="gameheader-wrap">
      <el-row class="gameheader">
        <el-col :span="12"><div class="grid-content"><i class="el-icon-arrow-left el-icon" @click="backHistory"></i></div></el-col>
        <el-col :span="12" ><div class="grid-content fr" @click="menuTabShow = !menuTabShow"><i class="el-icon-menu el-icon"></i></div></el-col>
      </el-row>
    </div>
    <v-menutab v-show="menuTabShow"></v-menutab> 
  </div>
</template>

<script>
import menutab from '../../components/header/menutab';

export default {
  data () {
    return {
    'menuTabShow': false
    };
  },
  methods: {
    backHistory () {
      window.history.go(-1);
    }
  },
  components: {
    'v-menutab': menutab
  }
};
</script>

<style lang="less" scoped>
  a{text-decoration:none;}
  .header{
    position:relative;
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
</style>
