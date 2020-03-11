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
          性别：<span>{{ this.$store.state.userinfo.sex }}</span>
        </p>
        <p>
          学号：<span>{{ this.$store.state.userinfo.number }}</span>
        </p>
      </div>
      <div class="tree-msg">
        <p>
          我的树洞数：<span>{{ this.$store.state.userinfo.topiccount }}</span>
        </p>
        <p>
          被举报次数：<span>{{ this.$store.state.userinfo.tipnumber }}</span>
        </p>
      </div>
      <div class="edit-msg"><i class="el-icon-edit-outline"></i><span>修改资料</span></div>
    </div>

    <div class="alltips">
      <p style="color:#999;margin-bottom:20px">我的所有树洞</p>
      <div v-for="item in allArticle" :key="item.topicID" class="tip-item">
        <el-tag type="warning" effect="dark" class="anonymous-tag" v-if="item.isName == '不匿名'">不匿名</el-tag>
        <el-tag type="info" effect="dark" class="anonymous-tag" v-if="item.isName == '匿名'">匿名</el-tag>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <span>标题：{{ item.title }}</span>
              <!-- <i class="header-icon el-icon-info"></i>  -->
              <div class="tip-time">
                <i class="el-icon-view"></i> <span style="display:inline-block;width:30px;"> {{item.browseCount}}</span>
                <i class="el-icon-chat-line-square"></i> <span style="display:inline-block;width:30px;"> {{item.replyCount}}</span>
                <i class="el-icon-timer"></i> <span style="display:inline-block;width:125px;"> {{ item.time }}</span>
              </div>
              
            </template>
            <div v-html="item.contentery" class="tip-content"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import Navigate from '@/components/Navigate.vue'
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'

export default {
  data() {
    return {
      defaultIndex: '3',
      isLogin: false, //是否登录
      user: '', //登录用户
      allArticle: '', //所有树洞
      articlenum: '' //树洞数
      // a:''
    }
  },
  components: {
    Navigate
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  },
  created() {
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
  },
  mounted() {
    /**获取本人的所有树洞 */
    console.log(this.user.nickname)
    http.post('/api/UserTree', { nickname: this.user.nickname }).then(res => {
      console.log(res.data)
      // this.a = res.data[0].contentery
      // let arr = JSON.parse(JSON.stringify(res.data))
      if (res.data.length == 0) {
        this.allArticle = '空'
      } else {
        this.allArticle = res.data
      }
      // console.log(arr)
    })
    /**本人所有树洞数 */
    http.post('/api/UserTreeNum', { nickname: this.user.nickname }).then(res => {
      console.log(res.data)
      this.articlenum = res.data
    })
    console.log(this.$store.state.userinfo)
  }
}
</script>

<style lang="scss">
.personal {
  width: 100%;
  // height: 100vh;
  padding-top: 70px;
  background-color: rgb(230, 230, 230);
  /**个人信息 */
  .top-msg {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-family: 幼圆;
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    background-color: white;
    div {
      width: 30%;
      padding: 20px 0;
      display: flex;
      box-sizing: border-box;
    }
    div:nth-child(2),
    div:nth-child(3) {
      flex-direction: column;
      justify-content: flex-start;
      padding: 45px 0;
      padding-left: 40px;
    }
    div:nth-child(1) {
      text-align: center;
      border-right: 1px solid rgba(177, 177, 177, 0.452);
    }
    .edit-msg {
      width: 10%;
      color: #999;
      span {
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
  /**树洞 */
  .el-collapse-item__header {
    display: flex;
    justify-content: space-between;
    padding-left: 70px;
    span {
      margin-right: 20px;
    }
  }
  .tip-time{
    position: absolute;
    right: 30px;
    top: 0px;
  }
  .alltips {
    width: 1000px;
    margin: 30px auto;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .tip-item {
    margin-bottom: 15px;
    position: relative;

    .anonymous-tag {
      position: absolute;
      left: 0px;
      top: 9px;
    }
  }
  .tip-content{
    padding-left: 70px;
  }
  /** */
  .footer {
    width: 100vw;
    height: 200px;
    background-color: black;
  }
}
</style>
