<template id="template">
    <div class="layout" >
	    <span>当前数字：</span>
        <span >{{num}}</span>
        <button v-on:click="add">+1</button>

        <p>
            <router-link to="/detail/1">详情页</router-link>
        </p>
    </div>
</template>
<script>
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
        },
        methods: {
            add:function(){
                this.num++;
            }
        }
    }
</script>