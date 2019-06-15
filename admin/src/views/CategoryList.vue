<template>
  <div class="">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'CategoryList',
    data () {
      return {
        items: []
      }
    },
    async mounted () {
      this.fetch();
    },
    methods: {
      async fetch () {
        let res = await this.$http.get('categories');
        this.items = res.data;
      }
    }
  }
</script>

<style scoped>

</style>
