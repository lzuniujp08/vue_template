<template id="template">
    <div class="layout" >
        <span>当前文章id：</span>
        {{ id }}
        <div v-html="detailHtml"></div>
    </div>
</template>
<script>
    const $ = require('jquery');
    export default {
        data: function () {
            return {
                id: '',
                name: '',
                detailHtml:'加载中。。。'
            }
        },
        updated: function () {

        },
        mounted: function () {
            this.id = this.$route.params.id;
            this.name = this.$route.params.name;
            this.getDetail();
        },
        methods: {
            getDetail:function(id){
                var _self = this;
                setTimeout(function(){
                    _self.detailHtml = '文章内容' + _self.name
                },2000);

            }
        }
    }
</script>