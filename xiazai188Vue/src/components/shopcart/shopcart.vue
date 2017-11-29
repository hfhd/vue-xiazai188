<template>
  <div class="shopcart">
  	<div class="content" @click="toggleList">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo">
  					<span class="icon-shopping_cart" :class="{'lighthight':totalCount>0}"></span>
  				</div>
  				<div class="num" v-show="totalCount>0">共{{totalCount}}</div>
  			</div>
  			<div class="price" :class="{'lighthight':totalPrice>0}">{{totalPrice}}元</div>
  			<div class="desc">
  			另需配送费{{deliveryPrice}}元
  			</div>
  		</div>
  		<div class="content-right"  @click.stop.prevent="pay">
  			<div class="pay" :class="payClass">{{payDesc}}</div>
  		</div>
  	</div>
  	<div class="showcart-list" v-show="listShow" transition="fold" >
  			<div class="list-header">
  				<h1>购物车</h1>
  				<div class="empty" @click="empty">清空</div>
  			</div>
  			<div class="content" ref="listContent">
  				<ul>
  					<li class="food" v-for="food in selectFoods">
  						<span>{{food.name}}</span>
  						<span>￥{{food.price*food.count}}</span>
  						<div>
  						<div class="cartcontrol-wrap">
	  						<cartcontrol :food="food"></cartcontrol>
  						</div>
  						</div>
  					</li>
  				</ul>
  			</div>
  		</div>
  		<div class="list-mark" v-show="listShow" @click="hideList"></div>
  </div>

</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../../components/cartcontrol/cartcontrol';

export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
        default: 0
    },
    selectFoods: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      fold: true
    };
  },
  computed: {
    totalPrice () {
     var total = 0;
     this.selectFoods.forEach((food) => {
      total += food.price * food.count;
     });
     return total;
    },
    totalCount () {
     var count = 0;
     this.selectFoods.forEach((food) => {
      count += food.count;
     });
     return count;
    },
    payDesc () {
     if (this.totalPrice === 0) {
      return '￥' + this.minPrice + '元起送';
     } else if (this.totalPrice < this.minPrice) {
      var diff = this.minPrice - this.totalPrice;
      return '还差￥' + diff + '起送';
     } else {
      return '去结算';
     }
    },
    payClass () {
     if (this.totalPrice < this.minPrice) {
      return 'not-enough';
     } else {
      return 'enough';
     }
    },
    listShow () {
     if (!this.totalCount) {
      this.fold = true;
      return false;
     };
     var show = !this.fold;
      if (show) {
      this.$nextTick(() => {
       if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.listContent, {
         click: true
        });
       } else {
        this.scroll.refresh();
       }
      });
      }
      return show;
    }
  },
  methods: {
   toggleList () {
    if (!this.totalCount) {
     return;
    };
    this.fold = !this.fold;
   },
   empty () {
    this.selectFoods.forEach((food) => {
     food.count = 0;
    });
   },
   hideList () {
    this.fold = true;
   },
   pay () {
    if (this.totalPrice < this.minPrice) {
     return;
    }
    window.alert('支付' + this.totalPrice);
   }
  },
  components: {
   cartcontrol
  }
};
</script>

<style>
.shopcart{
	position:fixed;
	bottom:0;
	left:0;
	z-index:50;
	width:100%;
	height:48px;
	background:#000;
	color:#fff;
}
.content{
	display:flex;
	background:#141d27;
}
.content-left{
	flex:1;
}
.content-right{
	flex:0 0 105px;
}
.icon-shopping_cart{
	background:url("../../common/img/star-no36.png");
	width:40px;
	height:40px;
	display:inline-block;
}
.price{
	float:left;
	margin-left:10px;
}
.num{
	background:red;
}
.logo,.desc,.num{
	float:left;
	margin-left:10px;
}
.logo.lighthight{
	background:rgba(0,160,220)
}
.icon-shopping_cart.lighthight{
	color:#fff;
	background:url("../../common/img/star-all36.png");
}
.price.lighthight{
	color:red;
}
.pay.enough{
	background:green;
	font-size:15px;
}
.pay.not-enough{
	background:#000;
	font-size:14px;
}
.showcart-list{
	position:absolute;
	bottom:50px;
	left:0;
	z-index:-1;
	width:100%;
	color:#fff;
	max-height:250px;
	background:#000;
}
.showcart-list.fold-transition{
	transition:all 0.5s;
	trandform: translate3d(0,-100%,0);
}
.showcart-list.fold-enter,.showcart-list.fol-leave{
	trandform: translate3d(0,0,0);
}
.list-mark{
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:-4;
	background:rgba(0,0,0,0.5);
	opacity:0.5;
}
</style>
