<template id="template">
    <div class="layout" >
	    <span>当前数字：</span>
        <span >{{num}}</span>
        <button v-on:click="add">+1</button>
        <p>
            <router-link to="/detail/1">详情页</router-link>
        </p>
        <div class="map" id="map"></div>
    </div>
</template>
<script>
    var map;

    import ol from 'ol';
    import Map from 'ol/map';
    import View from 'ol/view';
    import TileLayer from 'ol/layer/tile';
    import OsmSource from 'ol/source/OSM';

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
            console.log('home mounted');
            map = new Map({
                layers: [
                    new TileLayer({
                        source: new OsmSource()
                    })
                ],
                target: 'map',
                view: new View({
                    center: [-74.0064, 40.7142],
                    maxZoom: 19,
                    zoom: 4
                })
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
        width: 500px;
        height: 300px;
        border: 1px solid red;
    }
</style>