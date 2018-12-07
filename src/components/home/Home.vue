<template>
  <el-container class="home">
    <!-- 头部 -->
    <el-header class="home-header">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple"> <img
              src="./logo.png"
              alt="黑马程序猿"
            ></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple title"> 电商后台管理系统 </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple desc"> 欢迎上海前端27期星曜会员
            <a
              href="javascript:;"
              class="logout"
              @click.prevent="logout"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router = "true"
          default-active="2"
          class="home-header-menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="/rights">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {

    // 退出功能
    logout () {
      // 1.弹出确认提示框
      // 2.点击确认按钮时，执行退出操作
      // 3.退出要做什么事情？？
      //  3.1清除 token
      //  3.2返回 login 页面

      // $confirm 是 ElementUI 中的  MessageBox 弹窗
      this.$confirm('您是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清除 token
        localStorage.removeItem('token')
        // 返回 login 页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less">
.home {
  height: 100%;
  background-color: #eaeef1;
  &-header {
    background-color: #b3c1cd;
    &-menu {
      height: 100%;
    }
  }
}
.bg-purple {
  height: 60px;
  line-height: 60px;
}
img {
  height: 53px;
}
.title {
  font-size: 30px;
  color: #eaeef1;
  font-weight: bolder;
  text-align: center;
}
.desc {
  min-width: 234px;
  font-weight: bolder;
  text-align: right;
  .logout {
    color: #daa520;
  }
}
.el-header {
  padding: 0;
}
</style>
