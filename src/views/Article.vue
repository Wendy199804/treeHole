<template>
  <div class="article">
    <Navigate :defaultIndex="defaultIndex" :isLogin="isLogin" :loginuser="user"></Navigate>
    <div class="quillEditor">
      <p>发表树洞</p>

      <div>标题：<input type="text" v-model="editortitle" placeholder="请输入标题" /></div>
      <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
      <div>
        <span>是否匿名发布</span>
        <el-tooltip :content="anonymous" placement="top">
          <el-switch v-model="anonymous" active-color="#13ce66" inactive-color="#ff4949" active-value="匿名发布" inactive-value="正常发布"> </el-switch>
        </el-tooltip>
      </div>
      <div>
        选择类别:<el-select v-model="category" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="submit">提交</el-button>
      <!-- <div v-html="content"></div> -->
    </div>
  </div>
</template>

<script>
import Navigate from '@/components/Navigate.vue'
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'

/**富文本编辑器**/
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from '@/utils/quill-title.js'
/*** */
export default {
  data() {
    return {
      defaultIndex: '4',
      content: '', //默认显示的内容
      editorOption: {
        // theme:'bubble'
        placeholder: '在这里畅所欲言吧！',
        content: '', //编辑器内容
        editorTitle: '' //标题
      },
      editortitle: '', //标题
      isLogin: false, //是否登录
      user: '', //登录用户
      anonymous: '匿名发布', // 是否匿名
      options: '', //树洞类别
      category: ''
    }
  },
  components: {
    Navigate,
    quillEditor
  },
  methods: {
    //点击提交
    submit() {
      this.content = this.$refs.text.value
      console.log(this.$refs.text.value)
      console.log(this.editortitle)
      let params = {
        classname: this.category,
        nickname: this.user.nickname,
        title: this.editortitle,
        contentery: this.content,
        isname: this.anonymous
      }
      console.log(params)
      let anonymity_type = ''
      if (params.isname === '正常发布') {
        anonymity_type = '非匿名'
      } else if (params.isname === '匿名发布') {
        anonymity_type = '匿名'
      }
      console.log(anonymity_type)
      this.$confirm(`你将发布一条${anonymity_type}的树洞, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let that = this
          this.$store.dispatch('submitTip', { params, that })
          that.$router.push({name:'home'})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    },
    //验证
    verification() {}
  },
  mounted() {
    addQuillTitle()
  },
  created() {
    /**查看登录状态 */
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
    this.options = this.$store.state.classes
  }
}
</script>

<style lang="scss">
.article{
  margin-top: 35px;

}
.quillEditor {
  width: 600px;
  min-width: 600px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  border: 1px solid red;
  .myQuillEditor {
    width: 100%;
    height: 100%;
    .ql-container {
      height: 534px;
    }
  }
  
  .el-button--primary {
    position: absolute;
    right: 0px;
  }
}
</style>
