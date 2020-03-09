<template>
  <div class="quillEditor">
    发表树洞
    <div>标题：<input type="text" v-model="editorTitle" placeholder="请输入标题"></div>
    <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
    <el-button type="primary" @click="submit">提交</el-button>
  <div v-html="content"></div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from '@/utils/quill-title.js'
export default {
  data() {
    return {
      content: '',//默认显示的内容
      editorOption: {
        // theme:'bubble'
        placeholder: '在这里畅所欲言吧！',
        content:'',//编辑器内容
        editorTitle:'',//标题
      }
    }
  },
  methods: {
    submit() {
      this.content = this.$refs.text.value
      console.log(this.$refs.text.value)
      console.log(this.editorTitle)
    }
  },
  mounted(){
    addQuillTitle();
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss">
.quillEditor {
  width: 800px;
  height: 600px;
  margin: 0 auto;

  position: relative;
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
