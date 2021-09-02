import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  mutations: {
    loginSuccess(state,userInfo) {
      state.userInfo = userInfo;
    },
    logout(state) {
      state.userInfo = {};
    }
  },
  actions: {
  },
  modules: {
  }
})
