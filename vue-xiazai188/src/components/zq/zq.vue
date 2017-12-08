<template>
  <div class="zq">
    <div class="tab">
      <div class="tab-item">
        <router-link to="/zq/schedule_jc">竞选足球<p></p></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/zq/schedule_sfc">胜负彩<p></p></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/zq/schedule_dc">北京单场<p></p></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  methods: {}
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
.tab{
    width:100%;
    height:25;
    line-height:25px;
    background:#f32b1b;
    text-align:center;
    display:flex;
    justify-content: center;
    .tab-item{
      float:left;
      width:20%;
      font-weight:500;
      text-align:center;
      & > a{
       color:#fff;
       font-size:14px;
        &.router-link-active{
          color:#fff;
        }
        &.router-link-active p{
            width: 30px;
            height: 2px;
            background: #fff;
            margin: 0 auto;
            margin-top: 4px;
        }
      }
    }
  }
</style>
