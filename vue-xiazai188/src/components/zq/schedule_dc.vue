<template>
  <div class="schedule_dc">
  
  </div>
</template>

<script>

export default {
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
