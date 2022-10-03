import Vue from "vue";
import { createPinia } from "pinia";
import axios from "axios";


const Pinia = createPinia()
Vue.use(pinia);



export default new Pinia.Store({
  state: {
    categories: [],
    products: [],
    site: {},
    locale: "uz",
    backend_url: "https://market-index.herokuapp.com/",
    botToken : '5381011300:AAEq4uVHwZ99SE-cnFV63I0QRuV03T4Pzx4/',
    chatId : -723987438,
    // backend_url: 'http://31.44.6.77:5555/'
  },
  actions: {
    fetchBotOrder(ctx,data){
      let allUserInfo = `Name: ${data.name}   \n  Number: ${data.phoneNumber}   \n  Address: ${data.address} `
      return new Promise((resolve, reject) => {
        axios                          
          .post(`https://api.telegram.org/bot${this.state.botToken}sendMessage?chat_id=${this.state.chatId}&text=${allUserInfo}`)
          .then((res) => resolve(res))
          .catch((e) => {
            console.error(e);
            reject();
          });
      });
    },
    fetchBotConsultation(ctx,data){
      let allUserInfo = `Name: ${data.name} \n Number: ${data.phoneNumber} `
      return new Promise((resolve, reject) => {
        axios
          .post(`https://api.telegram.org/bot${this.state.botToken}sendMessage?chat_id=${this.state.chatId}&text=${allUserInfo}`)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            console.error(e);
            reject();
          });
      });
    },
    // async
    fetchCategories(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.backend_url + "api/home/category")
          .then((res) => {
            ctx.commit("updateCategory", res.data.data);
            resolve(res.data.data);
          })
          .catch((e) => {
            console.error(e);
            reject();
          });
      });
   
    },
    fetchProducts(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.backend_url + "api/home/product")
          .then((res) => {
            ctx.commit("updateProduct", res.data.data);
            resolve(res.data.data);
          })
          .catch((e) => {
            console.error(e);
            reject();
          });
      });
    },
    fetchSite(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.backend_url + "api/home/site")
          .then((res) => {
            resolve(res?.data?.data[0]);
            ctx.commit("updateSite", res?.data?.data[0]);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //POST Order
    fetchOrder(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.backend_url + "api/home/order", data, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    // POST Consultation
    fetchConsultation(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.backend_url + "api/home/consultation", data, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchLang({commit},data){
      commit("updateLang",data)
    }
  },
  mutations: {
    updateCategory(state, data) {
        state.categories = data;
    },
    updateProduct(state, data) {
      state.products = data;
    },
    updateSite(state, data) {
      state.site = data;
    },
    updateLang(state,data){
    state.locale = data
    }
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getProducts(state) {
      return state.products;
    },
    getSite(state) {
      return state.site;
    },
    getLang(state) {
      return state.locale;
    },
  },
  modules: {},
});
