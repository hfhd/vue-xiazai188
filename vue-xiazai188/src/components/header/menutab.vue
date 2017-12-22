<template>
  <div class="menutab">
    <a v-for="(data, index) in datas" :key="index" :href="data.url">{{data.name}}</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [
        {
          name: '开奖',
          url: 'http://m.kaijiang.caishencai.com'
        },
        {
          name: '比分',
          url: 'http://m.live.caishencai.com'
        },
        {
          name: '资讯',
          url: 'http://m.news.caishencai.com'
        },
        {
          name: '走势图',
          url: 'http://m.chart.caishencai.com'
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.menutab{
  position:absolute;
  top:50px;
  left:0;
  width:100%;
  background:#f32b1b;
  z-index:2;
  color:#fff;
  a{
  color:#fff;
  display:block;
  text-decoration:none;
  padding:10px 15px;
  font-size:14px;
  &:hover{
    background:#ba2a1f;
  }
  }
}
</style>
