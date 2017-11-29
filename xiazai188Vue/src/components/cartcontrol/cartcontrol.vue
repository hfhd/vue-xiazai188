<template>
  <div class="cartcontrol">
  	<div class="cart-decrease" @click.stop.prevent="decreaseCart($event)" v-show="food.count>0" transition="move">
  		<div class="inner">-</div>
  	</div>
  	<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
  	<div class="cart-add" @click.stop.prevent="addCart($event)">
  	 <div class="inner">+</div>
  	</div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
 props: {
  food: {
   type: Object
  }
 },
 created () {
 },
 methods: {
  addCart (event) {
   if (!event._constructed) {
    return;
   };
   if (!this.food.count) {
     Vue.set(this.food, 'count', 1);
   } else {
    this.food.count++;
   };
  },
  decreaseCart (event) {
   if (!event._constructed) {
    return;
   };
   if (this.food.count) {
    this.food.count--;
   };
  }
 }
};
</script>

<style>
.cartcontrol{
	font-size:0;
}
.cart-decrease{
	display:inline-block;
	padding:6px;
	transition: all 0.4s linear;
}
.cart-decrease.move-transition{
	opacity:1;
	transform: translate3D(0,0,0);
}
.cart-decrease .inner{
	line-height:20px;
	font-size:18px;
	color:rgba(0,160,220);
	display: inline-block;
	transition: all 0.4s linear;
	transform: rotate(0);
}
.cart-decrease.move-enter,.cart-decrease.move-leave{
	opacity:0;
	transform:translate3D(24px,0,0);
}
.cart-decrease.move-enter .inner,.cart-decrease.move-leave .inner{
	transform: rotate(180deg);
}
.cart-count{
	display:inline-block;
	padding:6px;
	color:#000;
	width:20px;
	height:20px;
	line-height:20px;
	font-size:18px;
}
.cart-add,.cart-decrease{
	display:inline-block;
	line-height:20px;
	width:20px;
	height:20px;
	background:blue;
	color:#fff;
	padding:6px;
	margin:0 10px;
	font-size:18px;
}
</style>
