<template>
  <div class="pagination" :class="pageClass">
    <div @click="changePage(currentPage-1)"><font-awesome-icon icon="chevron-left" /></div>
    <div v-for="n in 10" :key="n" :class="{current: n == currentPage }" @click="changePage(n)">{{ n }}</div>
    <div @click="changePage(currentPage+1)"><font-awesome-icon icon="chevron-right" /></div>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: [],
    data(){
      return{
        currentPage: 1,
        pageClass: {
          first_page: false,
          last_page: false
        },
      }
    },
    created(){
      this.changePage(1);
    },
    methods:{
      changePage(p){
        this.currentPage = p;
        this.$emit('updatePage', p);
        if (this.currentPage === 1) {
          this.pageClass.first_page = true;
          this.pageClass.last_page = false;
        }else if (this.currentPage === 10){
          this.pageClass.first_page = false;
          this.pageClass.last_page = true;
        }else{
          this.pageClass.first_page = false;
          this.pageClass.last_page = false;
        }
      }
    }
  }
</script>

<style scoped lang="sass">

</style>