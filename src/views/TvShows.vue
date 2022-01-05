<template>
  <div class="content">
    <div class="title s2">{{title}}</div>
    <div class="list_box" :class="{show:showList}">
      <Item v-for="(item, key) in tvShows" :key="key" :sItem="item" />
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'TvShows',
  data(){
    return{
      tvShows: [],
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
      // TMDB Discover TV Discover API(popular TV)
      var apiUrl = `${process.env.VUE_APP_API_BASEURL}discover/tv?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_withwatch0=false_withwatch0`;
      this.$http.get(apiUrl).then((response) => {
        // console.log(response.data.results);
        this.tvShows = response.data.results;
      });
      this.language == 'en-US' ? this.title = 'Popular TV Shows' : this.title = '熱門影集';
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