<template>
  <div class="newsecret">
    <Navigate  :isLogin="isLogin" :loginuser="user"></Navigate>

    修改密码
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="pre_pass">
        <el-input type="password" v-model="ruleForm.pre_pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import Navigate from '@/components/Navigate.vue'
import Footer from '@/components/Footer.vue'
import utils from '@/utils/utils.js'
import http from '@/utils/http.js'

export default {
  data() {
   var validatePre_pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pre_pass:'',//原密码
        pass: '',//新密码
        checkPass: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        pre_pass: [{ validator: validatePre_pass, trigger: 'blur' }],
      },
      user:'',
      isLogin:'',
    }
  },
  components: {
    Navigate,
    Footer
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            nickname:this.user.nickname,
            assword:this.ruleForm.pre_pass,
            conpassword:this.ruleForm.pass
          }
          console.log(params)
          http.post('api/ResetPass',params).then(res => {
            console.log(res.data)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
   
  },
 created() {
    /**查看登录状态 */
    this.$store.commit('ifLogin')
    this.user = this.$store.state.user
    this.isLogin = this.$store.state.isLogin
    console.log(this.user)
  }
}
</script>

<style lang="scss">
.newsecret{
  margin-top:80px;
}
</style>
