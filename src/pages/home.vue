<template id="template">
    <div class="layout" >
	    <!--<span>当前数字：</span>-->
        <!--<span >{{num}}</span>-->
        <!--<button v-on:click="add">+1</button>-->
        <div class="map" id="map">
            <div class="mouse-position" id="lonlat"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                num: 1
            }
        },
        updated: function () {
            console.log('home updated');
        },
        mounted: function () {
            initMap();
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