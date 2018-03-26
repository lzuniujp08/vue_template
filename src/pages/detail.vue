<template id="template">
    <div class="layout" >
	    <span>当前文章id：</span>
        {{$route.params.id}}
        <div v-html="detailHtml"></div>
    </div>
</template>
<script>
    const $ = require('jquery');
    export default {
        data: function () {
            return {
                detailHtml:'<p>加载中。。。</p>'
            }
        },
        updated: function () {

        },
        mounted: function () {
            var id = this.$route.params.id;
            this.getDetail(id);
        },
        methods: {
            getDetail:function(id){
                var _this = this;
                setTimeout(function(){
                    _this.detailHtml = '<p>文章内容</p>'
                },2000);
                
            }
        }
    }
</script>