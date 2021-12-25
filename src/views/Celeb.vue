<template>
  <div class="celeb_box">
    <div class="celeb_info_box">
      <div class="celeb_img">
        <div v-if="'profile_path' in celebDetail">
          <img v-if="!celebDetail.profile_path" src="../assets/img/imgNull_celeb.svg" class="imgNull">
          <img v-else v-lazy="`https://image.tmdb.org/t/p/w300${celebDetail.profile_path}`" :key="`https://image.tmdb.org/t/p/w300${celebDetail.profile_path}`">
        </div>
      </div>
      <div class="celeb_info">
        <div class="celeb_name">{{ celebDetail.name }}</div>
        <div class="celeb_title">{{pageText[0]}}</div>
        <div class="celeb_row">
          <div class="celeb_sub_title">{{pageText[1]}}</div>
          <div class="celeb_row_con">{{ celebDetail.known_for_department }}</div>
        </div>
        <div class="celeb_row">
          <div class="celeb_sub_title">{{pageText[2]}}</div>
          <div class="celeb_row_con">{{ celebDetail.birthday }}</div>
        </div>
        <div class="celeb_row">
          <div class="celeb_sub_title">{{pageText[3]}}</div>
          <div class="celeb_row_con">{{ celebDetail.place_of_birth }}</div>
        </div>
      </div>
    </div>
    <div class="celeb_con_box">
      <div class="celeb_name">{{ celebDetail.name }}</div>
      <div class="celeb_block">
        <div class="celeb_title">{{pageText[4]}}</div>
        <div class="celeb_biography_box">
          <div class="celeb_biography" :class="{truncate}" ref="biography">
            {{ celebDetail.biography }}
          </div>
          <div class="read_more" :class="{show:truncate}" @click="openBiography()">{{pageText[6]}} <font-awesome-icon icon="chevron-right" /></div>
        </div>
      </div>
      <div class="celeb_block">
        <div class="celeb_title">{{pageText[5]}}</div>
        <div class="celeb_known_for" :class="{show:showknownFor}">
          <Item v-for="(item, key) in knownFor" :key="key" :sItem="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'Celeb',
  data(){
    return{
      celebDetail: {},
      celebCombinedCredits: {},
      knownFor: [],
      truncate: false,
      showknownFor: false,
      pageText: []
    }
  },
  created(){
    this.getAllData();
  },
  computed:{
    language(){
      return this.$cookies.get('language');
    },
  },
  watch:{
    language(){
      this.getAllData();
    }
  },
  methods:{
    // TMDB People Get Details API
    getCelebDetail(id){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}person/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}`)
    },
    // TMDB People Get Combined Credits API
    getCelebCombined(id){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}person/${id}/combined_credits?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}`)
    },
    getAllData(){
      var celebId = this.$route.params.id;
      this.$http.all([this.getCelebDetail(celebId), this.getCelebCombined(celebId)]).then((results) => {
        // console.log(results[1].data);
        this.celebDetail = results[0].data;
        this.celebCombinedCredits = results[1].data;
        if (this.celebCombinedCredits.cast.length > this.celebCombinedCredits.crew.length) {
          this.knownFor = this.celebCombinedCredits.cast.sort(function (a, b) {
            return a.vote_count < b.vote_count ? 1 : -1;
          }).slice(0, 10);
        }else{
          this.knownFor = this.celebCombinedCredits.crew.filter(item =>{
            return item.job == 'Director'
          }).sort(function (a, b) {
            return a.vote_count < b.vote_count ? 1 : -1;
          }).slice(0, 10);
        }
        // nextTick()會在DOM已掛載、渲染完成後，執行nextTick()內的程式碼
        this.$nextTick(() => {
          if (this.$refs.biography.clientHeight > 200){
            this.truncate = true;
          }
          this.showknownFor = true;
        });
      });
      this.language == 'en-US' ? this.pageText = ['Personal Info','Known For','Birthday','Place of Birth','Biography','Known For','Read More'] : this.pageText = ['個人資訊','聞名於','生日','出生地','個人簡介','影視作品','更多'];
    },
    openBiography(){
      this.truncate = false;
    }
  },
  components:{
    Item
  }
}
</script>

<style scoped lang="sass">

.celeb_box
  display: flex
  flex-wrap: wrap
  width: 1200px
  margin: 40px auto
  @include laptop
    width: 1000px
  @include mobile
    width: 86%
    margin: 20px auto
  .celeb_name
    font-family: 'Oswald'
    font-size: 45px
    margin-bottom: 20px
    @include laptop
      font-size: 37px
    @include mobile
      font-size: 31px
      text-align: center
      margin-bottom: 30px
  .celeb_title
    font-size: 20px
    margin-bottom: 12px
    @include mobile
      font-size: 18px
  .celeb_row
    margin-bottom: 15px
    color: rgba(255,255,255,0.6)
  .celeb_sub_title
    color: #fff
    font-size: 16px
    margin-bottom: 3px
  .celeb_row_con
    @include mobile
      font-size: 15px
  .celeb_block
    margin-bottom: 25px
  .celeb_info_box
    flex: 0 0 25%
    @include mobile
      flex: 0 0 100%
      margin-bottom: 15px
    .celeb_img
      position: relative
      padding-bottom: 150%
      margin-bottom: 20px
      @include mobile
        width: 60%
        padding-bottom: 89%
        margin: 0 0 15px 20%
    .celeb_name
      @include desktop
        display: none
  .celeb_con_box
    flex: 0 0 75%
    padding: 0 0 0 40px
    @include mobile
      flex: 0 0 100%
      padding: 0
    .celeb_name
      @include mobile
        display: none
    .celeb_biography_box
      position: relative
      .celeb_biography
        color: #f0f0f0
        overflow: hidden
        &.truncate
          height: 200px
          &:after
            content: ''
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            height: 50px
            background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)
        @include laptop
          font-size: 16px
      .read_more
        display: none
        position: absolute
        bottom: -26px
        right: 10px
        font-size: 15px
        font-weight: bold
        cursor: pointer
        opacity: 0.5
        transition: .2s
        @include laptop
          bottom: -20px
        &.show
          display: block
        &:hover
          opacity: 1
        svg
          font-size: 16px
          margin-bottom: -0.5px
    .celeb_known_for
      display: flex
      flex-wrap: wrap
      opacity: 0
      transition: opacity .3s ease .3s
      &.show
        opacity: 1
      .item
        flex: 0 0 20%
        padding: 10px 10px 30px 0
        @include mobile
          flex: 0 0 50%
          padding: 15px 10px

#app
  &.ch
    .celeb_biography
      line-height: 1.5
      @include laptop
        font-size: 15px

</style>