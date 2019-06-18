<template>
  <div class="">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height: 3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="items.length > 0" @current-change="currentChange" :current-page="nowpage" :page-size="pageSize" :total="items.length"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  data () {
    return {
      items: [], // 列表数据
      dataList: [],
      nowpage: 1, //当前页
      pageSize: 10, //每页显示条数
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    // 获取列表
    async fetch () {
      let res = await this.$http.get('rest/items')
      this.items = res.data
      // 默认显示第一页
      this.currentChange(1)
    },
    // 分页
    currentChange (page) {
      this.nowpage = page
      let start = (page - 1) * this.pageSize
      let end = start + this.pageSize
      this.dataList = this.items.slice(start, end)
    },
    // 删除
    async remove (row) {
      this.$confirm(`是否确认要删除物品 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      }).then(async () => {
        let res = await this.$http.delete(`rest/items/${row._id}`)
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败，请重试!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
