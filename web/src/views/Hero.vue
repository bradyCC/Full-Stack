<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="@/assets/images/logo.png" alt="" height="30">
      <div class="px-2 d-flex-1">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    {{ model.name }}
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    id: { required: true },

  },
  data() {
    return {
      model: ``
    }
  },
  mounted () {
    this.fetchHero()
  },
  methods: {
    // 获取英雄详情
    async fetchHero () {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    },
  },
  watch: {
    id: 'fetchHero',
  }
}
</script>

<style lang="scss">
.page-hero {

}
</style>
