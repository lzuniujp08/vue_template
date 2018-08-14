<template id="template">
    <div class="map" id="map">
        <div class="custom-mouse-position" id="lonlat"></div>
        <div class="custom-scale-line" id="scaleline"></div>
        <BaseMap @changeBaseMap="changeBaseMap" v-show="basemapShow"></BaseMap>
        <Legend ref="legend" :colors="legendColors"></Legend>
        <Measure ref="measure"></Measure>
        <Typhoon ref="typhoon"></Typhoon>
    </div>
</template>
<script>
  import mapUtil from './../js/mapUtil';
  import BaseMap from './../components/basemap.vue';
  import Legend from './../components/legend.vue';
  import Measure from './../components/measure.vue';
  import Typhoon from './../components/typhoon.vue';

  export default {
    components: {
      BaseMap,
      Legend,
      Measure,
      Typhoon
    },
    data () {
      return {
        basemapShow: true,
        legendColors: [
          {'color': 'rgba(232,27,35,255)', 'lable': '风险很高'},
          {'color': 'rgba(255,127,39,255)', 'lable': '风险较高'},
          {'color': 'rgba(255,242,0,255)', 'lable': '有风险'},
          {'color': 'rgba(0,0,0,0)', 'lable': '无风险'}
        ],
        mapType: 'ol'
      };
    },
    updated () {

    },
    mounted () {
      mapUtil.init('map', this.mapType);
      mapUtil.addWmsLayer('http://39.106.122.204:8086/geoserver/railway/wms', 'railway:base_province');
      // const url = 'http://10.16.57.78:8000//bjdw/STAT/site_live/20180711/BJDW_SK_1KM_ANA_weatherStation_201807111740.json';
      mapUtil.addGeojsonLayer();

      this.$refs.legend.isShow = true;
    },
    methods: {
      changeBaseMap (basemap){
        mapUtil.changeBaseLayer(basemap);
      }
    }
  };
</script>

<style lang="scss" scoped>
    $border-margin: 10px;
    .map{
        width: 100%;
        position: absolute;
        top:40px;
        bottom: 30px;
    }
    .custom-mouse-position{
        position: absolute;
        bottom: $border-margin;
        right: $border-margin;
        padding: 3px 5px;
        background: white;
        z-index: 999;
        box-shadow: 1px 1px 2px #ccc;
        border-radius: 5px;
    }
    .custom-scale-line{
        position: absolute;
        bottom: $border-margin;
        left: $border-margin;
        z-index: 9;
        border: 2px solid #000;
        border-top: none;
        height: 8px;
        text-align: center;
        line-height: 0;
        display: none;
    }
    .custom-overview-map{
        position: absolute;
        top: 70px;
        right: 30px;
        width: 200px;
        height: 200px;
        z-index: 999;
        box-shadow: 1px 1px 2px #ccc;
        button{
            display: none !important;
        }
    }
</style>