<template>
  <div class="article">
    <Navigate :defaultIndex="defaultIndex" :isLogin="isLogin" :loginuser="user"></Navigate>
    <div class="quillEditor">
      <p>发表树洞</p>
      <div class="publish-tip"><input type="text" v-model="editortitle" placeholder="请输入标题" /></div>
      <quill-editor ref="text" v-model="content" :options="editorOption" class="myQuillEditor"> </quill-editor>
      <div class="tip-conditions">
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
      </div>

      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigate from '@/components/Navigate.vue'
import Footer from '@/components/Footer.vue'
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'

/**富文本编辑器**/
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill'
import { addQuillTitle } from '@/utils/quill-title.js'
let fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['12px', '14px', '16px', '20px', '24px', '36px']
Quill.register(fontSizeStyle, true)
/*** */
export default {
  data() {
    return {
      defaultIndex: '4',
      editortitle: '', //标题
      isLogin: false, //是否登录
      user: '', //登录用户
      anonymous: '匿名发布', // 是否匿名
      options: '', //树洞类别
      category: '',
      content: '',
      editorOption: {
        placeholder: '在这里畅所欲言吧！',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'], //加粗，斜体，下划线，删除线
            [{ color: [] }], // 字体颜色，字体背景颜色
            [{ align: [] }], //对齐方式
            [{ size: fontSizeStyle.whitelist }], // 字体大小
            [{ list: 'ordered' }, { list: 'bullet' }] //列表
          ]
        },
        theme: 'snow'
      }
    }
  },
  components: {
    Navigate,
    quillEditor,
    Footer
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    //点击提交
    submit() {
      this.content = this.$refs.text.value
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
      this.$confirm(`你将发布一条${anonymity_type}的树洞, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let that = this
          this.$store.dispatch('submitTip', { params, that })
          that.$router.push({ name: 'home' })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    }
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
.article {
  margin-top: 70px;
  .quillEditor {
    width: 600px;
    min-width: 600px;
    // height: 550px;
    padding-bottom: 50px;
    margin: 0 auto;
    position: relative;
    & > p {
      text-align: center;
      position: relative;
      color: #999;
      font-family: 幼圆;
      font-size: 20px;
      margin-bottom: 30px;
      &::before,
      &::after {
        content: '';
        display: block;
        width: 300px;
        height: 1px;
        background-color: rgba(153, 153, 153, 0.418);
        position: absolute;
        top: 12px;
      }
      &::before {
        left: -70px;
      }
      &::after {
        right: -70px;
      }
    }
    .ql-toolbar.ql-snow {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    } 
    .myQuillEditor {
      width: 100%;
      height: 100%;
      .ql-container {
        height: 500px;
      }
    }
    .el-button--primary {
      position: absolute;
      right: 0px;
    }
  }
  .publish-tip {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 40px;
    padding-top: 20px;
    input {
      border: none;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 20px;
    }
  }
  .ql-toolbar {
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }
  .tip-conditions{
    display:flex;
    justify-content: space-between;
    margin: 15px 0;
    &>div:nth-child(1){
      width:30%;
      display: flex;
      align-items: center;
    }
    &>div{
      width:50%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    &>div:nth-child(2){
      justify-content: space-between;
    }
  }
 .el-button--primary{
    background-color: black;
    border: none;
  }
}
</style>
