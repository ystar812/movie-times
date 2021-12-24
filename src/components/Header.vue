<template>
  <header>
    <router-link to="/" class="logo">
      <img src="../assets/img/logo.svg">
    </router-link>
    <nav :class="{open:openMenu}">
      <ul>
        <li><router-link to="/movies" @click.native="mobileOpenMenu">MOVIES</router-link></li>
        <li><router-link to="/" @click.native="mobileOpenMenu">TV SHOW</router-link></li>
        <li><router-link to="/" @click.native="mobileOpenMenu">CELEBS</router-link></li>
      </ul>
    </nav>
    <div class="search_box">
      <input type="text" placeholder="search" ref="search" v-model.trim="searchKeyword" @keydown.enter="goSearch">
        <!-- <router-link :to="`/search?keyword=${searchKeyword}`" class="search_btn"> -->
        <!-- 上面這行<router-link :to="...">等同於 <div @click="goSearch"> 不一定要div 隨便一個標籤都可" -->
        <div class="search_btn" @click="goSearch">
          <div class="search_icon"><font-awesome-icon icon="search" /></div>
        </div>
        <!-- </router-link> -->
    </div>
    <div class="m_menu_btn" :class="{active:openMenu}" @click="mobileOpenMenu">
      <div class="mmb_t"></div>
      <div class="mmb_m"></div>
      <div class="mmb_b"></div>
    </div>
    <div class="nav_bg" :class="{active:openMenu}" @click="mobileOpenMenu"></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return{
      openMenu: false,
      searchKeyword: ''
    }
  },
  computed: {
    
  },
  methods:{
    mobileOpenMenu(){
      this.openMenu = !this.openMenu
    },
    goSearch(){
      if (this.searchKeyword !== ''){
        if (this.searchKeyword !== this.$route.query.keyword){
          this.$router.push({
            path: '/search',
            query: {
              keyword: this.searchKeyword
            }
          });
        }
        this.searchKeyword = '';
        this.$refs.search.blur();
      }
    }
  }
}
</script>

<style scoped lang="sass">

header
  position: fixed
  width: 100%
  padding: 15px 2%
  font-weight: 400
  backdrop-filter: blur(10px)
  background-color: rgba(0,0,0,.4)
  z-index: 1000
  @include laptop
    padding: 10px 2%
  @include mobile
    padding: 8px
    backdrop-filter: none
    background-color: rgba(0,0,0,1)
  *
    float: left
  .logo
    float: left
    width: 130px
    @include laptop
      width: 100px
    @include mobile
      width: 94px
    img
      width: 100%
  nav
    font-family: 'Oswald'
    @include mobile
      position: fixed
      top: 0
      right: 0
      width: 280px
      height: 100%
      overflow-y: auto
      -webkit-overflow-scrolling: touch
      z-index: 20
      backdrop-filter: blur(10px)
      background-color: rgba(0,0,0,.4)
      transform: translateX(280px)
      transition: transform .4s
      &.open
        transform: translateX(0)
    ul
      padding: 0
      margin: 28px 0 0 30px
      @include laptop
        margin: 16px 0 0 30px
      @include mobile
        margin: 30px 0
      li
        list-style: none
        padding: 0 30px
        @include mobile
          width: 100%
        a
          color: #fff
          font-size: 18px
          letter-spacing: 0.5px
          @include laptop
            font-size: 16px
          @include mobile
            width: 100%
            padding: 20px
  .search_box
    float: right
    margin-top: 12px
    @include laptop
      margin-top: 5px
    @include mobile
      margin: 6px 43px 0 0
    input
      width: 400px
      @include mobile
        width: calc(100vw - 203px)
      @include phone
        width: calc(100vw - 193px)
    .search_btn
      display: flex
      justify-content: center
      align-items: center
      width: 38px
      height: 36px
      cursor: pointer
      @include mobile
        width: 32px
        height: 32px
      .search_icon
        font-size: 20px
        @include mobile
          font-size: 18px
  .m_menu_btn
    @include mobile
      display: block
      position: absolute
      top: 0
      right: 0
      width: 60px
      height: 60px
      z-index: 30
      div
        position: absolute
        display: block
        left: 20px
        width: 22px
        height: 2px
        background-color: #fff
      .mmb_t
        top: 22px
        transition: all 0.2s ease-in-out
      .mmb_m
        top: 29px
        transition: opacity 0.2s ease-in-out
      .mmb_b
        top: 36px
        transition: all 0.2s ease-in-out
      &.active
        .mmb_t
          top: 27px
          transform: rotate(-45deg)
        .mmb_m
          opacity: 0
        .mmb_b
          top: 27px
          transform: rotate(45deg)
  .nav_bg
    @include mobile
      position: fixed
      display: none
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 10
      &.active
        display: block

</style>
