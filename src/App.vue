<template>
  <div id="app" :class="lanClass">
    <Header></Header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  data(){
    return{
      lanClass:{
        en: false,
        ch: false
      }
    }
  },
  created(){
    this.$cookies.get('language') ? false : this.$cookies.set('language','en-US');
    this.addLanguageClass();
  },
  computed:{
    language(){
      return this.$cookies.get('language');
    },
  },
  watch:{
    language(){
      this.addLanguageClass();
    }
  },
  methods:{
    addLanguageClass(){
      if (this.language == 'en-US') {
        this.lanClass.en = true;
        this.lanClass.ch = false;
      }else{
        this.lanClass.en = false;
        this.lanClass.ch = true;
      }
    }
  },
  components:{
    Header
  }
}

</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Oswald:wght@300;400&display=swap')

html
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0)

html, body
  padding: 0
  margin: 0

body
  font-family: Arial, Helvetica, 'Noto Sans TC', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #fff
  font-size: 17px
  line-height: 1.5
  background-color: #000

*
  &:after, &:before
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box

a
  color: #fff
  text-decoration: none
  outline: none
  behavior: expression(this.onFocus=this.blur())
  transition: .2s
  &:focus
    text-decoration: none
    outline: none
    behavior: expression(this.onFocus=this.blur())
  &:link,  &:active,  &:visited,  &:hover
    text-decoration: none

main
  line-height: 1.3
  overflow-x: hidden
  padding-top: 91px
  @include laptop
    padding-top: 70px
  @include mobile
    padding-top: 60px
  a
    display: block
    @include desktop
      &:hover
        img
          transform: scale(1.05)
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform .3s, opacity .46s
    &.imgNull
      top: 50%
      left: 50%
      width: 50%
      height: 50%
      opacity: .2
      transform: scale(1) translate(-50%, -50%) !important
  .item_img, .celeb_img
    // @include inline-animation(2.6s)
    //   0%
    //     background-color: rgba(255,255,255,0.1)
    //   50%
    //     background-color: rgba(255,255,255,0.2)
    //   100%
    //     background-color: rgba(255,255,255,0.1)
    background-color: rgba(255,255,255,0.1)
    @include mobile
      background-color: rgba(255,255,255,0.06)
  img[lazy=loading]
    opacity: 0
  img[lazy="loaded"]
    opacity: 1
  img[lazy="error"]

  .swiper-container
    *
      &:focus
        text-decoration: none
        outline: none
        behavior: expression(this.onFocus=this.blur())

  .swiper-button-prev, .swiper-button-next, .slider-button-prev, .slider-button-next
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    top: 0
    height: 100%
    width: 50px
    font-size: 38px
    text-align: center
    margin-top: 0
    opacity: 0.5
    background-image: none
    transition: opacity .2s
    &:hover
      opacity: 0.8
    &:focus
      text-decoration: none
      outline: none
      behavior: expression(this.onFocus=this.blur())
    &.swiper-button-disabled
      opacity: 0.2
    @include laptop
      width: 40px
      font-size: 27px
    @include mobile
      opacity: 0.8
  .slider-button-prev, .slider-button-next
    height: 90%
    z-index: 10
    @include mobile
      display: none
      justify-content: flex-end
      width: 20px
      font-size: 20px
  .swiper-button-prev
    left: 0
  .swiper-button-next
    right: 0
  .slider-button-prev
    left: -50px
    cursor: pointer
    @include laptop
      left: -40px
    @include mobile
      justify-content: flex-start
      left: -20px
  .slider-button-next
    right: -50px
    cursor: pointer
    @include laptop
      right: -40px
    @include mobile
      right: -20px

input[type=text]
  font-family: 'Microsoft JhengHei'
  display: inline-block
  vertical-align: middle
  float: left
  width: 100%
  height: 36px
  color: #333
  font-size: 16px
  line-height: 1
  padding: 3px 16px
  border: none
  border-radius: 20px
  background-color: rgba(255,255,255,0.24)
  outline: none
  -webkit-appearance: none
  transition: background-color ease-in-out .15s
  &:focus
    background-color: rgba(255,255,255,1)
  @include mobile
    height: 32px
    background-color: rgba(255,255,255,0.15)

::-webkit-input-placeholder
    color: #8e8e8e

