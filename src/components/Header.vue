<template>
  <header id="header">
	<div class="title-bar limit">
	  <p class="welcome">{{ $t("huan_ying_yu") }}</p>
	  
	</div>


  </header>
	
</template>

<script>
	export default {
		data() {

		}
	}
</script>


<style>
.title-bar {
  background-color: #f5f5f5;
  height: px2rem(40);
  min-height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
  white-space: nowrap;

  .handle {
    height: 100%;
    margin-left: auto;
    display: flex;
    align-items: center;

    & > li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 23px;
      height: 100%;
      cursor: pointer;
      font-size: 14px;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-left: 15px;
      }
      &:not(:last-child):not(:only-child):hover {
        color: $blue;
      }
      .iconfont {
        margin-right: 4px;
      }
      .sm {
        padding-left: 8px;
        padding-right: 8px;
        border-right: 1px solid #999;
        color: #999;
        &:hover {
          color: $blue;
        }
      }
      /deep/ .cp-dropdown {
        height: 100%;
        z-index: 9;

        .head {
          border: none;
          height: 100%;
          padding-left: 8px;
          padding-right: 8px;
          color: #999;
          font-size: 14px;
        }
        .content {
          border: 1px solid #eee;
          white-space: nowrap;
        }
        .cp-triangle {
          border-color: #999 transparent transparent !important;
        }
        &:hover {
          .head {
            color: $blue;
          }
          .cp-triangle {
            border-color: $blue transparent transparent !important;
          }
        }
      }
    }
  }
}


</style>