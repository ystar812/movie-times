<template>
  <div class="content">
    <div class="title s2">{{title}}</div>
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
      title: '',
      showList: false
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
    getAllData(){
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const lastMonth = new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
      // TMDB Discover Movie Discover API(new movies in this month)
      var apiUrl = `${process.env.VUE_APP_API_BASEURL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${lastMonth}&primary_release_date.lte=${today}&with_watch_monetization_types=flatrate`;
      this.$http.get(apiUrl).then((response) => {
        // console.log(response.data.results);
        this.movies = response.data.results;
      });
      this.language == 'en-US' ? this.title = 'Now Playing Movies' : this.title = '最新熱門電影';
      this.showList = true;
    }
  },
  components:{
    Item
  }
}
</script>

<style lang="sass">

</style>