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
    <!-- end of top -->

    <div>
      <div class="bg-white px-3">
        <div class="nav de-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初始</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="bg-white p-3 border-bottom">
              <div class="d-flex">
                <router-link to="/" tag="button" class="btn btn-lg d-flex-1">
                  <i class="iconfont icon-video-"></i>
                  英雄介绍视频
                </router-link>
                <router-link to="/" tag="button" class="btn btn-lg d-flex-1 ml-2">
                  <i class="iconfont icon-video-"></i>
                  一图识英雄
                </router-link>
              </div>
              <!-- end of button -->

              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img :src="item.icon" alt="" v-for="(item, index) in model.skills" :key="item.name" class="icon" :class="{active: currentSkillIndex === index}" @click="currentSkillIndex = index" />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <span class="text-grey-666 ml-4">
                      (冷却值：{{ currentSkill.delay }} 消耗：{{ currentSkill.cost}})
                    </span>
                  </div>
                  <p>{{ currentSkill.description }}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-666">小提示：{{ currentSkill.tips }}</p>
                </div>
              </div>
              <!-- end of skills -->
            </div>

            <MyCard plain icon="Menu" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt="" class="icon" />
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" alt="" class="icon" />
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
            </MyCard>

            <MyCard plain icon="Menu" title="使用技巧">
              <p class="m-0">{{ model.usageTips }}</p>
            </MyCard>

            <MyCard plain icon="Menu" title="对抗技巧">
              <p class="m-0">{{ model.battleTips }}</p>
            </MyCard>

            <MyCard plain icon="Menu" title="团战思路">
              <p class="m-0">{{ model.teamTips }}</p>
            </MyCard>

            <MyCard plain icon="Menu" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50" />
                <p class="d-flex-1 m-0 ml-3">{{ item.description }}</p>
              </div>
              <div class="border-bottom mt-3"></div>
            </MyCard>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
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
      model: ``,
      currentSkillIndex: 0
    }
  },
  computed: {
    currentSkill () {
      return this.model.skills[this.currentSkillIndex]
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
@import '../assets/scss/varables.scss';

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
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, 'white');
      border-radius: 50%;
      &.active {
        border-color: map-get($colors, 'primary');
      }

    }
  }
  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
