// 导入axios
import axios from 'axios'

// 邮箱正则
const EMAIL_REG = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
// 手机号码正则
const MOBILE_GER = /^1(3|4|5|7|8)\d{9}$/

export default {
  created () {
    this.getUserList()
    // 获取角色列表数据
    this.getRolesList()
  },
  data () {
    return {
      // 用户列表数据
      usersList: [],
      // 总条数
      total: 0,
      // 每页大小
      pagesize: 2,
      // 展示第几页数据
      pagenum: 1,
      // 搜索数据
      searchText: '',

      // 添加用户框与表单框
      dialogFormVisible: false,
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户时的表单验证
      userAddRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: EMAIL_REG, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: MOBILE_GER, message: '手机号码格式不正确', trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px',

      // 编辑用户数据
      userEditForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      userEditDailog: false,

      // 分配角色数据
      // 控制分配角色对话框的展示和隐藏
      isShowUserRole: false,
      userRoleForm: {
        username: '',
        rid: ''
      },
      userRoleList: []
    }
  },

  methods: {
    // 获取用户列表数据
    getUserList (pagenum = 1, query = '') {
      // 发送请求，获取用户列表数据
      axios.get('http://localhost:8888/api/private/v1/users', {
        // GET请求参数
        params: {
          // 每页大小
          pagesize: this.pagesize,
          // 第几页
          pagenum,
          // 查询条件
          query
        },
        // 设置请求头
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(res => {
          console.log('用户列表数据为：', res)
          if (res.data.meta.status === 200) {
            // 成功获取数据
            this.usersList = res.data.data.users
            // 总条数
            this.total = res.data.data.total
            // 设置当前页
            this.pagenum = res.data.data.pagenum
          } else {
            // 获取数据失败，跳转到登录页面
            this.$router.push('./login')
            localStorage.removeItem('token')
          }
        })
    },
    // 分页功能
    // 参数curPage 就表示，当前点击的页数
    changePage (curPage) {
      // console.log('点击分页了', curPage)
      // this.pagenum = curPage

      // 根据 curPage 来获取当前页数据
      this.getUserList(curPage, this.searchText)
    },

    // 搜索功能
    // 每次搜索数据的时候，都应该返回第一页
    search () {
      // console.log('搜索内容为：', this.searchText)
      this.getUserList(1, this.searchText)
    },

    // 修改用户状态
    async changeUserState (curUser) {
      // console.log('changeUserState')
      // 注意：put方法的第三个参数，才是配置对象
      // 第二个参数：表示要传递个接口的数据
      // 第一个参数：请求地址
      // const res = await axios.put(`http://localhost:8888/api/private/v1/users/${curUser.id}/state/${curUser.mg_state}`, null, {
      //   // 设置请求头
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })
      // const res = await this.$http.put(`/users/${curUser.id}/state/${curUser.mg_state}`, null, {
      //   // 设置请求头
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })
      const url = `/users/${curUser.id}/state/${curUser.mg_state}`
      const res = await this.$http.put(url)

      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      } else {
        // 失败
        this.$message({
          type: 'error',
          message: res.data.meta.msg
        })
      }
    },

    // 删除用户
    async delUser (id) {
      try {
        await this.$confirm('您确定删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        // 发送请求，删除
        const res = await this.$http.delete(`/users/${id}`)
        // const { meta } = res.data
        // if (meta.status === 200) {

        const { meta: { status } } = res.data
        if (status === 200) {
          // 重新获取列表数据
          this.getUserList(1, this.searchText)
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      }
    },
    // 添加用户
    async addUser () {
      try {
        await this.$refs.userAddForm.validate()

        // console.log('验证成功')
        const res = await this.$http.post('/users', this.userAddForm)
        const { meta } = res.data
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          // 关闭添加用户对话框
          this.dialogFormVisible = false
          // 刷新表格数据
          this.getUserList(1, this.searchText)
        }
      } catch (e) { }
    },
    // 展示添加用户对话框
    showUserAddDialog (user) {
      // console.log(user)
      // 展示对话框
      this.dialogFormVisible = true
    },
    // 展示编辑用户对话框
    showEditUserDialog (user) {
      // 展示对话框
      this.userEditDailog = true
      console.log(user)
      for (let key in this.userEditForm) {
        this.userEditForm[key] = user[key]
      }
    },
    // 对话框关闭
    closeUserAddDialog () {
      // 重置表单
      this.$refs.userAddForm.resetFields()
    },

    // 编辑用户
    async editUser () {
      //  发送请求，修改数据
      const { id, email, mobile } = this.userEditForm
      const res = await this.$http.put(`/users/${id}`, {
        email,
        mobile
      })

      const { meta } = res.data
      if (meta.status === 200) {
        // 编辑用户成功：
        this.$message({
          type: 'success',
          message: meta.msg
        })

        // 关闭编辑用户对话框
        this.userEditDailog = false
        // 刷新表格数据
        this.getUserList(1, this.searchText)
      } else {
        this.$message({
          type: 'error',
          message: meta.msg
        })
      }
    },
    /**
     * 展示给用户分配角色对话框
     * @param {object} curUser 当前用户对象
     */
    async showUserRole (curUser) {
      // 1.展示分配角色对话框
      this.isShowUserRole = true

      const res = await this.$http.get(`/users/${curUser.id}`)
      let { rid } = res.data.data
      rid = rid === -1 ? '' : rid
      // 2.显示当前用户的名称和角色id
      this.userRoleForm.username = curUser.username
      this.userRoleForm.rid = rid
      // 3.暂存用户id
      this.userRoleForm.userid = curUser.id
    },
    /**
     * 获取角色列表数据
     */
    async getRolesList () {
      const res = await this.$http.get('/roles')
      this.userRoleList = res.data.data
    },
    // 分配角色给用户
    async assignRole () {
      const {userid, rid} = this.userRoleForm
      const res = await this.$http.put(`/users/${userid}/role`, {
        rid
      })
      // 关闭对话框
      this.isShowUserRole = false
      // 刷新列表数据
      this.getUserList(1, this.searchText)
      // 提示用户成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
