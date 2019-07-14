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
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex d-flex-col jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">{{ model.categories.map(item => item.name ).join("/") }}</div>
        <div class="d-flex jc-between pt-1">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary-805302">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-203696">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger-791a16">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark-33332c">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey-999 fs-sm">皮肤：2 &gt;</router-link>
        </div>
      </div>
    </div>
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
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: 100% 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 .25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: .6rem;
        border: 1px solid rgba(255, 255, 255, .3);
      }
    }
  }
}
</style>
