<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + 'upload'" :show-file-list="false" :on-success="afterUpload">
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
      id: {}  // 物品ID
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
        this.$set(this.model, 'icon', res.url);
        // this.model.icon = res.url;
      },
      // 获取分类名称
      async fetch () {
        let res = await this.$http.get(`rest/items/${this.id}`)
        this.model = res.data
      },
      // 保存数据
      async save () {
        let res
        // 判断数据是否为空
        if (this.model.name) {
          // 根据分类ID判断是新建还是编辑
          if (this.id) {
            // 编辑
            res = await this.$http.put(`rest/items/${this.id}`, this.model)
          } else {
            // 新建
            res = await this.$http.post('rest/items', this.model)
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
          message: `${JSON.parse(res.config.data).name}物品保存成功`
        })
        // 跳转至分类列表
        this.$router.push('/items/list')
      },
    },
    watch: {
      // 监听分类ID
      id () {
        this.model = {}
      }
    }
 }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
