<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminUserEdit',
  props: {
    id: {}  // ID
  },
  data () {
    return {
      model: {}, // 名称
    }
  },
  mounted () {
    // 如果ID存在，即为编辑，获取数据赋值
    this.id && this.fetch()
  },
  methods: {
    // 数据回显
    async fetch () {
      let res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
    // 保存数据
    async save () {
      // 根据ID判断是新建还是编辑
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/admin_users', this.model)
      }

      // 操作提示
      this.$message({
        type: 'success',
        message: `保存成功`
      })
      // 跳转至列表
      this.$router.push('/admin_users/list')
    },
  },
  watch: {
    // 监听ID
    id () {
      this.model = {}
    }
  }
}
</script>

<style scoped>

</style>
