<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="英雄名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + 'upload'" :show-file-list="false" :on-success="afterUpload">
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
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
    name: 'HeroEdit',
    props: {
      id: {}  // ID
    },
    data () {
      return {
        model: {
          name: ``,
          avatar: ``,
        }, // 英雄
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
        // this.$set(this.model, 'avatar', res.url);
        this.model.avatar = res.url;
      },
      // 获取名称
      async fetch () {
        let res = await this.$http.get(`rest/heros/${this.id}`)
        this.model = res.data
      },
      // 保存数据
      async save () {
        let res
        // 根据ID判断是新建还是编辑
        if (this.id) {
          // 编辑
          res = await this.$http.put(`rest/heros/${this.id}`, this.model)
        } else {
          // 新建
          res = await this.$http.post('rest/heros', this.model)
        }

        // 操作提示
        this.$message({
          type: 'success',
          message: `${JSON.parse(res.config.data).name}英雄保存成功`
        })
        // 跳转至列表
        this.$router.push('/heros/list')
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
