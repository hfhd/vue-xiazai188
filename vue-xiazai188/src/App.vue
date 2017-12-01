<template>
  <div class="appCon">
    <v-header class="header">头部</v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/home">首页</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/news">资讯</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ruanjian">软件</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/games">游戏</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/zuanti">专题</router-link>
      </div>
    </div>
    <router-view></router-view>
    <!--<v-footer></v-footer>-->
    <!--<v-ads></v-ads>-->
  </div>
</template>

<script>
import header from './components/header/header';
import footer from './components/footer/footer';
import ads from './components/ads/ads';

const ERR_OK = 0;

export default {
  data () {
    return {
      ruanjian: {},
      games: {}
    };
  },
  created () {
    this.$http.get('/api/ruanjian').then(response => {
       response = response.body;
       if (response.errno === ERR_OK) {
        this.ruanjian = response.data;
       }
    });
    this.$http.get('/api/games').then(response => {
     response = response.body;
     if (response.errno === ERR_OK) {
      this.games = response.data;
     }
    });
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-ads': ads
  }
};
</script>

<style lang="less" scoped>
  .appCon{
    font-family: "Helvetica Neue","PingFang SC";
  }
  img{
    border:none;
  }
  textarea {
    resize:none;
  }
  a{
    text-decoration: none; 
    color:#000;
  } 
  a:hover,a:visited{
    text-decoration: none;border:0;
  }
  ul,ol{
    margin-bottom: 0;
    list-style: none;
  }
  h1,h2,h3,h4{
    margin-bottom: 0;
    margin-top: 0;
  }
  p{
    margin:0 0;
  }
  .tab{
    width:100%;
    height:40px;
    line-height:40px;
    .tab-item{
      float:left;
      text-align:center;
      width:20%;
      font-weight:bold;
      & > a{
        font-size:16px;
        &.router-link-active{
          color:#3498db;
        }
      }
    }
  }
</style>
