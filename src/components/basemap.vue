<template>
    <div class="base-map">
        <el-radio-group v-model="basemap" size="small" @change="changeBaseMap">
            <el-radio-button label="矢量"></el-radio-button>
            <el-radio-button label="影像"></el-radio-button>
            <el-radio-button label="地形"></el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        name: 'BaseMap',
        props: {},
        components: {},
        data () {
            return {
                basemap: ''
            }
        },
        updated () {},
        mounted () {
            this.basemap = '矢量';
        },
        methods: {
            changeBaseMap (){
                this.$emit('changeBaseMap', this.basemap);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $border-margin: 10px;

    .base-map{
        position: absolute;
        top:$border-margin;
        right: $border-margin;
        z-index: 999;
    }
</style>