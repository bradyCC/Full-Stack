<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: 'ArticleEdit',
  props: {
    id: {}  // ID
  },
  components: {
    VueEditor
  },
  data () {
    return {
      model: {}, // 名称
      categories: [], //所属分类
    }
  },
  mounted () {
    // 所属分类基础数据
    this.fetchCategories()
    // 如果ID存在，即为编辑，获取数据赋值
    this.id && this.fetch()
  },
  methods: {
    // vue2-editor 上传图片
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file);

      let res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    // 获取所属分类
    async fetchCategories () {
      let res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    // 数据回显
    async fetch () {
      let res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    // 保存数据
    async save () {
      // 根据ID判断是新建还是编辑
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/articles', this.model)
      }

      // 操作提示
      this.$message({
        type: 'success',
        message: `保存成功`
      })
      // 跳转至列表
      this.$router.push('/articles/list')
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
