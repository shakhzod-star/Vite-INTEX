import { defineStore } from "pinia";

import  axios  from "axios";

export const useProducts = defineStore("products", {
  state: () => ({
    products : [],
    backend_url: "https://market-index.herokuapp.com/",
  }),
  actions: {
    fetchProducts() {
      axios
      .get(this.backend_url + "api/home/product")
      .then(({data}) => this.products = data.data)
      .catch((e) => console.log('product-error',e));
    }
  },
});
