<template>
  <div class="home">
    <Navigate :defaultIndex="defaultIndex" :isLogin="isLogin" :loginuser="user"></Navigate>
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in carouselimgArr" :key="item.id">
          <div style="width:100%;height:100%">
            <img :src="item.src" alt="" class="carousel-img"  style="width:100%;height:100%"/>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-content-wrap">
      <div class="home-content-left">
        <div class="content-search">
          <div class="input_wrap">
            <span></span>
            <el-input placeholder="请输入标题..." v-model="searchTipValue" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="不匿名的树洞" name="first">
            <div v-if="allTips.length <= 0" class="if-alltips-ready"><i class="el-icon-loading"></i></div>
            <div class="tips" v-if="allTips.length > 0">
              <div v-for="(item, index) in allTips" :key="item.topicID" class="tips-item">
                <div class="tips-item-top">
                  <div class="tips-item-left">
                    <div class="tip-head"></div>
                  </div>
                  <div class="tips-item-right">
                    <div class="ut">
                      <div class="username">
                        <p>{{ item.nickName }}</p>
                      </div>
                      <div class="time">
                        <p>{{ item.time }}</p>
                      </div>
                    </div>

                    <div class="title">
                      <p>{{ item.title }}</p>
                    </div>
                    <div class="contentery">
                      <p>{{ item.contentery }}</p>
                    </div>
                  </div>
                </div>
                <div class="tips-item-bottom">
                  <div style="border-right:1px solid #999999;"><i class="el-icon-view"></i>{{ item.browseCount }}</div>
                  <div style="cursor:pointer;border-right:1px solid #999999;" @click="checkReply(item.topicID, index)"><i class="el-icon-chat-line-square"></i>{{ item.replyCount }}</div>
                  <div style="cursor:pointer" @click="checkDetails(item.topicID)"><i class="el-icon-info"></i>详情</div>
                </div>
                <div v-if="item.ischeckReply" class="reply-item">
                  <div class="triangle"></div>
                  <div class="myreply">
                    <el-input type="text" placeholder="发表你的见解" v-model="item.replycontentery" maxlength="50" show-word-limit> </el-input>
                    <button v-if="item.replycontentery !== ''" class="replybtn" @click="postReply(item.topicID, index)">评论</button>
                    <el-button v-if="item.replycontentery == ''" type="info" disabled>评论</el-button>
                  </div>
                </div>
                <div class="all-reply">
                  <div v-for="(allReply_item, allReply_index) in item.allReply" :key="allReply_index" class="all-reply-item">
                    <span class="re-username">{{ allReply_item.replyNickName }}</span
                    >:
                    <span class="re-content">{{ allReply_item.reContentery }}</span>
                    <p class="re-time">{{ allReply_item.createdOn }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="匿名树洞" name="second">
            <div v-if="allanonymousTips.length <= 0" class="if-alltips-ready"><i class="el-icon-loading"></i></div>
            <div class="tips" v-if="allanonymousTips.length > 0">
              <div v-for="(item, index) in allanonymousTips" :key="item.topicID" class="tips-item">
                <div class="tips-item-top">
                  <div class="tips-item-left">
                    <div class="tip-head"></div>
                  </div>
                  <div class="tips-item-right">
                    <div class="ut">
                      <div class="username">
                        <p>{{ item.nickName }}</p>
                      </div>
                      <div class="time">
                        <p>{{ item.time }}</p>
                      </div>
                    </div>

                    <div class="title">
                      <p>{{ item.title }}</p>
                    </div>
                    <div class="contentery">
                      <p>{{ item.contentery }}</p>
                    </div>
                  </div>
                </div>
                <div class="tips-item-bottom">
                  <div style="border-right:1px solid #999999;"><i class="el-icon-view"></i>浏览</div>
                  <div style="cursor:pointer;border-right:1px solid #999999;" @click="checkReply(item.topicID, index)"><i class="el-icon-chat-line-square"></i>{{ item.replyCount }}</div>
                  <div style="cursor:pointer" @click="checkDetails(item.topicID)"><i class="el-icon-info"></i>详情</div>
                </div>
                <div v-if="item.ischeckReply" class="reply-item">
                  <div class="triangle"></div>
                  <div class="myreply">
                    <el-input type="text" placeholder="发表你的见解" v-model="item.replycontentery" maxlength="50" show-word-limit> </el-input>
                    <button v-if="item.replycontentery !== ''" class="replybtn" @click="postReply(item.topicID, index)">评论</button>
                    <el-button v-if="item.replycontentery == ''" type="info" disabled>评论</el-button>
                  </div>
                </div>
                <div class="all-reply">
                  <div v-for="(allReply_item, allReply_index) in item.allReply" :key="allReply_index" class="all-reply-item">
                    <span class="re-username">{{ allReply_item.replyNickName }}</span
                    >:
                    <span class="re-content">{{ allReply_item.reContentery }}</span>
                    <p class="re-time">{{ allReply_item.createdOn }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="home-content-right">
        <!-- <div class="wx-erwm"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigate from '@/components/Navigate.vue'
import http from '@/utils/http.js'
import utils from '@/utils/utils.js'

import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      defaultIndex: '1',
      allTips: [], //所有不匿名树洞
      allanonymousTips: [],
      searchTipValue: '', //搜索内容
      isLogin: false, //是否登录
      user: {
        username: '', //用户名
        nickname: '', //发表昵称
        replynickname: '' //回复昵称
      }, //当前登录用户
      // replycontentery: '', //评论内容
      // allReply: '', //全部评论
      // ischeckReply: '' //是否查看评论
      activeName: 'first',
      carouselimgArr: [{
        id:'1',
        src:'../assets/carousel_img1.jpg'
      }, 
      {
        id:'2',
        src:'../assets/carousel_img2.jpg'
      }, 
      {
        id:'3',
        src:'../assets/carousel_img3.jpg'
      }, 
      {
        id:'4',
        src:'../assets/carousel_img4.jpg'
      }, 
      ]
    }
  },
  components: {
    Navigate
  },
  methods: {
    /**搜索关键字 */
    search() {
      this.$store.dispatch('searchKeywords', this.searchTipValue)
    },
    /**查看树洞详情 */
    checkDetails(topicid) {
      this.$store.dispatch('checkDetails', topicid)
    },
    /**查看评论 */
    checkReply(topicid, index) {
      this.$store.commit('checkReply', { topicid, index })
    },
    /**点击按钮  发表评论
     * index 为总索引 为了确定唯一的 replycontentery
     */
    postReply(topicid, index) {
      let that = this // store中的this和这里的this不同，所以要把this也传过去
      this.$store.commit('postReply', { topicid, index, that })
      this.checkReply(topicid, index)
    },
    handleClick(tab, event) {
      console.log(tab.name)
      if (tab.name === 'second') {
        this.$store.dispatch('getAllanonymous_asyn')
        let getALLtips = setInterval(() => {
          this.allanonymousTips = this.$store.state.allanonymousTips
          if (this.allanonymousTips.length > 0) {
            clearInterval(getALLtips)
          }
        }, 500)
      }
    }
  },
  mounted() {
    /**首页获取所有树洞 */
    let getALLtips = setInterval(() => {
      this.allTips = this.$store.state.allTips
      if (this.allTips.length > 0) {
        clearInterval(getALLtips)
      }
    }, 500)
    console.log(this.$store.state.userinfo)
  },
  created() {
    /**查看登录状态 */
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
    this.$store.dispatch('getALLtips_asyn')
  }
}
</script>

