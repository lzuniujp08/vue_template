/**
 * Created by lzugis on 2018/3/28.
 */

let chartUtil = {
    chart: null,

    init (domId, option){
        const echarts = require('echarts');
        this.chart = echarts.init(document.getElementById(domId));
        // 绘制图表
        this.chart.setOption(option);
    }
};

export default chartUtil;