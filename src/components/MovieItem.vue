<template>
  <div class="item">
    <router-link :to="`/movie/${mItem.id}`">
      <div class="item_img">
        <img v-lazy="`https://image.tmdb.org/t/p/w400${mItem.poster_path}`" :key="`https://image.tmdb.org/t/p/w400${mItem.poster_path}`">
      </div>
      <div class="item_row">
        {{ mItem.title }}
      </div>
      <div class="item_row release_date">
        {{ mItem.release_date }}
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'MovieItem',
    props: ['mItem']
  }
</script>

<style scoped lang="sass">

.item
  flex: 0 0 14.285%
  // .item在Slider中因為父元素swiper-slide不是display: flex所以flex: 0 0 14.285%就失效
  // 而本身寬度因為div預設display: block的特性所以會顯示width: 100%
  text-align: center
  padding: 10px 10px 50px 10px
  @include laptop
    flex: 0 0 16.666%
    padding: 10px 10px 40px 10px
  @include mobile
    flex: 0 0 50%
    padding: 15px 6px
  .item_img
    position: relative
    overflow: hidden
    padding-bottom: 150%
    margin-bottom: 10px
  .item_row
    margin-bottom: 4px
  .release_date
    color: rgba(255,255,255,0.6)
    @include mobile
      font-size: 14px

</style>