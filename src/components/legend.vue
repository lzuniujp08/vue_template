<template>
    <ul class="map-legend">
        <li class="legend-title" @click="toogleLegend">图例</li>
        <li class="legend-item" v-for="color in colors" v-show="isShow">
            <span :style="{background: color.color}"></span>
            {{ color.lable }}
        </li>
    </ul>
</template>

<script>
    export default {
      name: 'Legend',
      props: {
        colors: {
          type: Array,
          default: [
                    {'color': 'rgba(232,27,35,255)', 'lable': '风险很高'}
          ]
        }
      },
      components: {},
      data () {
        return {
          isShow: false
        };
      },
      updated () {},
      mounted () {},
      methods: {
        toogleLegend () {
          this.isShow = !this.isShow;
        }
      }
    };
</script>

<style lang="scss" scoped>
    $border-margin: 10px;

    .map-legend{
        position: absolute;
        bottom: 45px;
        right: $border-margin;
        z-index: 999;
        list-style: none;
        margin: 0;
        background: #fff;
        border-radius: 4px;
        box-shadow: 1px 1px 2px #ccc;
        font-size: 12px;
        overflow: hidden;
        li{
            &.legend-title{
                font-weight: bold;
                cursor: pointer;
                line-height: 23px;
                height: 23px;
                padding: 0 5px;
                text-align: center;
                border-bottom: 1px solid #ccc;
            }
            span{
                display: inline-block;
                width: 20px;
                height: 12px;
                box-shadow: 1px 1px 2px #ccc;
            }
            line-height: 20px;
            height: 20px;
            padding: 0 5px;
            text-align: left;
        }
    }
</style>