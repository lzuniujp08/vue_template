<template id="template">
    <div class="layout" >
        <span>当前文章id：</span>
        {{ $route.params.id }}
        <div v-html="detailHtml"></div>

        <el-button @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
        </el-dialog>
        <el-form class="login-form">
            <el-form-item>
                <el-input :autofocus="true" placeholder="请输入账号" v-model="username" tabindex="1">
                    <template slot="prepend">
                        <i class="el-icon-mobile-phone"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" type="password" v-model="password" tabindex="2">
                    <template slot="prepend">
                        <i class="el-icon-info"></i>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>

        <div style="height: 80px;">
            <scroll-bar class="warp" overflow="hidden-x">
                <ul class="list">
                    <li v-for="i in 10">
                       item {{ i }}
                    </li>
                </ul>
            </scroll-bar>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import Element from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import ScrollBar from '../components/scrollbar.vue';
  import $ from 'jquery';
  Vue.use(Element);

  export default {
    components: {
      ScrollBar
    },
    data () {
      return {
        id: '',
        name: '',
        detailHtml: '加载中。。。',
        visible: false
      };
    },
    updated () {
      this.id = this.$route.params.id;
      this.name = this.$route.params.name;
      this.getDetail();
    },
    mounted () {
      this.id = this.$route.params.id;
      this.name = this.$route.params.name;
      this.getDetail();
    },
    methods: {
      getDetail (id) {
        const _self = this;
        setTimeout(function () {
          _self.detailHtml = '文章内容' + _self.name;
        }, 1000);
      }
    }
  };
</script>

<style lang="scss" scoped>
    .login-form{
        width: 350px;
    }
    .warp{
        height: 100%;
        overflow: hidden;
        width: 300px;
    }
</style>