<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ItemEdit',
  props: {
    id: {}  // ID
  },
  data () {
    return {
      model: {}, // 物品
    }
  },
  mounted () {
    // 如果ID存在，即为编辑，获取数据赋值
    this.id && this.fetch()
  },
  methods: {
    // 上传图片回显
    afterUpload (res) {
      // 显式赋值
      this.$set(this.model, 'icon', res.url)
      // this.model.icon = res.url
    },
    // 数据回显
    async fetch () {
      let res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    // 保存数据
    async save () {
      // 根据ID判断是新建还是编辑
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/items', this.model)
      }

      // 操作提示
      this.$message({
        type: 'success',
        message: `保存成功`
      })
      // 跳转至列表
      this.$router.push('/items/list')
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

<style>

</style>
