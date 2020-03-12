<template>
  <div class="mytips">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有树洞" name="alltips">
        <div class="alltips">
          <!-- <p style="color:#999;margin-bottom:20px"></p> -->
          <div v-for="item in allArticle" :key="item.topicID" class="tip-item">
            <el-tag type="warning" effect="dark" class="anonymous-tag" v-if="item.isName == '不匿名'">不匿名</el-tag>
            <el-tag type="info" effect="dark" class="anonymous-tag" v-if="item.isName == '已匿名'">匿名</el-tag>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <span>标题：{{ item.title }}</span>
                </template>
                <div class="tip-content">
                  <div v-html="item.contentery"></div>
                  <div class="tip-time">
                    <div>
                      <i class="el-icon-view"></i> <span style="display:inline-block;width:30px;"> {{ item.browseCount }}</span>
                    </div>
                    <div style="cursor: pointer;">
                      <i class="el-icon-chat-line-square"></i> <span style="display:inline-block;width:30px;"> {{ item.replyCount }}</span>
                    </div>
                    <div>
                      <i class="el-icon-timer"></i> <span style="display:inline-block;width:166px;"> {{ item.time }}</span>
                    </div>
                  </div>
                </div>
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
      articlenum: '' //树洞数

    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  created() {
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
  },
  mounted(){
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
.mytips{
/**树洞 */
  .el-collapse-item__header {
    display: flex;
    justify-content: space-between;
    padding-left: 70px;
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
      &>.is-active {
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
