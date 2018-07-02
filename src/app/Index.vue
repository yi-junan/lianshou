<template>
  <div class="p-index">
    <div class="limit">
      <div class="box">
        <div class="head" @click="onRasios">
          <Radio :data="d" v-for="d in radios" :key="d.id" :ref="d.id" />
        </div>

        <div class="content">
          <div class="wrap">
            <div class="dropbox-inline" data-type="goStart">
              <p class="title">
                {{ $t('chu_fa_gang') }}
              </p>
              <Dropdown key="goStartDD" ref="goStartDD" :data="ports" :placeholder="$t('gang_kou_ming_cheng')" :on-chose-back="onChose" :loading="loadingPort" />
            </div>
            <div class="icon-box">
              <Icon name='riqi' />    
            </div>

            <div class="dropbox-inline" data-type="goEnd">
              <p class="title">
                {{ $t('dao_da_gang') }}
              </p>
              <Dropdown key="goEndDD" ref="goEndDD" :data="ports" :placeholder="$t('gang_kou_ming_cheng')" :on-chose-back="onChose" :loading="loadingPort" />
            </div>

            <div class="dropbox" data-type="go">
              <p class="title">{{ $t('chu_fa_ri_qi') }}</p>
              <Datepicker key="goPicker" ref="goPicker" :on-select="onSelectDate" />
            </div>

            <div class="btn">
              <Button :text="$t('cha_xun')" :need-event="true" @handle="onSearch" />
            </div>


          </div>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
import Radio from '@/components/basic/Radio.vue';
import Dropdown from '@/components/basic/Dropdown.vue';
import Icon from '@/components/basic/Icon.vue';
import Button from '@/components/basic/Button.vue';
import Loading from '@/components/basic/Loading.vue';
import Datepicker from '@/components/Datepicker.vue';
import { LoopEle, noti } from '@/assets/js/util.js';
import { mapGetters, mapState } from 'vuex';
import compareAsc from 'date-fns/compare_asc';
import format from 'date-fns/format';
import findIndex from 'lodash/findIndex';
import getTime from 'date-fns/get_time';

export default {
	name: 'Search',
    components: {
    Radio,
    Dropdown,
    Icon,
    Datepicker,
    Button,
    Loading,
  },
    data() {
   	  return {
   	  	loadingAirline: false,
        showRoundTrip: true,
        minHeight: 0,
        loadingPort: true,
        selAirline: {
        code: '',
        hour: '',
        minute: '',
        date: '',
        },
      }
    },

  computed: {
      radios() {
      return [
        { id: 'onWayRadio', name: this.$i18n.t('dan_cheng') },
        { id: 'roundTripRadio', name: this.$i18n.t('wang_fan') },
      ];
    },

    ...mapState({
      hours: state => state.basis.hours,
      minutes: state => state.basis.minutes,
    }),

    ...mapGetters(['ports', 'airline']),
  },
    methods: {
    // 切换单程，往返
    onRasios(e) {
      LoopEle(e, {
        UL: tar => {
          const className = tar.className;
          const id = tar.getAttribute('data-id');
          let ref;

          if (className.indexOf('cp-radio') === -1) {
            return;
          }

          this.radios.forEach(item => {
            ref = this.$refs[item.id];
            if (String(item.id) === String(id)) {
              ref[0].onChose();
              this.showRoundTrip = !!(item.id === this.radios[1].id);
            } else {
              ref[0].unChose();
            }
          });
        },

        DIV: 'end',
      });
    },

    // 选择港口
      onChose(argId, $el) {
      const parentNode = $el.parentNode;
      const type = parentNode.getAttribute('data-type');

        if (type === 'goStart') {
          this.chosed.go.start = argId;
        } else if (type === 'goEnd') {
          this.chosed.go.end = argId;
        } else if (type === 'backStart') {
          this.chosed.back.start = argId;
        } else if (type === 'backEnd') {
          this.chosed.back.end = argId;
        }

        this.portResponse(type);
        this.chkOtherPorts(type);
      }

    },

    async created() {
    this.loadingPort = true;
    await Promise.all([
      this.$store.dispatch('getPorts'),
    ]);
    this.loadingPort = false;
    },


    mounted() {
    this.$nextTick(() => {
      // 选中单程
      this.showRoundTrip = false;
      const refName = this.radios[0].id;
      this.$refs[refName][0].onChose();
    });
  },
};

</script>

<style scoped lang="scss">
@import '../assets/css/color.scss';
@import '../assets/css/util.scss'; 

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

.content {
  padding: 36px;
  width: 100%;
  box-sizing: border-box;

  .wrap {
    margin-bottom: 36px;

    .icon-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      margin-right: 20px;
      height: 34px;

      /deep/ .icon-riqi {
        color: $blue;
        font-size: 28px;
      }
    }
    .dropbox-inline {
      display: inline-block;
      vertical-align: bottom;
    }
    [class*='dropbox'] {
      width: 180px;
      position: relative;

      /deep/ .cp-dropdown {
        width: 180px;

        .head {
          height: 34px;
        }
      }

      /deep/ .cp-datepicker {
        height: 34px;
        width: 180px;
      }

      & > .title {
        font-size: 14px;
        color: #333;
        padding-bottom: 10px;
      }
    }
    & > div {
      padding-bottom: px2rem(25);
      &:last-child {
        padding-bottom: 0;
      }
    }
    .hour-minute {
      display: flex;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }

      /deep/ .cp-dropdown {
        width: 65px;
      }
      p {
        margin-left: 5px;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .btn {
    display: block;
    text-align: center;

    /deep/ .cp-btn {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 20px;
    }
  }
}

</style>