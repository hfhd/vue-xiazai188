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
  	<div v-if="seller.supports" class="support">
  		<div class="text">
  			{{seller.supports[0].des}}
  		</div>
  		<div calss="icon">
  			{{seller.supports.length}}
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
