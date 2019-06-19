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

    <MyCard icon="Menu" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>新版本爆料①丨S16赛季王者峡谷最新调整</span>
              <span>06/19</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </MyCard>

    <MyCard icon="card-hero" title="英雄列表"></MyCard>

    <MyCard icon="video-" title="精彩视频"></MyCard>

    <MyCard icon="text1" title="图文攻略"></MyCard>

  </div>
</template>

<script>
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
      }
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
  }
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
