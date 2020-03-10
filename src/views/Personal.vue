<template>
  <div class="personal">
    <Navigate :defaultIndex="defaultIndex" :isLogin="isLogin" :loginuser="user"></Navigate>
    我的所有树洞
    <div v-for="item in allArticle" :key="item.topicID">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <span>{{item.title}}</span>
            <!-- <i class="header-icon el-icon-info"></i>  -->
            <span>{{item.time}}</span>
            </template>
          <div>习近平指出，在这场严峻斗争中，湖北各级党组织和广大党员、干部冲锋在前、英勇奋战，全省医务工作者和援鄂医疗队员白衣执甲、逆行出征，人民解放军指战员闻令即动、勇挑重担，广大社区工作者、公安干警、基层干部、下沉干部、志愿者不惧风雨、坚守一线，广大群众众志成城、踊跃参与，涌现出一大批可歌可泣的先进典型和感人事迹。</div>
        </el-collapse-item>
        
      </el-collapse>
    </div>
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
      console.log('--------------')
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
  }
}
</script>

<style lang="scss">
.personal {
  margin-top: 35px;
}
</style>
