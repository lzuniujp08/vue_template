<template id="template">
    <div class="layout" >
        <nav>
            <span class="logo">Openlayers+Vue</span>
            <ul class="menus">
                <li id="home" class="active" v-on:click="menuSelect('home')">
                    <router-link to="/home">首 页</router-link>
                </li>
                <li id="detail" v-on:click="menuSelect('detail')">
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
            menuSelect: function (menuId) {
                $(".menus").children().removeClass("active");
                $("#"+menuId).addClass("active");
            }
        }
    }
</script>

<style lang="css">
    
</style>