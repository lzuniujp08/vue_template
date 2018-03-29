<template id="template">
    <div class="map" id="map">
        <!--<span>当前数字：</span>
        <span >{{num}}</span>

        <el-button  v-on:click="add">+1</el-button>
        <p>
            <router-link to="/detail/1">详情页</router-link>
        </p>
        <span>当前数字：</span>
        <span >{{num}}</span>
        <button v-on:click="add">+1</button>-->
        <div class="mouse-position" id="lonlat"></div>
    </div>
</template>
<script>
    let map;

    import proj from 'ol/proj';
    import Map from 'ol/map';
    import View from 'ol/view';
    import TileLayer from 'ol/layer/tile';
    import OsmSource from 'ol/source/OSM';
    import $ from 'jquery';

    import mapUtil from './../js/mapUtil';

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
            mapUtil.init();
            map = mapUtil.map;
        },
        methods: {
            add:function(){
                this.num++;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .map{
        width: 100%;
        position: absolute;
        top:40px;
        bottom: 30px;
        .mouse-position{
            position: absolute;
            bottom: 10px;
            right: 10px;
            padding: 5px;
            background: white;
            border: 1px solid #ccc;
            z-index: 9;
        }
    }
</style>