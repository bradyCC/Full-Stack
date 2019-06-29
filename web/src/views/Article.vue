<template>
  <div class="page-article" v-if="model">
    <!-- 标题 -->
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back01-copy text-blur"></div>
      <strong class="d-flex-1 text-ellipsis px-2 text-blur">{{ model.title }}</strong>
      <div class="text-grey-666 fs-xs">2019-06-29</div>
    </div>
    <!-- 内容 -->
    <div v-html="model.body" class="text-center px-3 article-body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <strong class="text-blur fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id" class="text-ellipsis py-1" style="width: 75%">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    id: { required: true },

  },
  data() {
    return {
      model: ``
    }
  },
  mounted () {
    this.fetchArticle()
  },
  methods: {
    // 获取新闻详情
    async fetchArticle () {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  watch: {
    id: 'fetchArticle',
    // id () {
    //   this.fetchArticle()
    // }
  }
}
</script>

<style lang="scss">
.page-article {
  .article-body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
