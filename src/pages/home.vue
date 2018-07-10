<template id="template">
    <div class="map" id="map">
        <div class="mouse-position" id="lonlat"></div>
    </div>
</template>
<script>
    import mapUtil from './../js/mapUtil';

    export default {
        data () {
            return {
                num:1
            }
        },
        updated () {
            console.log('home updated');
        },
        mounted () {
            mapUtil.init();
        },
        methods: {
            add () {
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