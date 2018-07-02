<template>
  <div class="shoppingCart limit" :style="{ 'min-height': `${minHeight}px` }">
    <div class="head">
      <div class="chose-all" @click="onToggleAll">
        <CheckBox ref="checkboxAll"/>
        <span>全选</span>
      </div>
      <div class="handle">
        <Button type="no-border" text="清空购物车"/>
      </div>
    </div>

    <ul class="order-list">
      <li class="item" v-for="o in orders" :key="o.id" @click="onOrder" :data-id="o.id">
        <div class="one">
          <div class="w5">
            <CheckBox :ref="`${o.id}Checkbox`"/>
          </div>
          <p class="w26">订单号：{{ o.numbers }}</p>
          <p class="w23">取票验证码：{{ o.code }}</p>
          <p class="w9">{{ o.count }}张</p>
          <p class="w23">订单总额：<em>¥{{ o.money }}</em></p>
          <div class="btn-groups">
            <Button type="no-border" 
                    :data-id="o.id"
                    data-type="check-order-details"
                    :text="chkIsActive(o.id) ? '收起订单' : '查看订单'"/>
            <Button type="no-border" 
                    :data-id="o.id"
                    data-type="del-order"
                    text="删除" />
          </div>
        </div>
        <div class="two" v-show="chkIsActive(o.id)">
          <div class="head">
            <p>联系人：{{ o.concat }}</p>
            <p>支付时间：{{ o.payTime }}</p>
            <p>支付单号：{{ o.payNums }}</p>
          </div>
          <ul class="details">
            <li class="type">去程</li>
            <li class="msg">
              <p>
                <span>{{ o.go.trip }}</span>
                <span>开船时间：{{ o.go.startTime }}</span>
                <span>{{ o.go.elapsedTime }}</span>
              </p>
              <p v-for="(t, index) in o.go.ticks" :key="`${o.id}-${index}`">
                <span>{{ t }}</span>
              </p>
            </li>
          </ul>
          <ul class="details" v-if="o.back && o.back.trip">
            <li class="type">返程</li>
            <li class="msg">
              <p>
                <span>{{ o.back.trip }}</span>
                <span>开船时间：{{ o.back.startTime }}</span>
                <span>{{ o.back.elapsedTime }}</span>
              </p>
              <p v-for="(t, index) in o.back.ticks" :key="`${o.id}-${index}`">
                <span>{{ t }}</span>
              </p>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div class="pay">
      <p>订单总金额：<em>¥{{ totalMoney }}</em></p>
      <Button type="normal" text="支付订单"/>
    </div>
    
  </div>
</template>

<script>
import CheckBox from '@/components/basic/CheckBox.vue';
import Button from '@/components/basic/Button.vue';
import { LoopEle } from '@/assets/js/util.js';

