<template id="template">
    <div class="chart" id="chart">
    </div>
</template>
<script>

    import chartUtil from './../js/chartUtil';

    export default {
        data: function () {
            return {
                num:1
            }
        },
        updated: function () {
            console.log('home updated');
        },
        mounted: function () {
            const option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: [
                    {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子',]
                    },{
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子',]
                    }
                ],
                yAxis: {},
                series: [{
                    xAxisIndex: 0,
                    name: '销量',
                    type: 'line',
                    smooth:true,   //关键点，为true是不支持虚线的，实线就用true
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                width:2,
                                type:'solid'  //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: [5, 20, 36, 10, 10, 20]
                },{
                    xAxisIndex: 1,
                    name: '销量',
                    type: 'line',
                    smooth:true,   //关键点，为true是不支持虚线的，实线就用true
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                width:2,
                                type:'dotted'  //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            chartUtil.init('chart',option);
        },
        methods: {
            add:function(){
                this.num++;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chart{
        width: 100%;
        position: absolute;
        top:40px;
        height: 400px;
    }
</style>