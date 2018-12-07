export default {
  data () {
    return {
      // 角色列表
      rolesList: [],
      // 是否展示分配权限对话框
      isShowRoleDialog: false,

      // 当前分配角色的id
      curRoleId: -1,

      // tree树形控件的数据
      rightsTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }

    }
  },
  created () {
    this.getRolesList()

    this.getRightsTree()
  },
  methods: {
    // 获取权限列表tree数据
    async getRightsTree () {
      // 获取所有权限数据 （tree 树形结构）
      const res = await this.$http.get('/rights/tree')
      this.rightsTree = res.data.data
    },
    // 获取角色列表
    async getRolesList () {
      const res = await this.$http.get('/roles')
      this.rolesList = res.data.data
    },

    // 自定义列表索引
    getIndex (index) {
    // 此处的index,表示： 从0开始的索引号
      return index
    },

    // 删除角色的权限
    // 第一个参数：表示 权限id
    // 第二个参数：角色id
    async removeUserRight (rightId, roleId) {
      const res = await this.$http.delete(`/roles/${roleId}/rights/${rightId}`)

      // 刷新列表数据
      this.getRolesList()
      // 提交用户删除结果
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    /**
     * 展示分配权限对话框
     */
    showRoleDialog (curRole) {
      // 1 展示对话框
      this.isShowRoleDialog = true
      // 存储当前正在编辑的角色id
      this.curRoleId = curRole.id

      // 通过$nexTick() 中的回调函数来获取到更新后的组件(DOM)
      this.$nextTick(() => {
        const checkedKeys = []
        curRole.children.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              checkedKeys.push(level3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },

    // 给角色分配权限
    async assignRole () {
      // 获取全选中的权限菜单id
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 获取半选中的权限菜单id
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // 将两个数组合并到一起，得到所有选过的权限菜单id
      const allKeys = [...checkedKeys, ...halfCheckedKeys]
      const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
        rids: allKeys.join(',')
      })

      // 关闭对话框
      this.isShowRoleDialog = false
      // 刷新列表数据
      this.getRolesList()
      // 提示已经分配权限成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
