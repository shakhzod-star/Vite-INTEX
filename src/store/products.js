import { defineStore } from "pinia";
import { useCounterStore } from "./categories"
import  axios  from "axios";

export const useProducts = defineStore("products", {
  state: () => ({
    products : [],
    counter : 0,
    max : 100,
  }),
  actions: {
    fetchProducts() {
      const category = useCounterStore()
      axios.get(category.backend_url + "api/home/product")
      .then(({data}) => this.products = data.data)
      .catch(e => console.log('product-error',e));
    },
    increment(){
       this.counter++
    },
  },
  getters:{
    getIncrement(){
      return Math.round((this.counter / this.max) * 100)
    }
  }
});
