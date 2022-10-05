import { defineStore } from "pinia";
// import  axios  from "axios";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    categories: [],
    products: [],
    site: {},
    locale: "uz",
    backend_url: "https://market-index.herokuapp.com/",
    botToken: "5381011300:AAEq4uVHwZ99SE-cnFV63I0QRuV03T4Pzx4/",
    chatId: -723987438,
    // backend_url: 'http://31.44.6.77:5555/'
  }),
  actions: {
    fetchBotOrder(data) {
      let allUserInfo = `Name: ${data.name}   \n  Number: ${data.phoneNumber}   \n  Address: ${data.address} `;
      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://api.telegram.org/bot${this.botToken}sendMessage?chat_id=${this.chatId}&text=${allUserInfo}`
          )
          .then((res) => resolve(res))
          .catch((e) => {
            console.error(e);
            reject();
          });
      });
    },
    fetchBotConsultation(data) {
      let allUserInfo = `Name: ${data.name} \n Number: ${data.phoneNumber} `;
      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://api.telegram.org/bot${this.botToken}sendMessage?chat_id=${this.chatId}&text=${allUserInfo}`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            console.error(e);
            reject();
          });
      });
    },
    fetchCategories() {
      return new Promise((resolve, reject) => {
        axios
          .get(this.backend_url + "api/home/category")
          .then((res) => {
              this.updateCategory(res.data.data);
              resolve(res?.data?.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    fetchSite(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.backend_url + "api/home/site")
          .then((res) => {
            resolve(res?.data?.data[0]);
            this.updateSite(res?.data?.data[0]);
            // ctx.commit("updateSite", res?.data?.data[0]);
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
          .post(this.backend_url + "api/home/order", data, {
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
          .post(this.backend_url + "api/home/consultation", data, {
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

    fetchLang(data) {
      this.updateLang(data);
    },
    updateLang(payload) {
      this.locale = payload.locale;
    },
    updateCategory(payload) {
      console.log(this.categories);
      console.log(payload);
      this.categories = [...payload];
      console.log(this.categories);
    },
    updateSite(payload) {
      this.site = payload;
    },
   
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
});

export const useProducts = defineStore("products", {
  state: () => ({
    products : [],
    backend_url: "https://market-index.herokuapp.com/",

  
  }),
  actions: {
    fetchProducts(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.backend_url + "api/home/product")
          .then((res) => {
            this.updateProduct(res.data.data);
            resolve(res.data.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    updateProduct(payload) {
      this.products = payload
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
});
