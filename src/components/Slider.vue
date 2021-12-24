<template>
  <div class="slider" :class="{show_after:showAfter}">
    <swiper :options="swiperOption" ref="slider">
      <swiper-slide v-for="(item, key) in sliderData" :key="key">
        <Item :sItem="item" />
      </swiper-slide>
    </swiper>
    <div class="slider-button-prev" :class="`${sIndex}-prev`" slot="button-prev"><font-awesome-icon icon="chevron-left" /></div>
    <div class="slider-button-next" :class="`${sIndex}-next`" slot="button-next"><font-awesome-icon icon="chevron-right" /></div>
  </div>
</template>

<script>

import Item from './Item.vue'

export default {
  name: 'Slider',
  props: ['sliderData','sIndex'],
  data(){
    return{
      swiperOption:{
        // init: false,
        speed: 500,
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          1400: {
            slidesPerView: 6,
          },
          991: {
            slidesPerView: 2,
            slidesPerGroup: 2
          }
        },
        navigation: {
          nextEl: `.${this.sIndex}-next`,
          prevEl: `.${this.sIndex}-prev`,
        }
      },
      showAfter: true
    }
  },
  computed:{
    swiper(){
      return this.$refs.slider.swiper;
    }
  },
  watch:{
    sliderData: function(){
      this.backToFirstImg();
    }
  },
  mounted(){
    let vm = this;
    if (vm.sliderData.length > 1){
      vm.swiper.on('slideChangeTransitionStart', function () {
        if (vm.swiper.realIndex > 0){
          vm.showAfter = false
        }else if(vm.swiper.realIndex == 0){
          vm.showAfter = true
        }
      });
    }
  },
  // 以下寫法是到updated()再做 vm.swiper.init(); 可以避免loop失效  但在Search頁面用 this.$http.all 時會無法抓到 swiper 導致無法init() 目前還不知原因所以先用預設直接在swiperOption中init()
  // async updated(){
  //   let vm = this;
  //   if (vm.sliderData.length > 1){
  //     await vm.swiper.init();
  //     vm.swiper.on('slideChangeTransitionStart', function () {
  //       if (vm.swiper.realIndex > 0){
  //         vm.showAfter = false
  //       }else if(vm.swiper.realIndex == 0){
  //         vm.showAfter = true
  //       }
  //     });
  //   }
  // },
  methods:{
    backToFirstImg(){
      this.swiper.slideTo(0, 0);
    }
  },
  components:{
    Item
  }
}
</script>

<style scoped lang="sass">



</style>