.content
  padding: 2% 60px
  @include laptop
    padding: 2% 50px
  @include mobile
    padding: 2% 30px 30px 30px

.slider_box
  margin-bottom: 10px
  @include laptop
    margin-bottom: 0
  .slider
    position: relative
    margin-bottom: 10px
    .swiper-container
      @include mobile
        overflow: visible
    @include mobile
      &:after
        content: ''
        position: absolute
        top: 0
        right: -30px
        width: 20px
        height: 100%
        z-index: 20
        opacity: 0
        background: linear-gradient(to left, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 100%)
        transition: opacity .5s
      &.show_after
        &:after
          opacity: 1

.title
  font-family: 'Oswald'
  font-size: 34px
  padding: 10px 10px 20px 10px
  @include laptop
    font-size: 28px
    padding: 0 10px 20px 10px
  @include mobile
    font-size: 26px
    padding: 0 10px 10px 10px
  &.s2
    @include mobile
      padding: 20px 0 10px 6px

.subtitle
  font-family: 'Oswald'
  font-size: 27px
  padding: 10px
  @include laptop
    font-size: 23px
  .total_results
    font-family: Arial
    font-size: 18px
    line-height: 1
    @include laptop
      font-size: 16px

.list_box
  display: flex
  flex-wrap: wrap
  margin-bottom: 40px
  opacity: 0
  transition: opacity .3s
  &.show
    opacity: 1

.detail_box
  padding: 6% 4% 6% 5%
  @include mobile
    padding: 7%
  .d_info
    position: relative
    min-height: 32vw
    margin: 0 0 20px 0
    z-index: 2
    @include laptop
      min-height: 30vw
    @include mobile
      min-height: auto
      margin: 63% 0 30px 0
    .d_title
      font-family: 'Oswald'
      width: 40%
      font-size: 3.1vw
      line-height: 1
      padding-bottom: 0.8vw
      @include laptop
        font-size: 39px
      @include mobile
        width: 100%
        font-size: 32px
        line-height: 1.1
        padding-bottom: 10px
    .d_release_date
      font-family: 'Oswald'
      font-size: 1.6vw
      padding-bottom: 1.6vw
      @include laptop
        font-size: 22px
      @include mobile
        font-size: 18px
        padding-bottom: 15px
    .d_row
      line-height: 1
      font-size: 1.1vw
      @include laptop
        font-size: 15px
      .d_label
        display: inline-block
        vertical-align: middle
        height: 32px
        color: #000
        font-size: 16px
        line-height: 34px
        font-weight: bold
        padding: 0 10px
        margin: 0 -1px 12px 0
        border-radius: 3px
        border-top-right-radius: 0
        border-bottom-right-radius: 0
        background-color: #fff
        @include laptop
          height: 25px
          font-size: 12px
          line-height: 27px
          padding: 0 9px
        @include mobile
          // height: 24px
          // line-height: 26px
          margin: 0 -1px 10px 0
          background-color: #eaeaea
      .d_vote_average
        display: inline-block
        vertical-align: middle
        height: 32px
        font-size: 19px
        line-height: 32px
        font-weight: bold
        padding: 0 12px
        margin: 0 15px 12px 0
        border: 1px solid #fff
        border-radius: 3px
        border-top-left-radius: 0
        border-bottom-left-radius: 0
        @include laptop
          height: 25px
          font-size: 15px
          line-height: 23px
          padding: 0 10px
          margin: 0 13px 12px 0
        @include mobile
          // height: 24px
          font-size: 14px
          // line-height: 22px
          margin: 0 11px 10px 0
          border-color: #eaeaea
      .d_genres
        display: inline-block
        vertical-align: middle
        margin: 0 15px 12px 0
        @include laptop
          margin: 0 12px 12px 0
        @include mobile
          margin: 0 6px 10px 0
        .genre
          display: inline-block
          margin: 0 5px 0 0
          &:after
            content: '/'
          &:last-child
            &:after
              display: none
      .d_runtime
        display: inline-block
        vertical-align: middle
        margin-bottom: 12px
        @include mobile
          margin-bottom: 10px
        svg
          margin-right: 3px
    .d_overview
      width: 29%
      color: #f0f0f0
      font-size: 1.14vw
      @include laptop
        font-size: 15px
      @include mobile
        width: 100%
  .d_img
    position: absolute
    top: 0
    right: 0
    width: 76%
    padding-bottom: 42.75%
    z-index: 1
    background: url(./assets/img/loading.svg) no-repeat center / 70px
    @include laptop
      width: 82%
      background-size: 60px
    @include mobile
      top: 60px
      width: 100%
      padding-bottom: 56.25%
      background-size: 40px
    &.hideBg
      background: none
    img
      &.imgNull
        width: 120px
        height: 120px
        @include laptop
          width: 100px
          height: 100px
        @include mobile
          width: 80px
          height: 80px
    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 32%
      height: 100%
      z-index: 12
      background: linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)
      @include laptop
        width: 36%
      @include mobile
        display: none
    &:after
      content: ''
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 18%
      z-index: 11
      background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)
      @include mobile
        height: 23%
  .d_credits
    display: flex
    flex-wrap: wrap
    .d_credits_title
      font-family: 'Oswald'
      font-size: 1.5vw
      @include laptop
        font-size: 20px
      @include mobile
        font-size: 23px
        margin-bottom: 10px
    .d_directing
      flex: 0 0 12.5%
      @include mobile
        flex: 0 0 100%
      .celeb
        flex: 0 0 100%
        @include mobile
          flex: 0 0 56%
          padding: 0
          margin: 10px 0 25px 22%
    .d_actors
      flex: 0 0 87.5%
      @include mobile
        flex: 0 0 100%
      &.tv
        flex: 0 0 100%
        .celeb
          flex: 0 0 12.5%
          @include mobile
            flex: 0 0 47%
            padding: 0
            margin: 0 6% 25px 0

    .d_credits_box
      display: flex
      flex-wrap: wrap

