<template>
  <div id="dateContainer">
    <div class="date__showNowTime">
      今天是
      <span>{{ new Date().format('yyyy年MM月dd日') }}</span>
    </div>
    <div class="nowTime">
      <button class="preMon" @click="preMon">上个月</button>
      <div class="thisMon">
        <span>{{ ynow }}</span>/
        <span>{{ mnow + 1 }}</span>
      </div>
      <button class="nextMon" @click="nextMon">下个月</button>
    </div>
    <table
      class="table-calendar"
      cellspacing="0"
      cellpadding="0"
      id="table"/>
  </div>
</template>
<script>
  import { DateFormat } from '../js/utils';

  export default {
    name: 'Legend',
    data () {
      return {
        newDate: '', // 当前的日期的信息
        ynow: '', // 当前的年数
        mnow: '', // 当前的月份
        dnow: '', // 当前的天数
        firstDay: '', // 第一天
        firstnow: '', // 当前的星期
        m_days: [],
        tr_str: ''
      };
    },
    methods: {
      getDaysInfo () {
        let _this = this;
        this.sureDate(_this);
      },
      is_leap (year) {
        return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
      },
      // 下面的是画表格的方法，这个方法会根据数据画出我们需要的表格
      drawTable (jsonHtml) {
        let _this = this;
        let str = `
        <tr class="xiqi">
          <th class="sunday">星期日</th>
          <th>星期一</th>
          <th>星期二</th>
          <th>星期三</th>
          <th>星期四</th>
          <th>星期五</th>
          <th class="saturday">星期六</th>
        </tr>`;
        let idx = '';
        let date_str = '';
        let isWeekend = '';
        let hasMsg = '';
        // 行
        for (let i = 0; i < _this.tr_str; i++) {
          str += '<tr>';
          // 列，表示周
          for (let k = 0; k < 7; k++) {
            idx = i * 7 + k;
            if (k === 0) {
              isWeekend = 'sunday';
            } else if (k === 6) {
              isWeekend = 'saturday';
            } else {
              isWeekend = '';
            }
            date_str = idx - _this.firstnow + 1;
            (date_str <= 0 || date_str > this.m_days[this.mnow]) ? date_str = '&nbsp;' : date_str = idx - _this.firstnow + 1;
            date_str === _this.dnow
              ? hasMsg = '<td class="thisDay ' + isWeekend + '" date="' + date_str + '"><div>' + date_str + '</div></td>'
              : hasMsg = '<td class="' + isWeekend + '" date="' + date_str + '"><div>' + date_str + '</div></td>';
            for (let l = 0, len = jsonHtml.length; l < len; l++) {
              if (date_str === jsonHtml[l].date) {
                let newStr = '<p>' + jsonHtml[l].msg + '</p>';
                date_str === _this.dnow
                  ? hasMsg = '<td class="thisDay ' + isWeekend + '" date="' + date_str + '"><div>' + date_str + '</div>' + newStr + '</td>'
                  : hasMsg = '<td class="' + isWeekend + '" date="' + date_str + '"><div>' + date_str + '</div>' + newStr + '</td>';
              }
            }
            str += hasMsg;
          }
          str += '</tr>';
        }
        let table = document.getElementById('table');
        table.innerHTML = str;
      },
      // 两个参数代表的含义分别是this对象以及判断当前的操作是不是在进行月份的修改
      sureDate (_this) {
        this.firstDay = new Date(this.ynow, this.mnow, 1);
        this.firstnow = this.firstDay.getDay();
        this.m_days = [31, 28 + this.is_leap(this.ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.tr_str = Math.ceil((_this.m_days[this.mnow] + this.firstnow) / 7);
        this.showMsg();
      },
      preMon () {
        let _this = this;
        this.mnow = this.mnow === 0 ? 11 : this.mnow - 1;
        this.ynow = this.mnow === 11 ? this.ynow - 1 : this.ynow;
        this.sureDate(_this, 'up');
      },
      nextMon () {
        let _this = this;
        this.mnow = this.mnow === 11 ? 0 : this.mnow + 1;
        this.ynow = this.mnow === 0 ? this.ynow + 1 : this.ynow;
        this.sureDate(_this, 'next');
      },
      // 通过接口返回的是我们当前的月份对应在日历中需要处理的事项
      showMsg () {
        let jsonHtml = [
          {
            date: 2,
            msg: '吃饭'
          },
          {
            date: 3,
            msg: '睡觉'
          },
          {
            date: 4,
            msg: '打豆豆'
          },
          {
            date: 6,
            msg: '豆豆不在家'
          },
          {
            date: 12,
            msg: '~~~~~'
          },
          {
            date: 15,
            msg: '怎么办~~~~'
          },
          {
            date: 20,
            msg: '找豆豆'
          }
        ];
        this.drawTable(jsonHtml);
      }
    },
    created () {
      DateFormat();
    },
    mounted () {
      const currD = new Date();
      this.ynow = currD.getFullYear();
      this.mnow = currD.getMonth();
      this.getDaysInfo();
    },
    watch: {}
  };
</script>
<style lang="scss">
  $table-border: 1px solid blue;
  #dateContainer {
    width: 100%;
    .nowTime {
      display: flex;
      justify-content: center;
      height: 30px;
      line-height: 30px;
      .thisMon {
        height: 30px;
        line-height: 30px;
        span {
        }
      }
    }
    .table-calendar {
      width: 100%;
      border-top: $table-border;
      border-left: $table-border;
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
        td.thisDay {
          background-color: #eee;
        }
        .sunday {
          color: red;
        }
        .saturday {
          color: green;
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