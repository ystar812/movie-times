<template>
  <div class="content search">
    <div class="title">Search result for "{{ keyword }}"</div>
    <div v-if="keyword && statusAll && results.length == 3" class="results_box all_category_results">
      <div class="row_box">
        <div class="subtitle">Movies <span class="total_results">({{results[0].data.total_results}})</span></div>
        <div class="slider_box" v-if="results[0].data.results.length > 0">
          <Slider :sliderData="results[0].data.results" :sIndex="'s1'" />
          <div class="btn" @click="moreResults(keyword,'movie',1)">more results <font-awesome-icon icon="chevron-right" /></div>
        </div>
      </div>
      <div class="row_box">
        <div class="subtitle">Celebs <span class="total_results">({{results[1].data.total_results}})</span></div>
        <div class="slider_box" v-if="results[1].data.results.length > 0">
          <Slider :sliderData="results[1].data.results" :sIndex="'s2'" />
          <div class="btn" @click="moreResults(keyword,'person',1)">more results <font-awesome-icon icon="chevron-right" /></div>
        </div>
      </div>
      <div class="row_box">
        <div class="subtitle">Tv Show <span class="total_results">({{results[2].data.total_results}})</span></div>
        <div class="slider_box" v-if="results[2].data.results.length > 0">
          <Slider :sliderData="results[2].data.results" :sIndex="'s3'" />
          <div class="btn" @click="moreResults(keyword,'tv',1)">more results <font-awesome-icon icon="chevron-right" /></div>
        </div>
      </div>
    </div>
    <div v-if="keyword && statusMore" class="results_box single_category_results">
      <div class="subtitle">{{categoryLabel}} <span class="total_results">({{sResults.total_results}})</span></div>
      <div class="list_box" :class="{show:showList}">
        <Item v-for="(item, key) in sResults.results" :key="key" :sItem="item" />
      </div>
      <div class="pagination" :class="pageClass">
        <div @click="moreResults(keyword,category,page-1)"><font-awesome-icon icon="chevron-left" /></div>
        <div v-for="(item, key) in pagination" :key="key" :class="{current: item == page }" @click="moreResults(keyword,category,item)">{{ item }}</div>
        <div @click="moreResults(keyword,category,page+1)"><font-awesome-icon icon="chevron-right" /></div>
      </div>
      <div class="row_box bottom tac">
        <div class="btn al" @click="searchAll(keyword)"><font-awesome-icon icon="chevron-left" /> All Category</div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/Slider.vue'
import Item from '../components/Item.vue'

export default {
  name: 'Search',
  data(){
    return{
      statusAll: false,
      results: [],
      categoryLabel: '',
      sResults: {}, //single category results
      statusMore: false,
      showList: false,
      pagination: [],
      pageClass: {
        one_page: false,
        first_page: false,
        last_page: false,
        first_ellipsis: false,
        last_ellipsis: false
      }
    }
  },
  computed:{
    // 取得參數
    keyword(){
      if (this.$route.query.keyword) {
        return this.$route.query.keyword;
      }else{
        return ''
      }
    },
    category(){
      if (this.$route.query.category) {
        return this.$route.query.category == 'celeb' ? 'person' : this.$route.query.category;
      }else{
        return ''
      }
    },
    page(){
      if (this.$route.query.page) {
        return parseInt(this.$route.query.page);
      }else{
        return ''
      }
    }
  },
  watch:{
    // 監聽參數
    keyword(value){
      this.search(value, this.category, this.page)
    },
    category(value){
      this.search(this.keyword, value, this.page)
    },
    page(value){
      this.search(this.keyword, this.category, value)
    },
  },
  methods:{
    // TMDB Search Movies API
    searchMovies(v){
      if (v) {
        return this.$http.get(`${process.env.VUE_APP_API_BASEURL}search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${v}&page=1&include_adult=false`)
      }
    },
    // TMDB Search People API
    searchCelebs(v){
      if (v) {
        return this.$http.get(`${process.env.VUE_APP_API_BASEURL}search/person?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${v}&page=1&include_adult=false`)
      }
    },
    // TMDB Search TV Shows API
    searchTv(v){
      if (v) {
        return this.$http.get(`${process.env.VUE_APP_API_BASEURL}search/tv?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${v}&page=1&include_adult=false`)
      }
    },
    async searchAll(val){
      await this.$router.push({
        path: '/search',
        query: {
          keyword: val
        }
      });
      await this.$http.all([this.searchMovies(val), this.searchCelebs(val), this.searchTv(val)]).then((response) => {
        this.results = response;
      });
      this.statusAll = true;
      this.statusMore = false;
      this.showList = false;
    },
    getPagination(){
      if(this.sResults.total_pages) {
        if (this.sResults.total_pages <= 10) {
          this.pagination = Array(this.sResults.total_pages).fill().map((value, index) => index + 1);
        }else{
          if (this.page < 10) {
            this.pagination = Array(10).fill().map((value, index) => index + 1);
            this.pagination.push(this.sResults.total_pages);
            this.pageClass.first_ellipsis = false;
            this.pageClass.last_ellipsis = true;
          }else{
            this.pagination = Array(this.page + 4).fill('', this.page - 5).map((value, index) => index + 1).filter((item) => {
              return item > 0 && item <= this.sResults.total_pages
            });
            this.pagination.unshift(1);
            this.pageClass.first_ellipsis = true;
            if (this.page < this.sResults.total_pages - 4) {
              this.pagination.push(this.sResults.total_pages);
              this.pageClass.last_ellipsis = true;
              if (this.page == this.sResults.total_pages - 5) {
                this.pageClass.last_ellipsis = false;
              }
            }else{
              this.pageClass.last_ellipsis = false;
            }
          }
        }

        if (this.sResults.total_pages == 1) {
          this.pageClass.one_page = true;
        }else{
          this.pageClass.one_page = false;
          if (this.page == 1) {
            this.pageClass.first_page = true;
            this.pageClass.last_page = false;
          }else if (this.page == this.sResults.total_pages){
            this.pageClass.first_page = false;
            this.pageClass.last_page = true;
          }else{
            this.pageClass.first_page = false;
            this.pageClass.last_page = false;
          }
        }
        
      }
    },
    // 搜尋單一類別結果 search single category
    async moreResults(v,c,p){
      if (v) {
        await this.$http.get(`${process.env.VUE_APP_API_BASEURL}search/${c}?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${v}&page=${p}&include_adult=false`).then((response) => {
          this.sResults = response.data;
        });
      }
      await this.$router.push({
        path: '/search',
        query: {
          keyword: v,
          category: c,
          page: p > this.sResults.total_pages ? this.sResults.total_pages : p
        }
      });
      switch (c) {
        case 'movie':
          this.categoryLabel = 'Movies';
          break;
        case 'person':
          this.categoryLabel = 'Celebs';
          break;
        case 'tv':
          this.categoryLabel = 'Tv Show';
          break;
      }
      this.getPagination();
      this.statusAll = false;
      this.statusMore = true;
      this.showList = true;
    },
    // 帶入參數並串接 TMDB search API
    async search(v,c,p){
      if (c && c == 'movie' || c == 'person' || c == 'tv') {
        if (!p) {
          this.moreResults(v, c, 1);
        }else{
          this.moreResults(v, c, p);
        }
      }else{
        this.searchAll(v);
      }
    }
  },
  // 從別的頁面轉換過來(網址重新整理)時第一次的created 或是直接更改網址也會(網址重新整理)
  async created(){
    await this.search(this.keyword, this.category, this.page);
  },
  components:{
    Slider,
    Item
  }
}
</script>

<style lang="sass">

</style>