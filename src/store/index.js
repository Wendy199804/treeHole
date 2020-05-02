import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'
// import ElementUI from 'element-ui'

Vue.use(Vuex)
// Vue.use(ElementUI)

export default new Vuex.Store({
  state: {
    user: {
      username: '', //用户名
      nickname: '', // 发表昵称
      replynickname: '' // 回复昵称
    },
    userinfo: '',
    isLogin: false,
    classes: [
      // 树洞类别
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
    allTips: '', //非匿名树洞列表
    allanonymousTips: '', //匿名树洞列表
    currenttip: '', //当前树洞详情
    currentcomment: '', //当前详情中的评论
    searchTips: '' ,//搜索结果列表
    loading:false,
    mysupportlist:'',//我的支持
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
    getALLtips(state, data) {
     
        state.allTips = data
      
    },
    /**首页获取所有匿名树洞 */
    getAllanonymous(state, data) {
      state.allanonymousTips = data
    },
    /**获取我的支持 */
    getMySupport(state,data){
      state.mysupportlist = data
    },
    /**查看评论 */
    checkReply(state, data) {
      // console.log(data.index)
      if (data.index !== undefined) {
        //打开非详情页评论
        let params = {
          nickname: state.user.nickname,
          topicid: data.topicid
        }
        if (!data.bool) {//非匿名树洞评论
          state.allTips[data.index].ischeckReply = true
          http.post('http://www.maown.net:8000/api/ReplyDetails', params).then(res => {
            state.allTips[data.index].allReply = res.data
          })
        }else{//匿名树洞评论
          state.allanonymousTips[data.index].ischeckReply = true
          http.post('http://www.maown.net:8000/api/ReplyDetails', params).then(res => {
            state.allanonymousTips[data.index].allReply = res.data
          })
        }
      } else {
        //打开详情页评论
        http
          .post('http://www.maown.net:8000/api/ReplyDetails', {
            nickname: data.nickname,
            topicid: data.topicid
          })
          .then(res => {
            state.currentcomment = res.data
          })
      }
      // console.log(state.currentcomment)
    },
    /**发表评论 */
    postReply(state, data) {
      // let that = this
      let params = {}
      let ishome = false
      if (data.index !== '') {
        ishome = true
        params = {
          nickname: state.user.nickname,
          topicid: data.topicid,
          replycontentery: state.allTips[data.index].replycontentery
        }
      } else if (data.index == '') {
        params = {
          nickname: state.user.nickname,
          topicid: data.topicid,
          replycontentery: data.content
        }
      }

      http.post('http://www.maown.net:8000/api/InsertReply', params).then(res => {
        if (res.data == 'success') {
          data.that.$notify({
            title: '评论成功',
            message: '',
            type: 'success'
          })
          if (ishome) {
            state.allTips[data.index].replycontentery = ''
          }
        } else {
          data.that.$notify({
            title: '发生了一些未知的错误',
            message: '',
            type: 'error'
          })
        }
      })
    },
    /**登录 */
    // sign_in(state,params){
    //   state.userinfo = params
    //   console.log(state.userinfo)
    // }
    /**查看树洞详情 */
    checkDetails(state, params) {
      state.currenttip = params
      // console.log(params)
    },
    /**树洞详情中显示评论 */
    curComment(state, params) {
      state.currentcomment = params
      // console.log(state.currentcomment)
    },
    /**搜索 */
    searchKeywords(state, params) {
      state.searchTips = params
      // console.log(state.searchTips)
    }
  },
  actions: {
    /**登录 */
    sign_in_asyn(context, params) {
      // console.log(params)
      let that = this
      http.post('http://www.maown.net:8000/api/User', params.signmsg).then(res => {
        if (res.data.length !== 0) {
          // console.log(res.data)
          params.that.$message({
            showClose: true,
            message: '恭喜你，登录成功',
            type: 'success'
          })
          params.that.$router.push({
            name: 'home'
          })
          let user = {
            username: res.data[0].username, //用户名
            nickname: res.data[0].nickname, //发表昵称
            replynickname: res.data[0].replynickname, //回复昵称
            sex: res.data[0].sex, //性别
            number: res.data[0].number, //学号
            topiccount: res.data[0].topiccount, //树洞数
            tipnumber: res.data[0].tipnumber //被举报数
          }
          utils.setCookie('user', JSON.stringify(user), 2)
          // context.commit('sign_in',res.data[0])
        } else {
          params.that.$message({
            showClose: true,
            message: '登录失败',
            type: 'error'
          })
        }
      })
    },
    /**首页获取所有非匿名树洞 */
    getALLtips_asyn(context,state) {
      let usermsg = JSON.parse(utils.getCookie('user'))

      http.get('http://www.maown.net:8000/api/TreeHole').then(res => {
        res.data.forEach(item => {
          item.replycontentery = ''
          item.ischeckReply = false
          item.allReply = ''
          item.reportbtn= false
        })
        // console.log(res.data)
        if(usermsg){
          http.post('http://www.maown.net:8000/api/SupportList', {
            nickname: usermsg.nickname
          }).then(res2 => {
            // console.log(res2.data)
            if (res2.data.length !== 0) {
              let newarr1 = res.data.map(item1 => {
                item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID) 
                // console.log(item1.flag)
                  return item1
              })
              console.log(newarr1)
              context.commit('getALLtips', newarr1)
            }else{
              context.commit('getALLtips', res.data)
            }
            // console.log(this.tree_articlelist.moodlist)
          })
        }else{
          context.commit('getALLtips', res.data)
        }
        
        
      })
    },

    /**首页获取所有匿名树洞 */
    getAllanonymous_asyn(context) {
      let usermsg = JSON.parse(utils.getCookie('user'))

      http.get('http://www.maown.net:8000/api/TreeHoleNotName').then(res => {
        res.data.forEach(item => {
          item.replycontentery = ''
          item.ischeckReply = false
          item.allReply = ''
          item.reportbtn= false
        })
        // console.log(res.data)
        if(usermsg){
          http.post('http://www.maown.net:8000/api/SupportList', {
            nickname: usermsg.nickname
          }).then(res2 => {
            // console.log(res2.data)
            if (res2.data.length !== 0) {
              let newarr1 = res.data.map(item1 => {
                item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID) 
                // console.log(item1.flag)
                  return item1
              })
              console.log(newarr1)
              context.commit('getAllanonymous', newarr1)
            }else{
              context.commit('getAllanonymous', res.data)
            }
            // console.log(this.tree_articlelist.moodlist)
          })
        }else{
          context.commit('getAllanonymous', res.data)
        }
      })
    },
    /**获取所有我的支持 */
    getMySupport_asyn(context){
      http.post('http://www.maown.net:8000/api/SupportList', {
        nickname: state.user.nickname
      }).then(res => {
        context.commit('getMySupport',res.data)
      })
    },
    /**查看树洞详情 */
    checkDetails_asyn(context, params) {
      http
        .post('http://www.maown.net:8000/api/TreeDetails', {
          topicid: params.topicid
        })
        .then(res => {
          context.commit('checkDetails', res.data[0])
        })
      http
        .post('http://www.maown.net:8000/api/ReplyDetails', {
          topicid: params.topicid,
          nickname: params.nickname
        })
        .then(res => {
          context.commit('curComment', res.data)
        })
    },
    /**搜索关键字 */
    searchKeywords_asyn(context, searchTipValue) {
      let params = {
        selectv: searchTipValue
      }
      http.post('http://www.maown.net:8000/api/SelectTree', params).then(res => {
        context.commit('searchKeywords', res.data)
      })
    },
    /**发布树洞 */
    submitTip(context, data) {
      http.post('http://www.maown.net:8000/api/InsertTree', data.params).then(res => {
        // console.log(res)
        if (res.data === 'success') {
          data.that.$message({
            type: 'success',
            message: '发布成功!'
          })
        } else {
          data.that.$message({
            type: 'error',
            message: '发布失败!'
          })
        }
      })
    }
  },
  modules: {}
})
