import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        uid: null,
        diaryList: null,
        weather: '',
    },
    mutations: {
        user (state, payload) {
            state.uid = payload;
        },
        diaryList (state, payload) {
            state.diaryList = payload;
        },
        setWeather (state, payload) {
            state.weather = payload;
        }
    },
    getter: {
        userId(state) {
            return(state.uid);
        },
        weather(state) {
            return(state.weather);
        }
    }
});