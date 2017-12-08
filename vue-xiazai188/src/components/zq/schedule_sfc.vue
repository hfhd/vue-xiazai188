<template>
  <div class="schedule_sfc">
    什福彩
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
