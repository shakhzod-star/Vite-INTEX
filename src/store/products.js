import { defineStore } from "pinia";
import { useCounterStore } from "./categories"
import  axios  from "axios";

export const useProducts = defineStore("products", {
  state: () => ({
    products : [],
   
  }),
  actions: {
    fetchProducts() {
      const category = useCounterStore()
      axios.get(category.backend_url + "api/home/product")
      .then(({data}) => this.products = data.data)
      .catch(e => console.log('product-error',e));
    }
  },
});
