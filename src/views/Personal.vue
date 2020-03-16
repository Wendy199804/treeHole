<template>
  <div class="personal">
    <Navigate :defaultIndex="defaultIndex" :isLogin="isLogin" :loginuser="user"></Navigate>
    <div class="top-msg">
      <div class="name-msg">
        <p>
          <img src="../assets/default_userimg.jpg" alt="" />
          <span>{{ this.$store.state.user.username }}</span>
        </p>
      </div>
      <div class="other-msg">
        <p>
          发表昵称：<span>{{ this.$store.state.user.nickname }}</span>
        </p>
        <p>
          回复昵称：<span>{{ this.$store.state.user.replynickname }}</span>
        </p>
        <p>
          性别：<span>{{ this.$store.state.user.sex }}</span>
        </p>
        <p>
          学号：<span>{{ this.$store.state.user.number }}</span>
        </p>
      </div>
      <div class="tree-msg">
        <p>
          我的树洞数：<span>{{ this.$store.state.user.topiccount }}</span>
        </p>
        <p>
          被举报次数：<span>{{ this.$store.state.user.tipnumber }}</span>
        </p>
      </div>
      <div class="edit-msg">
        <div style="position:absolute;right:8px;top:13px;width:100px"><i class="el-icon-edit-outline"></i><span>修改资料</span></div>
        <el-button round style="position:absolute;right:8px;top:48px;cursor:pointer;background-color:#555;">
          <router-link :to="{ name: 'article' }" style="color:#fff;display:block;width:100%;height:100%">发布新树洞</router-link>
        </el-button>
      </div>
    </div>

    <div class="mini-navigation">
      <el-menu class="el-menu-vertical-demo" default-active="1" @select="mini_handleSelect">
        <el-menu-item index="1">
          <router-link :to="{ name: 'mytips' }" style="color:#303133;display: block;width: 100%;height: 100%;"><span>我的树洞</span></router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{ name: 'mycomments' }" style="color:#303133;display: block;width: 100%;height: 100%;"><span>我的评论</span></router-link>
        </el-menu-item>
      </el-menu>
      <div class="right-contain">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigate from '@/components/Navigate.vue'
import Footer from '@/components/Footer.vue'

import utils from '@/utils/utils.js'
import http from '@/utils/http.js'

export default {
  data() {
    return {
      defaultIndex: '3',
      isLogin: false, //是否登录
      user: '', //登录用户
      // allArticle: '', //所有树洞
      articlenum: '' //树洞数
      // a:''
    }
  },
  components: {
    Navigate,
    Footer
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    mini_handleSelect(key, keyPath) {
      console.log(key)
    }
  },

  created() {
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
  },
  mounted() {
    // /**获取本人的所有树洞 */
    // console.log(this.user.nickname)
    // http.post('/api/UserTree', { nickname: this.user.nickname }).then(res => {
    //   console.log(res.data)
    //   // this.a = res.data[0].contentery
    //   // let arr = JSON.parse(JSON.stringify(res.data))
    //   if (res.data.length == 0) {
    //     this.allArticle = '空'
    //   } else {
    //     this.allArticle = res.data
    //   }
    //   // console.log(arr)
    // })
    // /**本人所有树洞数 */
    // http.post('/api/UserTreeNum', { nickname: this.user.nickname }).then(res => {
    //   console.log(res.data)
    //   this.articlenum = res.data
    // })
    // console.log(this.$store.state.userinfo)
  }
}
</script>

<style lang="scss">
.personal {
  // width: 100%;
  min-width: 1000px;
  // height: 100vh;
  // min-height: 100vh;
  padding-top: 70px;
  background-color: rgb(230, 230, 230);
  /**个人信息 */
  .top-msg {
    width: 1000px;
    min-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-family: 幼圆;
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    background-color: white;
    & > div {
      width: 30%;
      padding: 20px 0;
      display: flex;
      box-sizing: border-box;
    }
    & > div:nth-child(2),
    & > div:nth-child(3) {
      flex-direction: column;
      justify-content: flex-start;
      padding: 45px 0;
      padding-left: 40px;
    }
    & > div:nth-child(1) {
      text-align: center;
      border-right: 1px solid rgba(177, 177, 177, 0.452);
    }
    .edit-msg {
      width: 10%;
      color: #999;
      position: relative;
      & > span {
        cursor: pointer;
      }
    }

    .name-msg {
      justify-content: center;
      p {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 2px solid black;
        margin-bottom: 20px;
      }
    }
    .el-icon-edit-outline {
      font-size: 19px;
    }
  }

  .other-msg,
  .tree-msg {
    p {
      margin-bottom: 30px;
      position: relative;
      font-weight: 300;
      &::before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #999;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -12px;
      }
      span {
        font-weight: bold;
      }
    }
  }

  .mini-navigation {
    width: 1000px;
    min-width: 800px;
    min-height: 500px;
    margin: 30px auto;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    .el-menu {
      width: 180px;
      & > .is-active {
        color: #000;
        font-weight: blod;
        border-right: 2px solid #999;
      }
    }

    .right-contain {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
    }
  }
}
</style>
