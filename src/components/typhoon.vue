<template>
    <div class="typhoon-list">
        <el-checkbox-button class="list-toggle" v-model="listShow" size="mini" label="台风列表"></el-checkbox-button>
        <div v-show="listShow">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              height="250"
              @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="日期"
                  width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';

  import {Vector as vectorLayer} from 'ol/layer';
  import {Vector as vectorSource} from 'ol/source.js';
  import Point from 'ol/geom/Point.js';
  import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
  import Overlay from 'ol/Overlay.js';

  export default {
    name: 'Typhoon',
    props: {},
    components: {},
    data () {
      return {
        listShow: true,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      };
    },
    updated () {},
    mounted () {
      const self = this;
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val;
      }
    }
  };
</script>

<style lang="scss" scoped>
    .typhoon-list{
        position: absolute;
        top: 50px;
        background-color: white;
        right: 12px;
        z-index: 99;
        box-shadow: 1px 1px 2px #ccc;
        border-radius: 4px;
        height: 250px;
        .list-toggle{
            position: absolute;
            top: calc(50%);
            left: -65px;
            transform:rotate(90deg);
            -ms-transform:rotate(90deg); 	/* IE 9 */
            -moz-transform:rotate(90deg); 	/* Firefox */
            -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
            -o-transform:rotate(90deg);
        }
    }
</style>
