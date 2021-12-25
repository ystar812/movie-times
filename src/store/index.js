import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 設定語系，後來用vue-cookies-reactive代替
  // state: {
  //   language: 'en-US'
  // },
  // mutations: {
  //   LAN(state, status){
  //     state.language = status
  //   }
  // },
  // actions: {
  //   updateLanguage(context, status){
  //     context.commit('LAN', status);
  //   }
  // },
  // modules: {
  // }
})