export default {
  name: 'shoppingCart',
  components: {
    CheckBox,
    Button,
  },
  props: {
    minHeight: Number,
  },
  data() {
    return {
      orders: [
        {
          id: 'orders-1',
          numbers: 123456789,
          code: '3aq689a',
          count: 4,
          money: 400,
          concat: 13828421070,
          payTime: '2018-07-09 12:00:00',
          payNums: 123456789,
          go: {
            trip: '中山港——香港中港城',
            startTime: '2018-03-23 08:00',
            elapsedTime: '2小时34分钟',
            ticks: [
              '刘雨婷 成人票×1/普通位 身份证1234567890',
              '刘雨婷 成人票×1/普通位 身份证1234567890',
            ],
          },
          back: {
            trip: '中山港——香港中港城',
            startTime: '2018-03-23 08:00',
            elapsedTime: '2小时34分钟',
            ticks: [
              '刘雨婷 成人票×1/普通位 身份证1234567890',
              '刘雨婷 成人票×1/普通位 身份证1234567890',
            ],
          },
        },
        {
          id: 'orders-2',
          numbers: 123456789,
          code: '3aq689a',
          count: 4,
          money: 400,
          concat: 13828421070,
          payTime: '2018-07-09 12:00:00',
          payNums: 123456789,
          go: {
            trip: '中山港——香港中港城',
            startTime: '2018-03-23 08:00',
            elapsedTime: '2小时34分钟',
            ticks: [
              '刘雨婷 成人票×1/普通位 身份证1234567890',
              '刘雨婷 成人票×1/普通位 身份证1234567890',
            ],
          },
          back: {
            trip: '中山港——香港中港城',
            startTime: '2018-03-23 08:00',
            elapsedTime: '2小时34分钟',
            ticks: [
              '刘雨婷 成人票×1/普通位 身份证1234567890',
              '刘雨婷 成人票×1/普通位 身份证1234567890',
            ],
          },
        },
      ],
      // 打开了订单详情的
      activeOrders: [],
      // 选中的订单
      chosenOrders: [],
    };
  },
  computed: {
    totalMoney() {
      let total = 0;
      let cur;

      this.chosenOrders.forEach(id => {
        cur = this.orders.filter(item => item.id === id);
        if (cur && cur[0]) {
          total += cur[0].money;
        }
      });

      return total;
    },
  },
  methods: {
    // 查看订单详情是否被打开
    chkIsActive(argId) {
      return this.activeOrders.indexOf(argId) !== -1;
    },

    // 查看订单详情
    toggleOrderDetails(argId) {
      if (!this.chkIsActive(argId)) {
        this.activeOrders.push(argId);
        return;
      }
      this.activeOrders = this.activeOrders.filter(id => id !== argId);
    },

    // 选中订单
    toggleOrder(argId) {
      this.$refs[`${argId}Checkbox`][0].toggle();
      if (this.chosenOrders.indexOf(argId) === -1) {
        this.chosenOrders.push(argId);
      } else {
        this.chosenOrders = this.chosenOrders.filter(id => id !== argId);
      }

      if (this.chosenOrders.length === this.orders.length) {
        this.$refs.checkboxAll.chose();
      } else {
        this.$refs.checkboxAll.unchose();
      }
    },

    // 选中全部订单
    onToggleAll() {
      const orderLen = this.orders.length;
      const len = this.chosenOrders.length;
      const isChoseAll = orderLen > len;

      if (isChoseAll) {
        this.$refs.checkboxAll.chose();
        this.orders.forEach(item => {
          if (this.chosenOrders.indexOf(item.id) === -1) {
            this.$refs[`${item.id}Checkbox`][0].chose();
            this.chosenOrders.push(item.id);
          }
        });
      } else {
        this.$refs.checkboxAll.unchose();
        this.chosenOrders = [];
        this.orders.forEach(item => {
          this.$refs[`${item.id}Checkbox`][0].unchose();
        });
      }
    },

    // 删除订单
    onDelOrder() {},

    // 点击订单列表某个地方
    onOrder(e) {
      LoopEle(e, {
        BUTTON: tar => {
          const type = tar.getAttribute('data-type');
          const id = tar.getAttribute('data-id');

          if (type === 'check-order-details') {
            this.toggleOrderDetails(id);
          } else if (type === 'del-order') {
            this.onDelOrder(id);
          }
        },
        LI: tar => {
          const id = tar.getAttribute('data-id');
          this.toggleOrder(id);
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/css/color.scss';
@import '../assets/css/util.scss';

.shoppingCart {
  & > .head {
    padding-left: px2rem(23);
    padding-right: px2rem(23);
    margin-bottom: px2rem(15);
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .handle {
      margin-left: auto;
      display: flex;
      align-items: center;

      button {
        padding: 0;
        margin-right: px2rem(10);

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .chose-all {
      @include fontSizeRespond(20);
      color: $black;
      display: flex;
      align-items: center;
      cursor: pointer;

      .cp-checkbox {
        margin-right: px2rem(7);
      }
    }
  }

  em {
    font-style: normal;
    @include fontSizeRespond(24);
    color: $orange;
  }

  .order-list {
    width: 100%;

    & > li.item {
      width: 100%;
      @include fontSizeRespond(20);
      line-height: 1.25;
      color: $black;
      word-break: break-all;
      border-top: 1px solid $border;

      .one {
        display: flex;
        align-items: center;
        padding: px2rem(40) px2rem(23);
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: $lightestBlue;
        }
        .w5 {
          width: 5%;
          text-align: left;
        }
        .w26 {
          width: 26%;
          text-align: left;
        }
        .w9 {
          width: 9%;
        }
        .w23 {
          width: 23%;
        }
        .btn-groups {
          margin-left: auto;
          flex-shrink: 0;
          display: flex;
          align-items: center;

          button {
            padding: 0;
            min-width: auto;
            margin-right: px2rem(20);

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .two {
        background-color: $background;
        color: $lightenFont;

        .head {
          font-size: 0;
          border-bottom: 1px dotted $border;
          padding: px2rem(22) px2rem(28);
          box-sizing: border-box;
          width: 100%;

          p {
            margin-right: px2rem(53);
            display: inline-block;
            vertical-align: middle;
            @include fontSizeRespond(20);

            &:last-child {
              margin-right: 0;
            }
          }
        }
        .details {
          padding: px2rem(28);
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: flex-start;
          margin-bottom: px2rem(8);

          &:first-of-type {
            padding-bottom: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
          .type {
            padding-right: px2rem(61);
          }
          .msg {
            p {
              margin-bottom: px2rem(19);
              font-size: 0;

              &:last-child {
                margin-bottom: 0;
              }
            }
            span {
              margin-right: px2rem(79);
              display: inline-block;
              vertical-align: middle;
              @include fontSizeRespond(20);

              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
      &:last-child {
        border-bottom: 1px solid $border;
      }
    }
  }

  .pay {
    @include fontSizeRespond(20);
    line-height: 1.25;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: px2rem(67);

    button {
      width: px2rem(200);
      height: px2rem(60);
      @include fontSizeRespond(24);
      margin-left: px2rem(19);
    }
  }
}
</style>
