<template>
  <div class="sign_up">
    <div class="signup_wrap">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" v-model.number="ruleForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input type="text" v-model.number="ruleForm.nickname" prefix-icon="el-icon-chat-line-square" placeholder="请输入发表昵称..."></el-input>
        </el-form-item>
        <el-form-item prop="replynickname">
          <el-input type="text" v-model.number="ruleForm.replynickname" prefix-icon="el-icon-chat-dot-square" placeholder="请输入回复昵称..."></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-input type="text" v-model.number="ruleForm.sex" prefix-icon="el-icon-male" placeholder="请输入性别..."></el-input>
        </el-form-item>
        <el-form-item prop="number">
          <el-input type="text" v-model.number="ruleForm.number" prefix-icon="el-icon-school" placeholder="请输入学号..."></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-notebook-2" placeholder="请输入密码..."></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-mouse" placeholder="请确认密码..."></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http.js'
export default {
  data() {
    let reg = /^[a-zA-Z0-9_\u4E00-\u9FA5]{4,16}$/
    

    const checkSex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('性别不能为空'))
      }
      setTimeout(() => {
        // console.log(value !== '女' || value !=='男')
        if (value !== '女' && value !== '男') {
          callback(new Error('请输入正确性别'))
        } else {
          callback()
        }
      }, 100)
    }
    const checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('用户名必须由字母、数字、下划线组成，且长度为4-16位'))
        } else {
          callback()
        }
      }, 100)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('发表昵称不能为空'))
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('发表昵称必须由字母、数字、下划线组成，且长度为4-16位'))
        } else {
          callback()
        }
      }, 100)
    }
    const checkReplyname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('回复昵称不能为空'))
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('回复昵称必须由字母、数字、下划线组成，且长度为4-16位'))
        } else {
          callback()
        }
      }, 100)
    }
    const checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          // if (value.length !== 5) {
          //   console.log(value)
          //   callback(new Error('请输入正确学号'))
          // } else {
          callback()
          // }
        }
      }, 100)
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        number: '',
        checkPass: '',
        replynickname: '',
        nickname: '',
        sex: ''
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        sex: [{ validator: checkSex, trigger: 'blur' }],
        username: [{ validator: checkusername, trigger: 'blur' }],
        nickname: [{ validator: checkNickname, trigger: 'blur' }],
        replynickname: [{ validator: checkReplyname, trigger: 'blur' }],
        number: [{ validator: checkNumber, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      let that = this
      http.post('/api/insertUser', this.ruleForm).then(res => {
        console.log(res)
        if (res.data === 'success') {
          that.$message({
            showClose: true,
            message: '注册成功，请前往登录',
            type: 'success'
          })
          that.$router.push({name:'signin'})
        } else {
          that.$message({
            showClose: true,
            message: '注册失败',
            type: 'error'
          })
        }
      })
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.sign_up {
  background-image: url('../assets/sign_up.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  input {
    background-color: transparent;
    color: #ffffff;
  }
  input::-webkit-input-placeholder {
    color: #ffffff;
  }
  input::-moz-placeholder {
    color: #ffffff;
  }
  input:-ms-input-placeholder {
    color: #ffffff;
  }
  form {
    width: 300px;
    background-color: rgba(168, 168, 168, 0.295);
    padding: 50px 100px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .el-input__icon {
    color: #ffffff;
  }
  .el-form-item__content {
    display: flex;
    justify-content: space-between;
  }
  .el-button--primary,
  .el-button--default {
    width: 40%;
  }
  .el-button + .el-button {
    margin-left: 0px;
  }
}
</style>
