<template id="template">
    <div class="layout" >
        <nav>
            <span class="logo">Openlayers+Vue</span>
            <ul class="menus">
                <li class="active" v-on:click="menuSelect">
                    <router-link to="/home">首 页</router-link>
                </li>
                <li v-on:click="menuSelect">
                    <router-link to="/detail/2/lzugis">详情页</router-link>
                </li>
            </ul>
        </nav>
        <router-view></router-view>
        <footer>
            @LZUGIS
        </footer>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        data: function () {
            return {
                
            }
        },
        updated: function () {

        },
        mounted: function () {
            var self = this;

        },
        methods: {
            menuSelect: function () {
                console.log(this);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>