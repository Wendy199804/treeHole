<template>
  <div class="nav_top">
    <!-- <div style="width:1100px;height:100%"> -->

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#000" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/home">首页</router-link></el-menu-item>

      <el-menu-item index="4"><router-link :to="{ name: 'article' }">树洞</router-link></el-menu-item>
      
      <el-menu-item v-if="!isLogin" index="5" class="sign"><router-link :to="{ name: 'signin' }">登录</router-link></el-menu-item>
      <el-menu-item index="6" class="sign"><router-link :to="{ name: 'signup' }">注册</router-link></el-menu-item>

      <el-submenu v-if="isLogin" index="7" class="sign">
        <template slot="title">欢迎回来，{{ loginuser.username }}</template>
        <el-menu-item index="7-1"><router-link :to="{ name: 'personal' }" style="color:white;display: block;width: 100%;height: 100%;">个人中心</router-link></el-menu-item>
        <el-menu-item index="7-2">设置</el-menu-item>
        <el-menu-item index="7-3"><span @click="logout" style="color:white;display: block;width: 100%;height: 100%;">注销</span></el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- </div> -->
  </div>
</template>

<script>
import utils from '@/utils/utils.js'

export default {
  data() {
    return {
      activeIndex: '',
      input3: '',
    }
  },
  props: {
    defaultIndex: {
      type: String,
      required: false,
    },
    isLogin: {
      type: Boolean,
      required: true,
    },
    loginuser: {
      type: Object,
      default: {},
      required: true,
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      this.$confirm('您将注销此账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已成功注销!',
          })

          utils.removeCookie('user')
          this.$store.state.isLogin = false
          this.$router.push({ name: 'home' })
          console.log(this.$store.state.isLogin)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
  },
  mounted() {},
  created() {
    console.log(this.defaultIndex)
    this.activeIndex = this.defaultIndex
  },
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
    min-width: 1000px;
    height: 35px;
    position: absolute;
    top: 0;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.87);
    width: 100%;
    background-color: #000;
    z-index: 10;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    .el-menu--horizontal > .sign {
      float: right;
    }
    .el-menu-demo {
      // min-width: 850px;
      width: 1000px;
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
      background-color: #444 !important;
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
