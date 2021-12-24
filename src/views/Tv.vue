<template>
  <div class="detail_box">
    <div class="d_info">
      <div class="d_title">{{ tvDetail.name }}</div>
      <div class="d_release_date">{{ tvDetail.last_air_date }}</div>
      <div class="d_row">
        <div class="d_label">TV</div>
        <div class="d_vote_average">{{ tvDetail.vote_average }}</div>
        <div class="d_genres">
          <div class="genre" v-for="(item, key) in tvDetail.genres" :key="key">
            {{ item.name }}
          </div>
        </div>
        <div v-if="tvDetail.episode_run_time" class="d_runtime"><font-awesome-icon icon="clock" />{{ tvDetail.episode_run_time[0] }}m</div>
      </div>
      <div class="d_overview">{{ tvDetail.overview }}</div>
    </div>
    <div v-if="'backdrop_path' in tvDetail" class="d_img" :class="{hideBg:!tvDetail.backdrop_path}">
      <img v-if="!tvDetail.backdrop_path" src="../assets/img/imgNull_movie.svg" class="imgNull">
      <img v-else v-lazy="`https://image.tmdb.org/t/p/original${tvDetail.backdrop_path}`" :key="`https://image.tmdb.org/t/p/original${tvDetail.backdrop_path}`">
    </div>
    <div class="d_credits">
      <div class="d_actors tv">
        <div class="d_credits_title">Main Actors</div>
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
      tvDetail: {},
      tvCredits: {},
      mainActors: []
    }
  },
  created(){
    var tvId = this.$route.params.id;
    this.$http.all([this.getTvDetail(tvId), this.getTvCredits(tvId)]).then((results) => {
      // console.log(results[0].data);
      this.tvDetail = results[0].data;
      this.tvCredits = results[1].data;
      this.mainActors = this.tvCredits.cast.slice(0, 8);
    });
  },
  computed:{
    
  },
  methods:{
    // TMDB Tv Get Details API
    getTvDetail(id){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}tv/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`)
    },
    // TMDB Tv Get Credits API
    getTvCredits(id){
      return this.$http.get(`${process.env.VUE_APP_API_BASEURL}tv/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`)
    }
  },
  components:{
    CelebItem
  }
}
</script>

<style scoped lang="sass">



</style>