<template>
  <div class="container">
    <div class="date-today">
      今天是
      <span>{{ new Date().format('yyyy年MM月dd日') }}</span>
    </div>
    <div class="nowTime">
      <a class="preMon" @click="prevMonth()"> << </a>
      <div class="thisMon">
        {{ new Date(this.currentMonth).format('yyyy-MM') }}
      </div>
      <a class="nextMon" @click="nextMonth()"> >> </a>
    </div>
    <table cellpadding="0" cellspacing="0" class="table-calendar">
      <tr>
        <th>周日</th>
        <th>周一</th>
        <th>周二</th>
        <th>周三</th>
        <th>周四</th>
        <th>周五</th>
        <th>周六</th>
      </tr>
      <tr
        v-for="(week, index) in data"
        :key="index">
        <td
          v-for="(date, _index) in week"
          :key="_index"
          :class="getTdClass(date)">
          <p>
            {{ date.format('dd') }}
          </p>
          <p v-if="dateMessage[date.format('yyyyMMdd')]">
            {{ dateMessage[date.format('yyyyMMdd')] }}
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import { DateFormat } from '../js/utils';

  export default {
    name: 'Calendar',
    data () {
      return {
        monthDays: [],
        currentMonth: '',
        data: [],
        dateMessage: {
          '20190425': '今日你值班！'
        }
      };
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        this.monthDays = [31, 28 + this.isLeapYear(this.ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.currentMonth = new Date().format('yyyy-MM');
      },
      /**
       * 是否是闰年
       * @param year
       * @returns {number}
       */
      isLeapYear (year) {
        return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
      },
      /**
       * 上一年
       */
      prevMonth () {
        let time = new Date(this.currentMonth);
        let m = time.getMonth();
        let y = time.getFullYear();
        m = m === 0 ? 11 : m - 1;
        y = m === 11 ? y - 1 : y;
        this.currentMonth = new Date(y, m).format('yyyy-MM');
      },
      /**
       * 下一年
       */
      nextMonth () {
        let time = new Date(this.currentMonth);
        let m = time.getMonth();
        let y = time.getFullYear();
        m = m === 11 ? 0 : m + 1;
        y = m === 0 ? y + 1 : y;
        this.currentMonth = new Date(y, m).format('yyyy-MM');
      },
      /**
       * 获取表格样式
       * @param date
       * @returns {string}
       */
      getTdClass (date) {
        let cls = '';
        if (date.getDay() === 0) cls += ' sunday';
        if (date.getDay() === 6) cls += ' saturday';
        if (date.format('yyyyMMdd') === new Date().format('yyyyMMdd')) cls += ' today';
        let time = new Date(this.currentMonth);
        let m = time.getMonth();
        let y = time.getFullYear();
        const mDays = this.monthDays[m];
        let firstDate = new Date(y, m, 1).getTime();
        let lastDate = new Date(y, m, mDays).getTime();
        let dTime = date.getTime();
        if (dTime < firstDate || dTime > lastDate) cls += ' out-month';
        return cls;
      }
    },
    created () {
      DateFormat();
    },
    watch: {
      currentMonth (newVal) {
        this.data = [];
        let time = new Date(newVal);
        let m = time.getMonth();
        let y = time.getFullYear();
        const mDays = this.monthDays[m];
        let firstDate = new Date(y, m, 1);
        let firstDay = firstDate.getDay();
        firstDate = firstDate.getTime();
        const dMs = 24 * 60 * 60 * 1000;
        firstDate = firstDate - firstDay * dMs;
        let rows = parseInt(mDays / 7) + 1;
        for (let i = 0; i < rows; i++) {
          let rowD = [];
          for (let j = 0; j < 7; j++) {
            let dTime = firstDate + (i * 7 + j) * dMs;
            rowD.push(new Date(dTime));
          }
          this.data.push(rowD);
        }
      }
    }
  };
</script>
<style lang="scss">
  $table-border: 1px solid blue;
  .container {
    width: 100%;
    .date-today {
      float: right;
    }
    .nowTime {
      display: flex;
      justify-content: center;
      height: 40px;
      line-height: 40px;
      a {
        cursor: pointer;
      }
      .thisMon {
        padding: 0 15px;
      }
    }
    .table-calendar {
      width: 100%;
      border-top: $table-border;
      border-left: $table-border;
      font-size: 18px;
      tr {
        width: 100%;
        display: flex;
        justify-content: space-around;
        td, th {
          flex: 1;
          border-right: $table-border;
          border-bottom: $table-border;
          text-align: center;
          height: 100px;
          span[date] {
            position: relative;
          }
        }
        th {
          height: 25px;
          line-height: 25px;
          font-weight: bold;
        }
        tr:last-child {
          border: none;
        }
        p {
          margin: 0;
          padding: 5px 10px;
          &.time {
            text-align: right;
          }
        }
        td {
          cursor: pointer;
          &.today {
            background-color: #c1e0ee;
          }
          &.out-month {
            background-color: #cccccc;
            cursor: default;
          }
          &.sunday {
            color: red;
          }
          &.saturday {
            color: green;
          }
        }
      }
      tr.xiqi {
        td {
          height: 22px;
          line-height: 22px;
        }
      }
    }
  }
</style>