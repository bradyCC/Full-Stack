<template>
  <div class="">
    <MyCard :icon="icon" :title="title" :categories="categories">
      <div class="nav jc-between">
        <div class="nav-item" :class="{active: active == index}" v-for="(category, index) in categories" :key="index" @click="$refs.list.swiper.slideTo(index)">
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </MyCard>
  </div>
</template>

<script>
  export default {
    name: 'CardList',
    props: {
      icon: { type: String, required: true },
      title: { type: String, required: true },
      categories: { type: Array, required: true },
    },
    data () {
      return {
        active: 0,
      }
    }
  }
</script>

<style scoped>

</style>
