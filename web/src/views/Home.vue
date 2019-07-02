<template>
  <div class="">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <img class="w-100" src="@/assets/images/swiper-1.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="@/assets/images/swiper-2.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="@/assets/images/swiper-3.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      <!-- Optional controls -->
<!--      <div class="swiper-pagination"  slot="pagination"></div>-->
<!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next" slot="button-next"></div>-->
<!--      <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-black-222">
      <div class="d-flex d-flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->

    <MyCardList icon="Menu" title="新闻资讯" :categories="newsCats">
      <!-- 具名插槽 -->
      <template #items="{category}">
        <router-link :to="`/articles/${news._id}`" tag="div" class="py-2 fs-lg d-flex" v-for="(news, index) in category.newsList" :key="index">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="d-flex-1 text-grey-666 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-999 fs-sm">{{news.createdAt | dateFilter}}</span>
        </router-link>
      </template>
    </MyCardList>

    <MyCardList icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- 具名插槽 -->
      <template #items="{category}">
        <div class="d-flex d-flex-wrap" style="margin: 0 -.5rem;">
          <router-link :to="`/heroes/${heroes._id}`" tag="div" class="p-2 text-center" style="width: 20%;" v-for="(heroes, index) in category.heroList" :key="index">
            <img :src="heroes.avatar" alt="" class="w-100">
            <div>{{heroes.name}}</div>
          </router-link>
        </div>
      </template>
    </MyCardList>

    <MyCard icon="video-" title="精彩视频"></MyCard>
    <MyCard icon="text1" title="图文攻略"></MyCard>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Home',
  data () {
    return {
      swiperOption: {
        // 所有配置均为可选（同Swiper配置）
        // notNextTick: true,
        // autoplay: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // grabCursor : true,
        // setWrapperSize :true,
        // autoHeight: true,
        pagination: {
          el: '.pagination-home', // .swiper-pagination
        },
        // paginationClickable :true,
        // prevButton:'.swiper-button-prev',
        // nextButton:'.swiper-button-next',
        // scrollbar:'.swiper-scrollbar',
        // mousewheelControl : true,
        // observeParents:true,
        // onTransitionStart(swiper){
        //   console.log(swiper)
        // }
      },
      newsCats: [], // 新闻资讯数据
      heroCats: [], // 英雄列表数据
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)

    this.fetchNewsCats()
    this.fetchHeroCats()
  },
  methods: {
    // 获取新闻资讯列表
    async fetchNewsCats () {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    // 获取英雄列表
    async fetchHeroCats () {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  filters: {
    // 日期时间格式化
    dateFilter (val) {
      return dayjs(val).format('MM/DD')
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/varables.scss';

.pagination-home {
  .swiper-pagination-bullet {
    background: map-get($colors, 'white');
    border-radius: 0.154rem  /* 2/13 */;
    opacity: 1;
    &.swiper-pagination-bullet-active {
       background: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

</style>
