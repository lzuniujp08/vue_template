/**
 * Created by lzugis on 2018/3/28.
 */

let chartUtil = {};

chartUtil.init = initChart;

function initChart(domId, option) {
    var echarts = require('echarts');
    const myChart = echarts.init(document.getElementById(domId));
    // 绘制图表
    myChart.setOption(option);
}

export default chartUtil;