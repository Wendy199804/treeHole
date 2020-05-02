<template>
  <div class="mycomments">
    {{ tips }}
    <div>
      <div class="comment-item" v-for="(item, index) in commentslist" :key="index">
        <p class="top">
          我 <span style="color:#EB7350">@{{ item.replyNickName }}</span> 回复<span style="color:#EB7350">@{{ item.nickName }}</span
          >：<span style="font-weight:800;color:#333">{{ item.reContentery }}</span>
        </p>
        <p class="second">
          at <span style="font-size:13px">{{ item.createdOn }}</span>
        </p>
        <div style="background:#eee;padding:10px;border-radius: 5px;">
          <p>
            树洞标题：<span style="color:#B27136">{{ item.title }}</span>
          </p>
          <p>树洞类别：{{ item.classname }}</p>
    <span  style="color:#B27136;font-size:12px">{{ item.time }}</span>
        </div>
        
        
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'

export default {
  data() {
    return {
      user: '',
      isLogin: '',
      tips: '',
      commentslist: '', //评论集合
    }
  },
  mounted() {
    console.log(2)
  },
  created() {
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
    http.post('http://www.maown.net:8000/api/UserReply', { nickname: this.user.nickname }).then(res => {
      console.log(res.data)
      if (res.data.length !== 0) {
        this.commentslist = res.data
      } else {
        this.tips = ''
      }
    })
  },
}
</script>

<style lang="scss">
.mycomments {
  .comment-item {
    width: 95%;
    padding: 20px 20px;
    border: 1px solid #eeeeee;
    margin: 0 auto;
    margin-bottom: 15px;
    border-radius: 10px;
    box-sizing: border-box;

    .top {
        margin-bottom: 5px;
    }
    .second {
      text-align: right;
      color: #999;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 8px;
      margin-bottom: 8px;
      box-sizing: border-box;
    }
  }
}
</style>
