<template>
  <div class="header">
  	<div class="wrapper">
  		<div class="avatar">
  			<img :src="seller.build" width="64" height="64">
  		</div>
  	</div>
  	<div class="bulletin">
  			<div class="title">
  				<div class="name">{{seller.start}}</div>
  			</div>
  	</div>
  	<div v-if="seller.supports" class="support" @click="showDetail">
  		<div class="text" :class=classMap[seller.supports[0].type] >
  			{{seller.supports[0].des}}
  		</div>
  		<div :class="[icon2,icon3]">
  			{{seller.supports.length}}
  		</div>
  	</div>
    <div class="bulletin-wrap">
      <span class="bulletin-title">
      </span>
      <span class="bulletin-text">
        {{seller.test}}
      </span>
    </div>
    <div class=background>
      <img :src="seller.build" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrap clearfix">
        <div class="detail-main">
            <div class="stars">
              <star :size="18" :score="2.5"></star>
            </div>
            <div class="support" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].des}}</span>
            </div>
            <p>{{seller.test}}</p>
            <p>{{seller.test}}</p>
            <p>{{seller.test}}</p>
            <p>{{seller.test}}</p>
            <p>{{seller.test}}</p>
            <p>{{seller.test}}</p>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">X</div>
    </div>
  </div>
</template>

<script>
  import star from '../../components/star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail: function () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['discount', 'desrease', 'special', 'only'];
      this.icon2 = 'icon';
      this.icon3 = 'icon-w';
    },
    components: {
      star
    }

  };
</script>

<style>
  .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    display:block;
    content:".";
    height:0;
    line-height:0;
    clear:both;
    visibility:hidden;
  } 
  .header{
    overflow:hidden;
    background:rgba(0,0,0,0.4);
    position:relative;
    z-index:999;
  }
  .text.desrease{
    color:red
  }
  .text.discount{
    color:green
  }
  .text.special{
    color:blue
  }
  .text.only{
    color:green
  }
  .icon{
    background:#f6f6f6;
  }
  .icon-w{
    text-align:center;
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    z-index:-1;
    width:100%;
    height:100%;
    filter:blur(10px);
  }
  .detail{
    position: fixed;
    z-index: 100;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow:auto;
    transition:all 0.5s;
    background:rgba(0,0,0,0.6);
    backdrop-filter:blur(10px);
  }
  .fade-transition {
     opacity: 1;
    background:rgba(0,0,0,0.6);
  }
  .fade-enter, .fade-leave {
    opacity: 0;
    background:rgba(0,0,0,0);
  }
  .detail-wrap{
    min-height:100%;
  }
  .detail-main{
    color:#fff;
    margin-top:100px;
  }
  .detail-main p{
    line-height:100px;
  }
  .detail-close{
    color:#fff;
    position:relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
  }
</style>
