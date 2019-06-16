<template>
  <div class="">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
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
  </div>
</template>

<script>
  export default {
    name: 'ItemList',
    data () {
      return {
        items: [] // 物品列表数据
      }
    },
    mounted () {
      this.fetch();
    },
    methods: {
      // 获取物品列表
      async fetch () {
        let res = await this.$http.get('rest/items');
        this.items = res.data;
      },
      // 删除物品
      async remove (row) {
        this.$confirm(`是否确认要删除物品 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$http.delete(`rest/items/${row._id}`)
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetch();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败，请重试!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
