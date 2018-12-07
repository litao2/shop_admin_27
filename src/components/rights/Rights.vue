<template>
  <div class="rightd">
    <!-- 面包屑导航 -->
    <el-breadcrumb
      class="rights-bread"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="rightsList"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="getIndex"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="层级"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  async created () {
    const res = await this.$http.get('/rights/list')

    console.log(res)
    this.rightsList = res.data.data
  },
  methods: {
    // 自定义列表索引
    getIndex (index) {
      console.log(index)
      return index
    }
  }
}
</script>

<style>
.rights-bread{
   background-color: #D4DAE0;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding-left: 10px;
}
</style>
