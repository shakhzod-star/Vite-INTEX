import { defineStore } from "pinia";
import { useProducts } from "./products"
import  axios  from "axios";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    categories: [],
    site: {},
    locale: "uz",
    backend_url: "https://market-index.herokuapp.com/",
    botToken: "5381011300:AAEq4uVHwZ99SE-cnFV63I0QRuV03T4Pzx4/",
    chatId: -723987438,
    // backend_url: 'http://31.44.6.77:5555/'
  }),
  getters:{
    getItems(){
      const state = useProducts()
        const { products } = state 
    return this.categories.map(category=> ({...category,
      products:products.filter(product => product.category_id == category.id)
    }));
  
  }
  },
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
            reject()
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
      const products = useProducts()
      axios
          .get(this.backend_url + "api/home/category")
          .then(({data}) => {
            products.fetchProducts()
            this.categories= data.data
          }).catch((e) => {
            console.log('err',e)
          })
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
        
    },
    updateLang(payload) {

      this.locale = payload.locale;
      console.log(this.locale);
    },
    updateSite(payload) {
      this.site = payload;
    },
   
  }
});
