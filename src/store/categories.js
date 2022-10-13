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
        axios.post(`https://api.telegram.org/bot${this.botToken}sendMessage?chat_id=${this.chatId}&text=${allUserInfo}`)
      },

    fetchBotConsultation(data) {
      let allUserInfo = `Name: ${data.name} \n Number: ${data.phoneNumber} `;
        axios.post(`https://api.telegram.org/bot${this.botToken}sendMessage?chat_id=${this.chatId}&text=${allUserInfo}`
          )
    },
    fetchCategories() {
      const products = useProducts()
      axios.get(this.backend_url + "api/home/category")
          .then(({data}) => {
            products.fetchProducts()
            this.categories= data.data
          }).catch((e) => {
            console.log('err',e)
          })
    },
    fetchSite() {
        axios.get(this.backend_url + "api/home/site")
             .then(res => this.site = res?.data?.data[0])
            .catch(error => { console.log(error);});
    },
    fetchOrder(data) {
        return  axios
          .post(this.backend_url + "api/home/order", data, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            return res
          })
          .catch((e) => {
            console.error(e);
          });
     },
    fetchConsultation( data) {
        return    axios
          .post(this.backend_url + "api/home/consultation", data, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            return res
          })
          .catch((err) => {
           console.log(err);
          });
    },
    fetchLang(data) {
        this.locale = data
    },
  }
});
