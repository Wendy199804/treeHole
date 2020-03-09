<template>
  <div>
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
        isLogin:'',//登陆状态
        loginName:'',//当前用户名
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        pre_pass: [{ validator: validatePre_pass, trigger: 'blur' }],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          let params = {
            nickname:this.loginName,
            assword:this.ruleForm.pre_pass,
            conpassword:this.ruleForm.pass
          }
          console.log(params)
          http.post('api/ResetPass',params).then(res => {
            console.log(res.data)
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
    if (utils.getCookie('username')) {
      this.isLogin = true
      this.loginName = utils.getCookie('username')
      console.log(this.isLogin)
      console.log(this.loginName)
    } else {
      this.isLogin = false
    }
  }
}
</script>

<style lang="scss"></style>
