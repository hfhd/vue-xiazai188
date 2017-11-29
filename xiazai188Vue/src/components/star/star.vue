<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ALL = 'all';
const CLS_HALF = 'half';
const CLS_NO = 'no';

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    itemClasses () {
      var result = [];
      var score = Math.floor(this.score * 2) / 2;
      var hasDecimal = score % 1 !== 0;
      var integer = Math.floor(score);
      for (var i = 0; i < integer; i++) {
        result.push(CLS_ALL);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_NO);
      }
      return result;
    }
  }
};
</script>

<style>
  .star .star-item{
    display:inline-block;
    background-repeat:no-repeat;
  }
  .star.star-18 .star-item{width:18px; height:18px; margin-right:22px; background-size:18px 18px;} 
  .star-18:last-child{
    margin-right:0;
  }
  .star-18 .all{
    background:url("../../common/img/star-all.png")
  }
  .star-18 .half{
    background:url("../../common/img/star-half.png")
  } 
  .star-18 .no{
    background:url("../../common/img/star-no.png")
  }
  .star.star-30 .star-item{width:30px; height:30px; margin-right:22px; background-size:30px 30px;} 
  .star-30:last-child{
    margin-right:0;
  }
  .star-30 .all{
  background:url("../../common/img/star-all30.png")
  }
  .star-30 .half{
    background:url("../../common/img/star-half30.png")
  } 
  .star-30 .no{
    background:url("../../common/img/star-no30.png")
  }
  .star.star-36 .star-item{width:36px; height:36px; margin-right:22px; background-size:36px 36px;} 
  .star-36:last-child{
    margin-right:0;
  }
  .star-36 .all{
  background:url("../../common/img/star-all36.png")
  }
  .star-36 .half{
    background:url("../../common/img/star-half36.png")
  } 
  .star-36 .no{
    background:url("../../common/img/star-no36.png")
  }
</style>
