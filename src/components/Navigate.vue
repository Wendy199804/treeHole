<template>
  <div class="nav_top">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgb(27, 33, 69)" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/home">首页</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">关于</template>
        <el-menu-item index="2-1"> <router-link :to="{ name: 'about' }">关于</router-link></el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="4"><router-link :to="{ name: 'article' }">树洞</router-link></el-menu-item>

      <el-menu-item v-if="!isLogin" index="5" class="sign"><router-link :to="{ name: 'signin' }">登录</router-link></el-menu-item>
      <el-menu-item index="6" class="sign"><router-link :to="{ name: 'signup' }">注册</router-link></el-menu-item>
      <el-submenu v-if="isLogin" index="7" class="sign">
        <template slot="title">欢迎回来，{{ loginuser.username }}</template>
        <el-menu-item index="2-1"><router-link :to="{ name: 'personal' }" style="color:white">个人中心</router-link></el-menu-item>
        <el-menu-item index="2-2">设置</el-menu-item>
        <el-menu-item index="2-3">注销</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '',
      input3: ''
    }
  },
  props: {
    defaultIndex: {
      type: String,
      required: true
    },
    isLogin: {
      type: Boolean,
      required: true
    },
    loginuser: {
      type: Object,
      default: {},
      required: true
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted() {},
  created() {
    console.log(this.defaultIndex)
    this.activeIndex = this.defaultIndex
  }
}
</script>

<style lang="scss" scope>
@media screen and (max-width: 10000px) {
  // .input_wrap {
  //   float: left;
  //   line-height: 35px;
  //   outline: none;

  //   .el-input__inner {
  //     width: 300px;
  //   }
  //   .el-input-group__append button.el-button {
  //     background-color: #ffd04b;
  //     border-radius: 0 4px 4px 0;
  //   }
  // }
  .nav_top {
    height: 35px;
    position: fixed;
    top: 0;
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.829);
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    width: 100%;
    background-color: rgb(27, 33, 69);
    .el-menu--horizontal > .sign {
      float: right;
    }
    .el-menu-demo {
      min-width: 850px;
      margin: 0 auto;
      border: none;
      height: 35px;
      li,
      .el-submenu__title {
        height: 35px;
        line-height: 35px;
      }
      li {
        // margin: 0px 20px;
        padding: 0px;
        overflow: hidden;
      }
    }
    .el-submenu__title:hover,
    .el-menu-item:hover,
    .is-active {
      background-color: #303861 !important;
    }

    a {
      color: #ffffff;
      display: block;
      width: 100%;
      padding: 0 20px;
    }
    .el-input__inner,
    .el-button--default {
      height: 30px;
    }
    .el-button--default {
      padding: 0 17px;
    }
    .el-input__inner {
      width: 260px;
    }
  }
}
</style>
