<template>
  <div class="menutab">
    <div class="menu-wrapper">
        <div class="menutabT">
          <div @click="menuToggle(index)" v-for="(menutab,index) in menutabs" :class="{active:index == num}"><div class="grid-content">{{menutab}}</div></div>
        </div>
        <div class="menu-content">
          <div class="" v-for="(menutabCon,index) in menu" v-show="index==num">
            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">{{menutabCon}}</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
          </div> 
        </div>
    </div>
  </div>
</template>

<script>
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
      menu: [],
      menutabs: ['软件', '游戏'],
      num: 0
    };
  },
  created () {
     this.$http.get('../../../menutab.json').then(response => {
       this.menu = response;
       console.log(this.menu);
     }, response => {
     });
  },
  methods: {
    menuToggle (index) {
     this.num = index;
    }
  }
};
</script>

<style lang="less" scoped>
  .menu-wrapper{
    position:absolute;
    top:50px;
    left:0;
    z-index:1;
    background:#186ba3;
    color:#fff;
    width:100%;
    height:auto;
    .menu-content{
    }
  }
  .bg-blue{
    background:#3498db;
  }
</style>
