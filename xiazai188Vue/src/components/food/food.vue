<template>
  <transition name="fade">
  	<div v-show="showFlag" class="food" ref="food">
	    <div class="food-content">
	    	<div class="image">
	    		<img :src="food.image">
	    		<div class="back-history" @click="hide">
		    		<i class="icon-arrow"><</i>
	    		</div>
	    	</div>
	    	<div class="price">
	    		<span class="now">${{food.name}}</span>
	    		<span class="now">${{food.price}}</span>
	    		<span class="old" v-show="food.oldPrice">${{food.oldprice}}</span>
	    	</div>
	    	<div class="cartcontrol-wrap" v-show="food.count>0">
	    		<cartcontrol :food="food"></cartcontrol>
	    	</div>
	    	<div class="buy" @click.stop.prevent="addFirst(food,$event)" v-show="!food.count || food.count===0">加入购物车</div>
	    </div>
  	</div>
  </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../../components/cartcontrol/cartcontrol';

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true;
      this.$nextTick(() => {
       if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.food, {
         click: true
        });
       } else {
        this.scroll.refresh();
       }
      });
    },
    hide () {
      this.showFlag = false;
    },
    addFirst (food, event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    }
  },
  components: {
	cartcontrol
  }
};
</script>

<style>
.food{
	position:fixed;
	left:0;
	top:0;
	bottom:48px;
	z-index:9999;
	width:100%;
	background:#fff;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s linear;
  transform: translated3d(0,0,0);
}
.fade-enter, .fade-leave-to {
  transform: translated3d(100%,0,0);
  opacity: 0;
}
.image{
	position:relative;
	width:100%;
	height:0;
	padding-top:100%;
}
.image img{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
}
.back-history{
	color:#000;
	position:absolute;
	top:10px;
	left:0;
	font-size:20px;
}
.back-history i{
	padding:10px;
	display:block;
}
</style>
