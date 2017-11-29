<template>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class=text>
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]">
              {{item.name}}
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                <div>{{food.name}}</div>
                <div>{{food.info}}</div>
                <div class="price">￥{{food.price}}</div>
                <div class="cart-wrap">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
      <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../../components/shopcart/shopcart';
import cartcontrol from '../../components/cartcontrol/cartcontrol';
import food from '../../components/food/food';

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex () {
      for (var i = 0; i < this.listHeight.length; i++) {
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      var foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created () {
    this.classMap = ['discount', 'desrease', 'special', 'only'];
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
           this._initScroll();
           this._calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu (index, event) {
      if (!event._constructed) {
        return;
      }
       var foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
       var el = foodlist[index];
       this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
         click: true,
         probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight () {
      var foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      var height = 0;
      this.listHeight.push(height);
      for (var i = 0; i < foodlist.length; i++) {
        var item = foodlist[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      };
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
};
</script>

<style>
  .goods{
    position:absolute;
    top:200px;
    bottom:46px;
    display:flex;
    overflow:hiden;
    width:100%;
  }
  .goods .menu-wrap{
    flex:0 0 80px;
    width:80px;
    background:#f3f5f7;
  }
  .menu-wrap li{
    padding:30px 0;
  }
  .current{
    background:#fff;
    color:red;
  }
</style>
