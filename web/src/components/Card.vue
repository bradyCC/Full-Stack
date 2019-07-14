<template>
  <div class="card bg-white p-3 mt-3">
    <div class="d-flex ai-center" :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl d-flex-1 px-2"><strong>{{title}}</strong></div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    plain: { type: Boolean },
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/varables.scss';

.card {
  border-bottom: 1px solid $border-color;
}
</style>
