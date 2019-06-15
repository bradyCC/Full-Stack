<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类名称">
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
      id: {}  // 分类ID
    },
    data () {
      return {
        model: {} // 分类名称
      }
    },
    mounted () {
      // 如果ID存在，即为编辑，获取数据赋值
      this.id && this.fetch();
    },
    methods: {
      // 保存数据
      async save () {
        let res
        // 判断数据是否为空
        if (this.model.name) {
          // 根据分类ID判断是新建还是编辑
          if (this.id) {
            // 编辑
            res = await this.$http.put(`categories/${this.id}`, this.model)
          } else {
            // 新建
            res = await this.$http.post('categories', this.model)
          }
        } else {
          this.$message({
            type: 'error',
            message: '请输入分类名称'
          })
          return false
        }

        // 操作提示
        this.$message({
          type: 'success',
          message: `${JSON.parse(res.config.data).name}分类保存成功`
        })
        // 跳转至分类列表
        this.$router.push('/categories/list')
      },
      // 获取分类名称
      async fetch () {
        let res = await this.$http.get(`categories/${this.id}`)
        this.model = res.data
      }
    },
    watch: {
      // 监听分类ID
      id () {
        this.model = {}
      }
    }
 }
</script>

<style scoped>

</style>