.row_box
  position: relative
  margin-bottom: 20px
  &.bottom
    margin: 20px 0
  &.tac
    text-align: center
.search
  .row_box
    margin-bottom: 80px

.btn
  display: inline-block
  padding: 6px 16px
  border: 1px solid #eaeaea
  border-radius: 6px
  cursor: pointer
  transition: .3s
  &:hover
    color: #000
    background-color: #eaeaea
  @include mobile
    font-size: 16px
    padding: 6px 12px
  svg
    font-size: 15px
    margin: 0 -3px 0 5px
  &.al
    padding: 10px 24px
    svg
      margin: 0 5px 0 -3px

.results_box
  position: relative

.slider_box
  .btn
    float: right

.pagination
  text-align: center
  margin-bottom: 40px
  div
    display: inline-block
    vertical-align: top
    min-width: 40px
    height: 38px
    line-height: 38px
    margin-bottom: 10px
    border: 1px solid #999
    cursor: pointer
    transition: .3s
    &:hover
      color: #000
      border-color: #eaeaea
      background-color: #eaeaea
      @include mobile
        color: #fff
        border-color: #999
        background-color: transparent
    &.current
      color: #000
      border-color: #eaeaea
      background-color: #eaeaea
    &:first-child, &:last-child
      font-size: 13px
  &.one_page
    div
      &:first-child, &:last-child
        display: none
  &.first_page
    div
      &:first-child
        display: none
  &.last_page
    div
      &:last-child
        display: none
  &.first_ellipsis
    div
      &:nth-child(2)
        padding: 0 8px
        &:after
          content: ' ...'
  &.last_ellipsis
    div
      &:nth-last-child(2)
        padding: 0 8px
        &:before
          content: '... '

#app
  &.ch
    font-size: 16px
    .title
      font-size: 28px
      @include laptop
        font-size: 22px
      @include mobile
        font-size: 20px
    .subtitle
      font-size: 26px
      @include laptop
        font-size: 20px
        .total_results
          font-size: 15px
      @include mobile
        font-size: 18px
    .d_info
      margin-bottom: 20px
      @include mobile
        margin-bottom: 30px
    .d_title
      font-size: 3vw;
      font-weight: bold
      @include mobile
        font-size: 26px
    .d_overview
      font-size: 1.11vw
      line-height: 1.5
      margin-top: 5px
      @include mobile
        font-size: 15px
    .d_credits_title
      font-size: 1.4vw
      @include mobile
        font-size: 20px
    .btn
      font-size: 15px
      padding: 8px 16px;

</style>
