<template>
  <div class="content">
    <div class="title s2">{{title}}</div>
    <div class="list_box" :class="{show:showList}">
      <Item v-for="(item, key) in celebs" :key="key" :sItem="item" />
    </div>
    <Pagination @updatePage="newPage" :class="{show:showList}"/>
  </div>
</template>

<script>
import Item from '../components/Item.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'Celebs',
  data(){
    return{
      celebs: [],
      title: '',
      showList: false,
      page: ''
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
      this.getAllData(this.page);
    },
    page(value){
      this.getAllData(value);
    }
  },
  methods:{
    async getAllData(p){
      this.showList = false;
      // TMDB People Get Popular API(popular people)
      var apiUrl = `${process.env.VUE_APP_API_BASEURL}person/popular?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&page=${p}`;
      await this.$http.get(apiUrl).then((response) => {
        // console.log(response.data.results);
        this.celebs = response.data.results;
      });
      this.language == 'en-US' ? this.title = 'Popular Celebs' : this.title = '熱門名人';
      this.showList = true;
      window.scrollTo(0,0);
    },
    newPage(val){
      this.page = val
    }
  },
  components:{
    Item,
    Pagination
  }
}
</script>

<style lang="sass">

</style>