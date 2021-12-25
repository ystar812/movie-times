<template>
  <div class="detail_box">
    <div class="d_info">
      <div class="d_title">{{ movieDetail.title }}</div>
      <div class="d_release_date">{{ movieDetail.release_date }}</div>
      <div class="d_row">
        <div class="d_label">{{ lable }}</div>
        <div class="d_vote_average">{{ movieDetail.vote_average }}</div>
        <div class="d_genres">
          <div class="genre" v-for="(item, key) in movieDetail.genres" :key="key">
            {{ item.name }}
          </div>
        </div>
        <div class="d_runtime"><font-awesome-icon icon="clock" />{{ movieDetail.runtime }}m</div>
      </div>
      <div class="d_overview">{{ movieDetail.overview }}</div>
    </div>
    <div v-if="'backdrop_path' in movieDetail" class="d_img" :class="{hideBg:!movieDetail.backdrop_path}">
      <img v-if="!movieDetail.backdrop_path" src="../assets/img/imgNull_movie.svg" class="imgNull">
      <img v-else v-lazy="`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`" :key="`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`">
    </div>
    <div class="d_credits">
      <div class="d_directing">
        <div class="d_credits_title">{{title[0]}}</div>
        <div class="d_credits_box">
          <CelebItem v-if="directing" :cItem="directing" />
        </div>
      </div>
      <div class="d_actors">
        <div class="d_credits_title">{{title[1]}}</div>
        <div class="d_credits_box">
          <CelebItem v-for="(item, key) in mainActors" :key="key" :cItem="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CelebItem from '../components/CelebItem.vue'

export default {
  name: 'Movie',
  data(){
    return{
      movieDetail: {},
      movieCredits: {},
      directing: {},
      mainActors: [],
      lable: '',
      title: []
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
    // TMDB Movies Get Details API
    getMovieDetail(id){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}movie/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}`)
    },
    // TMDB Movies Get Credits API
    getMovieCredits(id){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}movie/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=${this.language}`)
    },
    getAllData(){
      let movieId = this.$route.params.id;
      this.$http.all([this.getMovieDetail(movieId), this.getMovieCredits(movieId)]).then((results) => {
        // console.log(results[0].data);
        this.movieDetail = results[0].data;
        this.movieCredits = results[1].data;
        this.directing = this.movieCredits.crew.find(item =>{
          return item.job == 'Director'
        });
        this.mainActors = this.movieCredits.cast.slice(0, 7);
      });
      this.language == 'en-US' ? this.lable = 'MOVIE' : this.lable = '電影';
      this.language == 'en-US' ? this.title = ['Directing','Main Actors'] : this.title = ['導演','主要演員'];
    }
  },
  components:{
    CelebItem
  }
}
</script>

<style scoped lang="sass">



</style>