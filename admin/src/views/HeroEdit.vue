<template>
  <div class="">
    <h1>{{ id? '编辑': '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res => $set(model, 'avatar', res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="banner">
            <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res => $set(model, 'banner', res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" :max="9" show-score style="margin-top: .6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="9" show-score style="margin-top: .6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="9" show-score style="margin-top: .6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="9" show-score style="margin-top: .6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="partners">
          <el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i> 添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
      categories: [], // 类型基础数据
      items: [], // 装备基础数据
      heros: [], // 英雄基础数据
      model: {
        name: ``,
        avatar: ``,
        banner: ``,
        title: ``,
        categories: ``,
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        skills: [],
        items1: [],
        items2: [],
        usageTips: ``,
        battleTips: ``,
        teamTips: ``,
        partners: [],
      }, // 英雄
    }
  },
  mounted () {
    // 获取类型基础数据
    this.fetchCategories()
    // 获取装备基础数据
    this.fetchItems()
    // 获取英雄基础数据
    this.fetchHeroes()
    // 如果ID存在，即为编辑，获取数据赋值
    this.id && this.fetch()
  },
  methods: {
    // 上传图片回显
    // afterUpload (res) {
      // 显式赋值
      // this.$set(this.model, 'avatar', res.url)
      // this.model.avatar = res.url
    // },
    // 数据回显
    async fetch () {
      let res = await this.$http.get(`rest/heros/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
    // 获取类型基础数据
    async fetchCategories () {
      let res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    // 获取装备基础数据
    async fetchItems () {
      let res = await this.$http.get('rest/items')
      this.items = res.data
    },
    // 获取英雄基础数据
    async fetchHeroes () {
      let res = await this.$http.get('rest/heroes')
      this.heroes = res.data
    },
    // 保存数据
    async save () {
      // 根据ID判断是新建还是编辑
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/heros/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/heros', this.model)
      }

      // 操作提示
      this.$message({
        type: 'success',
        message: `保存成功`
      })
      // 跳转至列表
      this.$router.push('/heros/list')
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
