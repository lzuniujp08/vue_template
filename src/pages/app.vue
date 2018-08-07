<template id="template">
    <div class="layout" >
        <nav>
            <span class="logo">Openlayers+Vue</span>
            <ul class="menus">
                <li v-for="menu in menus" :id="menu.id" @click="menuSelect">
                    <router-link :to="menu.url" >{{ menu.title }}</router-link>
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
  export default {
    data () {
      return {
        menus: [
          {id: 'menu-home', title: '首 页', url: '/home'},
          {id: 'menu-chart', title: '统 计', url: '/chart'},
          {id: 'menu-detail', title: '设 置', url: '/detail/2/lzugis'}
        ]
      };
    },
    updated () {

    },
    mounted () {
      const self = this;
    },
    methods: {
      menuSelect () {
        console.log(this);
      }
    },
    computed: {
      classObject () {
        return {
          active: this.isActive
        };
      }
    }
  };
</script>

<style lang="css">

</style>