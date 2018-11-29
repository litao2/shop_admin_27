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
  <el-form
    label-position="top"
    :model="loginForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
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
      <el-input v-model="loginForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
      >登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
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
      })
    },
    resetForm (formName) {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>
</style>
