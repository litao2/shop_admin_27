<template>
  <!--
    el-form 表单组件
      model 表单数据对象
        比如：一个登录表单，这个对象中应该有 userName 和 password 两个数据
      :rules 表单验证规则
      label-width 表单域标签的宽度
      label-position="top" 用于设置表单域标签的位置，top表示顶部
      ref

    el-form-item 表单中的每一行
      label 标签文本，其实就是每一行表单的说明文字（比如：用户名、密码）
      prop 表单域 model 字段，在使用 validate（ 表单验证 ）、resetFields（ 重置表单 ） 方法的情况下，该属性是必填的
   -->
  <!--
    el-row 表示行
    el-col 表示列
   -->
  <div class="login">
    <el-row
      class="login"
      type="flex"
      align="middle"
      justify="center"
    >
      <el-col
        :xs="14"
        :sm="12"
        :md="10"
        :lg="8"
        :xl="6"
      >
        <el-form
          label-position="top"
          :model="loginForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="login-form"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              type="password"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs.ruleForm.validate(valid => {
        // if (valid) {
        //   alert('表单校验成功：submit!')
        // } else {
        //   console.log('表单校验失败：error submit!!')
        //   return false
        // }
        if (!valid) {
          return false
        }

        // 效验成功
        // 发送请求到登录接口，完成登录
        axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            // console.log('登录结果：', res)
            if (res.data.meta.status === 200) {
              // 1.登录成功，跳转到后台首页
              // 2.将token存储到localStorage中
              localStorage.setItem('token', res.data.data.token)
              // 通过编程式导航实现路由跳转
              // push 方法的参数为：要跳转到的页面路径，与路由规则中的path匹配
              this.$router.push('/home')
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 800
              })
            } else {
              // 登录失败
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    resetForm (formName) {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-form {
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
}
</style>
