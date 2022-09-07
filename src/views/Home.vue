<template>
  <div class="home">
    <Banner :bannerImages="newMovies"/>
    <div class="content">
      <div class="row_box">
        <div class="title">{{title[0]}}</div>
        <div class="slider_box">
          <Slider :sliderData="newMovies" :sIndex="'s1'" />
        </div>
      </div>
      <div class="row_box">
        <div class="title">{{title[1]}}</div>
        <div class="slider_box">
          <Slider :sliderData="popTvShows" :sIndex="'s2'" />
        </div>
      </div>
      <div class="row_box">
        <div class="title">{{title[2]}}</div>
        <div class="slider_box">
          <Slider :sliderData="popCelebs" :sIndex="'s3'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Slider from '../components/Slider.vue'
// import Item from '../components/Item.vue'

export default {
  name: 'Home',
  data(){
    return{
      bannerImages: [],
      newMovies: [],
      popTvShows: [],
      popCelebs: [],
      title: []
    }
  },
  created(){
    this.getAllData();
  },
  computed:{
    language(){
      // return this.$store.state.language;
      return this.$cookies.get('language');
    },
  },
  watch:{
    language(){
      this.getAllData();
    }
  },
  methods:{
    // TMDB Discover Movie Discover API(new movies in this month)
    getNewMovies(gte, lte){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${gte}&primary_release_date.lte=${lte}&with_watch_monetization_types=flatrate`)
    },
    // TMDB Discover TV Discover API(popular TV)
    getPopTvShows(){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}discover/tv?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_withwatch0=false_withwatch0`)
    },
    // TMDB People Get Popular API(popular people)
    getPopCelebs(){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}person/popular?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&page=1`)
    },
    getAllData(){
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const lastMonth = new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
      this.$http.all([this.getNewMovies(lastMonth,today),this.getPopTvShows(),this.getPopCelebs()]).then((results) => {
        this.newMovies = results[0].data.results.slice(0,14);
        this.popTvShows = results[1].data.results.slice(0,14);
        this.popCelebs = results[2].data.results.slice(0,14);
      });
      this.language == 'en-US' ? this.title = ['Now Playing Movies','Popular TV Shows','Popular Celebs'] : this.title = ['最新熱門電影','熱門影集','熱門名人'];
    }
  },
  components:{
    Banner,
    Slider,
    // Item
  }
}
</script>

<style lang="sass">

</style>