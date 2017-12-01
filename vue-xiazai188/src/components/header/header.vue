<template>
  <div class="header">
    <el-row class="header-top bg-blue">
      <el-col :span="3">
        <div class="grid-content">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content">
          <div class="logo"></div>
        </div>
      </el-col>
      <el-col :span="3"><div class="grid-content"><i class="el-icon-search"></i></div></el-col>
    </el-row>
  </div>
</template>

<script>
import menutab from '../../components/header/menutab';

export default {
  props: {
    ruanjian: {
      type: Object
    },
    games: {
      type: Object
    }
  },
  data () {
    return {
    };
  },
  components: {
    'v-menutab': menutab
  }
};
</script>

<style lang="less" scoped>
  .header{
    position:relative;
  }
  .header-top{
    &.el-row {
      height:50px;
    }
    .grid-content {
      min-height: 36px;
    }
    .el-icon-menu,.el-icon-search{
      color:#fff;
      font-size:30px;
      padding:10px 8px;
    }
    .el-icon-menu{
      float:left;
    }
    .el-icon-search{
      float:right;
    }
    .logo{
      width:auto;
      height:45px;
      background:url("../../common/img/xiazai.png") center center no-repeat;
      background-size:auto 45px;
      padding-top:3px;
    }
  }
  .bg-blue{
    background:#3498db;
  }
</style>
