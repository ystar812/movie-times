<template>
  <div class="home">
    <Banner :bannerImages="movies"/>
    <div class="content">
      <div class="slider_box">
        <Slider :sliderData="movies" :sIndex="'s1'" />
      </div>
      <div class="list_box" :class="{show:showList}">
        <Item v-for="(item, key) in movies" :key="key" :sItem="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Slider from '../components/Slider.vue'
import Item from '../components/Item.vue'

export default {
  name: 'Home',
  data(){
    return{
      bannerImages: [],
      movies: [],
      showList: false
    }
  },
  async created(){
    // TMDB discover API
    var apiUrl = `${process.env.VUE_APP_API_BASEURL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1-3&primary_release_year=2012`;
    await this.$http.get(apiUrl).then((response) => {
      // console.log(response.data.results);
      this.movies = response.data.results;
    });
    this.showList = true;
  },
  methods:{
    
  },
  components:{
    Banner,
    Slider,
    Item
  }
}
</script>

<style lang="sass">

</style>