<template>
  <div class="mytips">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有树洞" name="alltips">
        <div class="alltips">
          <!-- <p style="color:#999;margin-bottom:20px"></p> -->
          <div v-for="(item, index) in allArticle" :key="item.topicID" class="tip-item">
            <el-popover placement="top" width="160" v-model="item.delete">
              <p>确定删除这一条树洞吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteTip(item.topicID, $store.state.user.nickname, index)">确定</el-button>
              </div>
              <i slot="reference" class="el-icon-circle-close" style="position:absolute;top:16px;right:0px;cursor:pointer" title="删除"></i>
            </el-popover>
            <el-tag type="warning" effect="dark" class="anonymous-tag" v-if="item.isName == '不匿名'">不匿名</el-tag>
            <el-tag type="info" effect="dark" class="anonymous-tag" v-if="item.isName == '已匿名'">匿名</el-tag>
            <el-collapse accordion title="查看详情">
              <el-collapse-item>
                <template slot="title">
                  <span title="标题">标题：{{ item.title }}</span>
                </template>
                <div class="tip-content">
                  <div v-html="item.contentery"></div>
                  <div class="tip-time">
                    <div>
                      <i class="el-icon-view"></i> <span style="display:inline-block;width:30px;"> {{ item.browseCount }}</span>
                    </div>
                    <div style="cursor: pointer;" @click="lookReply(item.nickName,item.topicID)">
                      <i class="el-icon-chat-line-square"></i> <span style="display:inline-block;width:30px;"> {{ item.replyCount }}</span>
                    </div>
                    <div>
                      <i class="el-icon-timer"></i> <span style="display:inline-block;width:166px;"> {{ item.time }}</span>
                    </div>
                  </div>
                  
                </div>
                <div>22</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="匿名树洞" name="second">匿名树洞</el-tab-pane>
      <el-tab-pane label="非匿名树洞" name="third">非匿名树洞</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'
export default {
  data() {
    return {
      activeName: 'alltips',
      isLogin: false, //是否登录
      user: '', //登录用户
      allArticle: '', //所有树洞
      articlenum: '', //树洞数
      visible: false //弹出框是否可见
    }
  },
  methods: {
    /**删除树洞 */
    deleteTip(topicid, nickname, index) {
      this.allArticle[index].delete = true
      console.log(topicid, nickname)
      http
        .post('/api/UserTreeDel', { topicid, nickname })
        .then(res => {
          console.log(res)
          if (res.data == 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            http.post('/api/UserTree', { nickname }).then(res => {
              if (res.data.length == 0) {
                this.allArticle = '空'
              } else {
                res.data.forEach(item => {
                  item.delete = false
                })
                this.allArticle = res.data
                console.log(this.allArticle)
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
    },
    lookReply(nickname,topicid){
      console.log(nickname,topicid)
      http.post('/api/ReplyDetails',{nickname,topicid}).then(res => {
        console.log(res)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
        res.data.forEach(item => {
          item.delete = false
        })
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
.mytips {
  /**树洞 */
  .el-collapse-item__header {
    display: flex;
    justify-content: space-between;
    padding-left: 70px;
    padding-right: 30px;
    box-sizing: border-box;
    span {
      margin-right: 20px;
    }
  }
  .tip-time {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    color: #999;
    font-size: 14px;
    position: absolute;
    bottom: -30px;
    right: -22px;
  }
  .alltips {
    width: 100%;
    margin: 0px auto 30px auto;
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
  .tip-content {
    padding-left: 70px;
    position: relative;
    box-sizing: border-box;
  }
  .mini-navigation {
    width: 70%;
    min-width: 800px;
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
    }
  }
}
</style>
