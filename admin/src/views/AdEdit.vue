<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i> 添加广告</el-button>
        <el-row type="flex" style="flex-wrap: wrap;">
          <el-col :md="24" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: .5rem;">
              <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdEdit',
  props: {
    id: {}  // ID
  },
  data () {
    return {
      model: {
        name: ``,
        items: [],
      },
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
      // this.$set(this.model, 'avatar', res.url)
      this.model.image = res.url
    },
    // 数据回显
    async fetch () {
      let res = await this.$http.get(`rest/ads/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
    // 保存数据
    async save () {
      // 根据ID判断是新建还是编辑
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/ads', this.model)
      }

      // 操作提示
      this.$message({
        type: 'success',
        message: `保存成功`
      })
      // 跳转至列表
      this.$router.push('/ads/list')
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
