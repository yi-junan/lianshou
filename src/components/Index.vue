<template>
  <div class="p-index" :style="{ 'min-height': `${minHeight}px` }">
	<div class="limit">head
	  <div class="box">
	  	<div class="header">
	  		
	  	</div>	  	
	  </div>
	</div>

  </div>
</template>

<script>


export default {
	name: 'Search',
    components: {
  },
    data() {
   	  return {
   	  	 minHeight: 0,
      }
   }
}

</script>
<style>
.limit {
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
.p-index {

  background-image: url('./img/bg.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: px2rem(60);
  padding-bottom: px2rem(60);
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
}
.box {
  display: inline-block;
  background-color: #fff;
  position: relative;
}

.head {
  height: px2rem(69);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;

  /deep/ .cp-radio {
    margin-right: px2rem(67);

    .radio {
      border-color: #ccc;
      width: 20px;
      height: 20px;

      &.active:after {
        width: 12px;
        height: 12px;
      }
    }
    .text-r {
      font-size: 14px;
      color: #333;
      margin-left: px2rem(10);
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

</style>