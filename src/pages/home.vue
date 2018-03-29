<template id="template">
    <div class="layout" >
	    <!--<span>当前数字：</span>
        <span >{{num}}</span>

        <el-button  v-on:click="add">+1</el-button>
        <p>
            <router-link to="/detail/1">详情页</router-link>
        </p>
        <span>当前数字：</span>
        <span >{{num}}</span>
        <button v-on:click="add">+1</button>-->
        <div class="map" id="map">
            <div class="mouse-position" id="lonlat"></div>
        </div>
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
            map = new Map({
                layers: [
                    new TileLayer({
                        source: new OsmSource()
                    })
                ],
                target: 'map',
                view: new View({
                    center: proj.transform([116.397428, 39.90923], 'EPSG:4326', 'EPSG:3857'),
                    maxZoom: 19,
                    zoom: 7
                })
            });

            map.on("pointermove", function (evt) {
                const _coord = proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                $("#lonlat").html(_coord[0].toFixed(3) + ',' + _coord[1].toFixed(3))
            });
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
        height: calc(100% - 70px);
        position: relative;
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