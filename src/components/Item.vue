<template>
  <div class="item">
    <router-link :to="`/${linkPath}/${sItem.id}`">
      <div v-if="'profile_path' in sItem" class="item_img">
        <img v-if="!sItem.profile_path" src="../assets/img/imgNull_celeb.svg" class="imgNull">
        <img v-else v-lazy="`https://image.tmdb.org/t/p/w400${sItem.profile_path}`" :key="`https://image.tmdb.org/t/p/w400${sItem.profile_path}`">
      </div>
      <!-- 資料更新後 DOM綁定的圖片不會變 (舊圖片路徑 > 直接更換成新的路徑)
        需要加上 :key才會動態更新(舊圖片路徑 > 重新初始化 > 更換成新的路徑) -->
      <div v-else-if="'release_date' in sItem" class="item_img">
        <img v-if="!sItem.poster_path" src="../assets/img/imgNull_movie.svg" class="imgNull">
        <img v-else v-lazy="`https://image.tmdb.org/t/p/w400${sItem.poster_path}`" :key="`https://image.tmdb.org/t/p/w400${sItem.poster_path}`">
      </div>
      <div v-else-if="'first_air_date' in sItem" class="item_img">
        <img v-if="!sItem.poster_path" src="../assets/img/imgNull_tv.svg" class="imgNull">
        <img v-else v-lazy="`https://image.tmdb.org/t/p/w400${sItem.poster_path}`" :key="`https://image.tmdb.org/t/p/w400${sItem.poster_path}`">
      </div>
      <div class="item_row first_row">
        <div v-if="sItem.title">{{ sItem.title }}</div>
        <div v-else>{{ sItem.name }}</div>
      </div>
      <div class="item_row second_row">
        <div v-if="sItem.release_date">{{ sItem.release_date }}</div>
        <div v-else-if="sItem.known_for_department">{{ sItem.known_for_department }}</div>
        <div v-else-if="sItem.first_air_date">{{ sItem.first_air_date }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    props: ['sItem'],
    data(){
      return{
        linkPath: ''
      }
    },
    mounted(){
      this.specifyLinkPath()
    },
    watch:{
      sItem: function(){
        this.specifyLinkPath()
      }
    },
    methods:{
      specifyLinkPath(){
        if (this.sItem.release_date){
          this.linkPath = 'movie'
        }else if (this.sItem.known_for_department){
          this.linkPath = 'celeb'
        }else if (this.sItem.first_air_date){
          this.linkPath = 'tv'
        }
      }
    }
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
    margin-bottom: 5px
    @include mobile
      margin-bottom: 4px
  .second_row
    color: rgba(255,255,255,0.6)
    font-size: 16px
    @include mobile
      font-size: 14px

.slider
  .item
    padding: 10px

</style>