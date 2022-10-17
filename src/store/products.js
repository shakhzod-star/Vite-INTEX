import { defineStore } from "pinia";
import { useCategoriesStore } from "./categories"
import  axios  from "axios";

export const useProducts = defineStore("products", {
  state: () => ({
    products : [],
    counter : 0,
    max : 5,
  }),
  actions: {
     fetchProducts() {
      const category = useCategoriesStore()
    return  axios.get(category.backend_url + "api/home/product")
      .then(({data}) =>  this.products = data.data)
      .catch(e => console.log('product-error',e));
    },
  },
  getters:{
    getIncrement(){
      return Math.round((this.counter / this.max) * 100)
    }
  }
});
