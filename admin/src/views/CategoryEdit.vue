<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  props: {
    id: {}  // ID
  },
  data () {
    return {
      model: {}, // 名称
      parents: [], //上级分类
    }
  },
  mounted () {
    // 上级分类基础数据
    this.fetchParents()
    // 如果ID存在，即为编辑，获取数据赋值
    this.id && this.fetch()
  },
  methods: {
    // 获取上级分类
    async fetchParents () {
      let res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    },
    // 数据回显
    async fetch () {
      let res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    // 保存数据
    async save () {
      // 根据ID判断是新建还是编辑
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/categories', this.model)
      }

      // 操作提示
      this.$message({
        type: 'success',
        message: `保存成功`
      })
      // 跳转至列表
      this.$router.push('/categories/list')
    },
  },
  // watch: {
  //   // 监听ID
  //   id () {
  //     this.model = {}
  //   }
  // }
}
</script>

<style scoped>

</style>
