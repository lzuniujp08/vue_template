<template id="template">
    <div class="map" id="map">
        <div class="custom-mouse-position" id="lonlat"></div>
        <div class="custom-scale-line" id="scaleline"></div>
        <div class="custom-overview-map" id="overview"></div>
        <div class="base-map">
            <el-radio-group v-model="basemap" size="small" @change="changeBaseMap">
                <el-radio-button label="矢量"></el-radio-button>
                <el-radio-button label="影像"></el-radio-button>
                <el-radio-button label="地形"></el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>
<script>
    import mapUtil from './../js/mapUtil';
    import Element from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        data () {
            return {
                num:1,
                basemap:'矢量'
            }
        },
        updated () {
//            console.log('home updated');
        },
        mounted () {
            mapUtil.init('map', 'leaflet');
            mapUtil.addWmsLayer('http://10.16.57.77:8086/geoserver/railway/wms', 'railway:base_province');
            const url = 'http://10.16.57.78:8000//bjdw/STAT/site_live/20180711/BJDW_SK_1KM_ANA_weatherStation_201807111740.json';
//            const url = '../data/capital.geojson';
            mapUtil.addGeojsonLayer(url, null);
        },
        methods: {
            add () {
                this.num++;
            },
            changeBaseMap (){
                mapUtil.changeBaseLayer(this.basemap);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $border-margin: 10px;
    .map{
        width: 100%;
        position: absolute;
        top:40px;
        bottom: 30px;
        .base-map{
            position: absolute;
            top:$border-margin;
            right: $border-margin;
            z-index: 999;
        }
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
    }
    .custom-overview-map{
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        border-top: 1px solid #000;
        border-right: 1px solid #000;
        button{
            display: none !important;
        }
    }
</style>