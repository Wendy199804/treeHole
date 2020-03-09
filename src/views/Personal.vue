<template>
  <div class="personal">
    <Navigate :defaultIndex="defaultIndex" :isLogin="isLogin" :loginuser="user"></Navigate>
    个人中心
    <div>{{allArticle}}</div>
    <div>{{articlenum}}</div>
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
  allArticle:'',//所有树洞
  articlenum:'',//树洞数
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
    /**查看登录状态 */
    // console.log(JSON.parse(utils.getCookie('user')))
    // let usermsg = JSON.parse(utils.getCookie('user'))
    // if (usermsg) {
    //   this.isLogin = true
    //   this.user = usermsg
    //   console.log(this.user)
    // } else {
    //   this.isLogin = false
    // }
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
  },
  mounted() {
    /**获取本人的所有树洞 */
    console.log(this.user.nickname)
    http.post('/api/UserTree', { nickname: this.user.nickname }).then(res => {
      console.log(res.data)
      if(res.data.length == 0){
        this.allArticle = '空'
      }else{
      this.allArticle = res.data
      }
    })
    /**本人所有树洞数 */
    http.post('/api/UserTreeNum',{ nickname: this.user.nickname }).then(res => {
      console.log(res.data)
      this.articlenum = res.data
    })
  }
}
</script>

<style lang="scss">
.personal{
  margin-top: 35px;
}
</style>
