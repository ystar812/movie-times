<template>
  <header>
    <router-link to="/" class="logo">
      <img src="../assets/img/logo.svg">
    </router-link>
    <nav :class="{open:openMenu}">
      <ul>
        <li><router-link to="/movie" @click.native="mobileOpenMenu">{{menuItems[0]}}</router-link></li>
        <li><router-link to="/tv" @click.native="mobileOpenMenu">{{menuItems[1]}}</router-link></li>
        <li><router-link to="/celeb" @click.native="mobileOpenMenu">{{menuItems[2]}}</router-link></li>
      </ul>
    </nav>
    <div class="r_box">
      <div class="search_box">
        <input type="text" placeholder="search" ref="search" v-model.trim="searchKeyword" @keydown.enter="goSearch">
          <!-- <router-link :to="`/search?keyword=${searchKeyword}`" class="search_btn"> -->
          <!-- 上面這行<router-link :to="...">等同於 <div @click="goSearch"> 不一定要div 隨便一個標籤都可" -->
          <div class="search_btn" @click="goSearch">
            <div class="search_icon"><font-awesome-icon icon="search" /></div>
          </div>
          <!-- </router-link> -->
      </div>
      <div class="language_trigger" @click="changeLanguage">{{ lanLabel }}</div>
      <div class="language">
        <div @click="lanCH" :class="{current:language=='zh-TW'}">中</div>
        <div @click="lanEN" :class="{current:language=='en-US'}">EN</div>
      </div>
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
      searchKeyword: '',
      lanLabel: '',
      menuItems: []
    }
  },
  computed: {
    language(){
      return this.$cookies.get('language');
    }
  },
  mounted(){
    this.changeText();
  },
  watch:{
    language(){
      this.changeText();
    }
  },
  methods:{
    mobileOpenMenu(){
      this.openMenu = !this.openMenu
    },
    lanCH(){
      this.$cookies.set('language','zh-TW');
      // this.$store.dispatch('updateLanguage', 'zh-TW');
    },
    lanEN(){
      this.$cookies.set('language','en-US');
      // this.$store.dispatch('updateLanguage', 'en-US');
    },
    changeLanguage(){
      this.language == 'en-US' ? this.$cookies.set('language','zh-TW') : this.$cookies.set('language','en-US')
    },
    changeText(){
      if (this.language == 'en-US') {
        this.lanLabel = 'EN'
        this.menuItems = ['MOVIES', 'TV SHOWS', 'CELEBS']
      }else{
        this.lanLabel = '中'
        this.menuItems = ['電影', '影集', '名人']
      }
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
    height: 60px
    padding: 7px
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
      width: 80px
      margin-top: 5px
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
  .r_box
    float: right
    margin-top: 12px
    @include laptop
      margin-top: 5px
    @include mobile
      margin: 7px 48px 0 0
    .language_trigger
      display: none
      @include mobile
        display: block
        width: 30px
        height: 28px
        font-size: 12px
        text-align: center
        padding-top: 4px
        margin-top: 4px
        border-radius: 3px
        border: 1px solid rgba(255,255,255,.6)
    .language
      margin-top: 3px
      @include mobile
        display: none
      div
        font-size: 14px
        width: 32px
        text-align: center
        padding: 4px 0
        margin: 0 3px
        border-radius: 3px
        cursor: pointer
        transition: .2s
        &:hover
          background-color: rgba(255,255,255,.3)
        &.current
          color: #000
          background-color: rgba(255,255,255,.9)
        @include laptop
          width: 30px
          font-size: 13px
          padding: 3px 0
    .search_box
      margin-right: 10px
      @include mobile
        margin-right: 5px
      input
        width: 380px
        @include mobile
          width: calc(100vw - 235px)
        @include phone
          width: calc(100vw - 214px)
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
            font-size: 17px
  .m_menu_btn
    @include mobile
      display: block
      position: absolute
      top: 0
      right: 0
      width: 50px
      height: 60px
      z-index: 30
      div
        position: absolute
        display: block
        left: 12px
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

#app
  &.ch
    .language_trigger
      @include mobile
        font-size: 13px

</style>
