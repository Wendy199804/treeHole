import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'
// import ElementUI from 'element-ui'

Vue.use(Vuex)
// Vue.use(ElementUI)

export default new Vuex.Store({
  state: {
    user:{
      username:'',//用户名
      nickname:'', // 发表昵称
      replynickname:'' // 回复昵称
    },
    isLogin:false,
    classes:[  // 树洞类别
      {
        value: '心情',
        label: '心情'
      },
      {
        value: '烦恼',
        label: '烦恼'
      },
      {
        value: '吐槽',
        label: '吐槽'
      },
      {
        value: '秘密',
        label: '秘密'
      }
    ],
    allTips:'',//树洞列表
    allanonymousTips:''
  },
  mutations: {
    /**查看登录状态 */
    ifLogin(state) {
      let usermsg = JSON.parse(utils.getCookie('user'))
      if (usermsg) {
        state.isLogin = true
        state.user = usermsg
      } else {
        state.isLogin = false
      }
    },
    /**首页获取所有不匿名树洞 */
    getALLtips(state,data){
      state.allTips = data
      console.log(state.allTips)
    },
    /**首页获取所有匿名树洞 */
    getAllanonymous(state,data){
      state.allanonymousTips = data
    },
    /**查看评论 */
    checkReply(state,data){
      state.allTips[data.index].ischeckReply = true
      let params = {
        nickname: state.user.nickname,
        topicid: data.topicid
      }
      http.post('/api/ReplyDetails', params).then(res => {
        state.allTips[data.index].allReply = res.data
      })
    },
    /**发表评论 */
    postReply(state,data){
      // let that = this
      let params = {
        nickname: state.user.nickname,
        topicid: data.topicid,
        replycontentery: state.allTips[data.index].replycontentery
      }
      http.post('/api/InsertReply', params).then(res => {
        if (res.data == 'success') {
          data.that.$notify({
            title: '评论成功',
            message: '',
            type: 'success'
          })
          state.allTips[data.index].replycontentery = ''
        } else {
          data.that.$notify({
            title: '发生了一些未知的错误',
            message: '',
            type:'error'
          })
        }
      })
    },
    
  },
  actions: {
    /**首页获取所有非匿名树洞 */
    getALLtips_asyn(context){
      http.get('/api/TreeHole').then(res => {
        res.data.forEach(item => {
          item.replycontentery = ''
          item.ischeckReply = false
          item.allReply = ''
        })
        context.commit('getALLtips',res.data)
      })
    },

    /**首页获取所有匿名树洞 */
    getAllanonymous_asyn(context){
      http.get('/api/TreeHoleNotName').then(res => {
        res.data.forEach(item => {
          item.replycontentery = ''
          item.ischeckReply = false
          item.allReply = ''
        })
        console.log(res.data)
        context.commit('getAllanonymous',res.data)
      })
    },
    /**查看树洞详情 */
    checkDetails(context,topicid) {
      http.post('/api/TreeDetails', { topicid }).then(res => {
        console.log(res.data[0])
      })
    },
    /**搜索关键字 */
    searchKeywords(context,searchTipValue) {
      console.log(searchTipValue)
      let params = { selectv: searchTipValue }
      http.post('/api/SelectTree', params).then(res => {
        console.log(res.data)
      })
    },
    /**发布树洞 */
    submitTip(context,data){
      http.post('/api/InsertTree', data.params).then(res => {
        console.log(res)
        if (res.data === 'success') {
          data.that.$message({
            type: 'success',
            message: '发布成功!'
          })
        }else{
          data.that.$message({
            type: 'error',
            message: '发布失败!'
          })
        }
      })
    }
  },
  modules: {
  }
})