<style lang="scss" scope>
.home {
  // height: 100vh;
  // background-image: url(../assets/body_bg.jpg);
  // background-repeat: no-repeat;
  // background-color: rgb(27, 33, 69);
  // background-attachment: fixed;
  min-width: 900px;
  .if-alltips-ready {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      color: #fff;
      font-size: 30px;
    }
  }
  .el-tabs--top {
    margin-top: 20px;
  }
  .el-tabs__nav .is-active {
    color: #000;
    font-weight: bold;
  }
  .el-tabs__item {
    color: #999;
  }
  .el-tabs__item:hover {
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }
  .el-tabs__active-bar {
    background-color: #000;
  }
  .el-tabs__nav-wrap::after {
    background-color: #999;
  }
  .input_wrap {
    width: 358px;
    line-height: 35px;
    outline: none;
    .el-input__inner {
      width: 300px;
    }
    .el-input-group__append button.el-button {
      background-color: #ffd04b;
      border-radius: 0 4px 4px 0;
    }
    .el-input__inner:focus {
      border: 1px solid #ffd04b;
      outline: none;
    }
  }
  .banner {
    margin: 60px auto;
    margin-top: 80px;
    width: 1100px;
    height: 200px;
  }
  .tips {
    margin: 0 auto;
    width: 97%;
  }
  .tips-item {
    width: 97%;
    padding: 15px;
    padding-bottom: 0px;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: white;
    box-sizing: border-box;
    box-shadow: 1px 1px 10px rgb(187, 187, 187);
  }
  .tips-item-top {
    display: flex;
    justify-content: flex-start;
  }
  .tips-item-left {
    width: 70px;
    .tip-head {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #ffd04b;
    }
  }
  .tips-item-right {
    width: 100%;
    .username {
      font-weight: bold;
      font-size: 16px;
    }
    .time {
      font-weight: 300;
      color: #999999;
      font-size: 10px;
    }
    .title {
      font-size: 16px;
      margin-top: 8px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .contentery {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
    }
  }
  .tips-item-bottom {
    height: 30px;
    margin-top: 10px;
    font-size: 12px;
    color: #999999;
    display: flex;
    justify-content: space-between;
    div {
      width: 33%;
      text-align: center;
      line-height: 30px;
    }
  }
  .reply-item {
    border-top: 1px solid #1b2143;
    margin-top: 5px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    position: relative;
    .triangle {
      position: absolute;
      left: 50%;
      top: -17px;
      transform: translateX(-50%);
      border-top: 8px solid transparent;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid #1b2143;
    }
    .el-input {
      width: 400px;
    }
    .el-input__inner:focus {
      border: 1px solid #1b2143;
    }
    .myreply {
      width: 500px;
      display: flex;
      justify-content: space-around;
      padding-bottom: 10px;
      border-bottom: 1px dashed #1b2143;
    }
  }
  .replybtn {
    width: 70px;
    border-radius: 5px;
    border: 1px solid #3e526e;
    background-color: #3e526e;
    color: white;
    cursor: pointer;
  }
  .is-plain:hover {
    border-color: #3e526e;
    background-color: #3e526e;
  }
  .all-reply {
    margin-top: 10px;
  }
  .all-reply-item {
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }
  .re-username {
    color: #1b2143;
    font-weight: bold;
    font-size: 14px;
  }
  .re-content {
    color: #333333;
    font-size: 14px;
  }
  .re-time {
    color: #999999;
    font-size: 12px;
  }
  .home-content-wrap {
    width: 1100px;
    min-width: 900px;
    margin: 0 auto;
    // padding: 20px;
    // box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    // border-radius: 5px;
    // box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.589);

    // border-radius: 2px;
  }
  .home-content-left {
    width: 50%;
  }
  .input_wrap {
    margin: 0 auto;
  }
  .home-content-right {
    border: 1px solid black;
    width: 45%;
    // display: flex;
    // justify-content: flex-end;
    .wx-erwm {
      width: 200px;
      height: 200px;
      background-color: rgb(90, 73, 73);
    }
  }
  .ut {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
 
}
</style>
