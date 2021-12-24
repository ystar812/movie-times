<template>
  <div class="celeb">
    <router-link :to="`/celeb/${cItem.id}`">
      <div class="celeb_img">
        <div v-if="'profile_path' in cItem">
          <img v-if="!cItem.profile_path" src="../assets/img/imgNull_celeb.svg" class="imgNull">
          <img v-else v-lazy="`https://image.tmdb.org/t/p/w400${cItem.profile_path}`" :key="`https://image.tmdb.org/t/p/w400${cItem.profile_path}`">
        </div>
      </div>
      <div class="celeb_con">
        <div class="celeb_name">{{ cItem.name }}</div>
        <div class="celeb_character">{{ cItem.character }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'CelebItem',
    props: ['cItem']
  }
</script>

<style scoped lang="sass">

.celeb
  flex: 0 0 14.285%
  padding: 20px 20px 20px 0
  @include mobile
    flex: 0 0 47% !important
    padding: 0 !important
    margin: 0 6% 25px 0 !important
    &:nth-child(2n)
      margin: 0 0 25px 0 !important
  .celeb_img
    position: relative
    overflow: hidden
    padding-bottom: 150%
    margin-bottom: 12px
    @include laptop
      margin-bottom: 10px
    @include mobile
      margin-bottom: 8px
  .celeb_con
    line-height: 1.1
    @include laptop
      font-size: 13px
    @include mobile
      font-size: 15px
    .celeb_name
      margin-bottom: 5px
      @include mobile
        margin-bottom: 4px
    .celeb_character
      color: rgba(255,255,255,0.5)
.d_directing
  .celeb_img
    @include mobile
      padding-bottom: 136%

</style>