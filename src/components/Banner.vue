<template>
  <div class="banner_box" :class="{show:showBanner}">
    <div class="banner">
      <swiper :options="swiperOption" ref="banner">
        <swiper-slide v-for="(item, key) in bannerImages" :key="key">
          <div class="item">
            <router-link :to="`/movie/${item.id}`">
              <div class="item_info">
                <div class="item_title">{{ item.title }}</div>
                <div class="item_overview">{{ item.overview }}</div>
              </div>
              <div class="item_img">
                <img v-if="!item.backdrop_path" src="../assets/img/imgNull_movie.svg" class="imgNull">
                <img v-else :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`" @load="imgLoaded()">
              </div>
            </router-link>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"><font-awesome-icon icon="chevron-left" /></div>
        <div class="swiper-button-next" slot="button-next"><font-awesome-icon icon="chevron-right" /></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: ['bannerImages'],
  data(){
    return{
      showBanner: false,
      swiperOption:{
        init: false, // 解決loop設置無效的問題 > updated()
        speed: 500,
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true,
        breakpoints: {
          1400: {
            spaceBetween: 10
          },
          991: {
            slidesPerView: 1,
            centeredSlides: false
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
    }
  },
  computed:{
    swiper(){
      return this.$refs.banner.swiper;
    }
  },
  // 在vue生命週期的updated()時初始化swiper並且show banner
  // async updated(){
  //   if (this.bannerImages.length > 1){
  //     await this.swiper.init();
  //     this.showBanner = true;
  //   }
  // },
  methods:{
    // 圖片載入(@load)完成後初始化swiper並且show banner
    async imgLoaded(){
      if (this.bannerImages.length > 1){
        await this.swiper.init();
        this.showBanner = true;
      }
    }
  }
}
</script>

<style scoped lang="sass">

.banner_box
  height: 33vw
  margin-top: 20px
  background: url(../assets/img/loading.svg) no-repeat center / 70px
  &.show
    .banner
      opacity: 1
  @include laptop
    margin-top: 10px
    background-size: 60px
  @include mobile
    height: 66vw
    margin: 0 0 20px 0
    background-size: 40px
  .banner
    position: relative
    height: 100%
    overflow: hidden
    opacity: 0
    background-color: #000
    transition: opacity .3s ease .1s
    .swiper-container
      transform: scale(1.2)
      transform-origin: top center
      @include mobile
        transform: scale(1)
      .swiper-slide
        &.swiper-slide-active
          .item
            opacity: 1
            pointer-events: auto
        .item
          position: relative
          opacity: 0.4
          pointer-events: none
          transition: opacity .5s
          .item_info
            position: absolute
            bottom: 0
            right: 0
            width: 60%
            text-align: right
            padding: 6% 6% 5% 6%
            z-index: 3
            @include laptop
              padding: 4% 5%
            @include mobile
              width: 100%
              padding: 0 11% 5% 11%
            .item_title
              font-family: 'Oswald'
              font-size: 36px
              line-height: 1
              margin-bottom: 10px
              @include laptop
                font-size: 27px
            .item_overview
              display: -webkit-box
              color: #aaa
              font-size: 15px
              line-height: 1.2
              overflow: hidden
              -webkit-line-clamp: 3
              -webkit-box-orient: vertical
              white-space: normal
              @include laptop
                font-size: 14px
              @include mobile
                -webkit-line-clamp: 2
          .item_img
            position: relative
            overflow: hidden
            padding-bottom: 56.25%
            z-index: 1
            @include mobile
              padding-bottom: 66%
            img
              transform: scale(1)
              &.imgNull
                top: 38%
                width: auto
                height: 32%
          a
            &:after
              content: ''
              position: absolute
              bottom: 0
              left: -1%
              width: 102%
              height: 36%
              z-index: 2
              background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.36) 20%,rgba(0,0,0,0.9) 100%)
              @include mobile
                height: 50%
                background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.36) 20%,rgba(0,0,0,1) 100%)
      .swiper-button-prev, .swiper-button-next
        width: 20vw
        @include mobile
          width: 40px
      .swiper-button-prev
        left: 0
        @include mobile
          background: linear-gradient(to right, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0) 100%)
      .swiper-button-next
        right: 0
        @include mobile
          background: linear-gradient(to left, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0) 100%)

#app
  &.ch
    .item_title
      font-weight: bold
      margin-bottom: 12px
      @include laptop
        font-size: 25px
        margin-bottom: 10px
    .item_overview
      line-height: 1.3

</style>