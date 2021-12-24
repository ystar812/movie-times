<template>
  <div class="home">
    <Banner :bannerImages="newMovies"/>
    <div class="content">
      <div class="row_box">
        <div class="title">Now Playing Movies</div>
        <div class="slider_box">
          <Slider :sliderData="newMovies" :sIndex="'s1'" />
        </div>
      </div>
      <div class="row_box">
        <div class="title">Popular TV Shows</div>
        <div class="slider_box">
          <Slider :sliderData="popTvShows" :sIndex="'s2'" />
        </div>
      </div>
      <div class="row_box">
        <div class="title">Popular Celebs</div>
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
      // showList: false
    }
  },
  async created(){
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const lastMonth = new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
    // TMDB discover API
    this.$http.all([this.getNewMovies(lastMonth,today),this.getPopTvShows(),this.getPopCelebs()]).then((results) => {
      this.newMovies = results[0].data.results;
      this.popTvShows = results[1].data.results;
      this.popCelebs = results[2].data.results;
      // this.showList = true
    });
  },
  methods:{
    // TMDB Movie Discover API(New Movies in this month)
    getNewMovies(gte, lte){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${gte}&primary_release_date.lte=${lte}&with_watch_monetization_types=flatrate`)
    },
    getPopTvShows(){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}discover/tv?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_withwatch0=false_withwatch0`)
    },
    getPopCelebs(){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}person/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`)
    },
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