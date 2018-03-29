<template id="template">
    <div class="layout" >
        <nav>
            <span class="logo">Openlayers+Vue</span>
            <ul class="menus">
                <li v-for="menu in menus" :id="menu.id" >
                    <router-link :to="menu.url" v-bind:click="menuSelect">{{ menu.title }}</router-link>
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
                menus: [
                    { id: 'menu-home' ,title: '首 页', url: '/home'},
                    { id: 'menu-map' ,title: '地 图', url: '/map'},
                    { id: 'menu-detail' ,title: '设 置', url: '/detail/2/lzugis'}
                ]
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
                $(".menus").children().removeClass("active");
                $("#"+menuId).addClass("active");
            }
        },
        computed: {
            classObject: function () {
                return {
                    active: this.isActive
                }
            }
        }
    }
</script>

<style lang="css">
    
</style>