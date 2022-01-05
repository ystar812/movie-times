<template>
  <div class="content">
    <div class="title s2">{{title}}</div>
    <div class="list_box" :class="{show:showList}">
      <Item v-for="(item, key) in celebs" :key="key" :sItem="item" />
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'Celebs',
  data(){
    return{
      celebs: [],
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
      // TMDB discover API
      var apiUrl = `${process.env.VUE_APP_API_BASEURL}person/popular?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}&page=1`;
      this.$http.get(apiUrl).then((response) => {
        // console.log(response.data.results);
        this.celebs = response.data.results;
      });
      this.language == 'en-US' ? this.title = 'Popular Celebs' : this.title = '熱門名人';
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