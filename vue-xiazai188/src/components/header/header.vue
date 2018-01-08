<template>
  <div class="header">
    <el-row class="header-top bg-red">
      <el-col :span="3">
        <div class="grid-content">
          <el-button type="text" @click="menuTabShow = !menuTabShow"><i class="el-icon-menu"></i></el-button>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content">
          <div class="cz-con">
            <router-link  to="/zq" class="link-a">足球</router-link>
            <router-link  to="/lq" class="link-a">篮球</router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="3"><div class="grid-content"><i class="el-icon-search"></i></div></el-col>
    </el-row>
    <v-menutab v-show="menuTabShow"></v-menutab> 
    <router-view></router-view>
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
  .header-top{
    &.el-row {
      height:50px;
    }
    .grid-content {
      min-height: 36px;
    }
    .el-icon-menu,.el-icon-search{
      color:#fff;
      font-size:28px;
      padding:10px 0px;
    }
    .el-icon-menu{
      float:left;
    }
    .el-icon-search{
      float:right;
    }
    .grid-content{
      height:50px;
      display:flex;
      justify-content: center;
      align-items:center;
    }
    .cz-con{
      text-align:center;
      border:1px solid #fff;
      border-radius:5px;
      height:30px;
      line-height:30px;
      width:70%;
      .link-a{
        color:#fff;
        width:48.4%;
        text-align:center;
        display:inline-block;
        &.router-link-active{
        background:#ba2a1f;
        }
      }
    }
  }
  .bg-red{
    background:#f32b1b;
  }
</style>
