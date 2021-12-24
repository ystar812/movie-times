<template>
  <div class="content">
    <div class="list_box" :class="{show:showList}">
      <Item v-for="(item, key) in movies" :key="key" :sItem="item" />
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'Movies',
  data(){
    return{
      movies: [],
      showList: false
    }
  },
  async created(){
    // TMDB discover API
    var apiUrl = `${process.env.VUE_APP_API_BASEURL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1-3&primary_release_year=2016`;
    await this.$http.get(apiUrl).then((response) => {
      // console.log(response.data.results);
      this.movies = response.data.results;
    });
    this.showList = true;
  },
  methods:{
    
  },
  components:{
    Item
  }
}
</script>

<style lang="sass">

</style>