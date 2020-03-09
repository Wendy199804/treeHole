<template>
  <div class="sign_in">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model.number="ruleForm.username" placeholder="请输入用户名.." prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码.." prefix-icon="el-icon-notebook-2"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from '@/utils/http.js'
import utils from '@/utils/utils.js'

export default {
  data() {
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        username: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        username: [{ validator: checkusername, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      let that = this
      let signmsg ={
        username:that.ruleForm.username,
        password:that.ruleForm.pass,
        enable:'普通用户'
      }
      that.$refs[formName].validate(valid => {
        if (valid) {
          
          http.post('/api/User', signmsg).then(res => {
            console.log(res)
            if (res.data !== '') {
              that.$message({
                showClose: true,
                message: '恭喜你，登录成功',
                type: 'success'
              })
              // that.$router.push({path:`/home?username=${signmsg.username}`,query:{username:signmsg.username}})
              that.$router.push({name:'home'})
              let user = {
                username:res.data[0].username,//用户名
                nickname:res.data[0].nickname,//发表昵称
                replynickname:res.data[0].replynickname//回复昵称
              }
              console.log(user)
              utils.setCookie('user',JSON.stringify(user),2)
            } else {
              that.$message({
                showClose: true,
                message: '登录失败',
                type: 'error'
              })
            }
          })
        } else {
          that.$message({
            showClose: true,
            message: '请把登录信息填写完整',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.sign_in {
  background-image: url('../assets/sign_up.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  input{
    background-color: transparent;
    color: #ffffff;
  }
  input::-webkit-input-placeholder{
    color: #ffffff;
  }
  input::-moz-placeholder{
    color: #ffffff;
  }
  input:-ms-input-placeholder{
    color: #ffffff;
  }
  form{
    width: 300px;
    background-color: rgba(168, 168, 168, 0.295);
    padding: 50px 100px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .el-input__icon{
    color: #ffffff;
  }
  .el-form-item__content{
    display: flex;
    justify-content: space-between;
  }
  .el-button--primary,.el-button--default{
    width: 100%;
  }
  .el-button+.el-button{
    margin-left: 0px;
  }
}
</style>
