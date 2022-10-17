
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions, mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useCategoriesStore } from "../store/categories";
export default {
    components: {
        PulseLoader,
      },
      setup() {
        return { v$: useVuelidate() };
      },
      data() {
        return {
          loading: false,
          carcasModal: false,
          color: "#009398",
          bgModal: false, 
          successModal: false,
          disabled: false,
          form: {
            productId: "",
            name: "",
            phoneNumber: "",
          },
          orderItem: {},
          orderId: 1,
        };
      },
      validations() {
        return {
          form: {
            name: { required },
            number: { required, minLength: minLength(13) },
            address: { required },
          },
        };
      },
      computed: {
        ...mapState(useCategoriesStore, ["getItems","categories","locale","order"])
    
      },
      methods: {
        ...mapActions(useCategoriesStore, [
          "fetchCategories",
          "fetchOrder",
          "fetchBotOrder",
        ]),
        BModal() {
          if (this.bgModal) {
            this.successModal = false;
            this.carcasModal = false;
          }
          this.bgModal = !this.bgModal;
        },
        formatNumber(num) {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        open(product) {
          this.orderId = product.id;
          this.carcasModal = !this.carcasModal;
          this.bgModal = !this.bgModal;
          this.orderItem = {
            frame_ru: product.frame_ru,
            image: product.image,
            sale_price: product.sale_price,
          };
        },
         save() {
          this.disabled = true;
          this.v$.$validate();
          if (!this.v$.$error) {
            let newForm = {
              productId: this.orderId,
              name: this.form.name,
              phoneNumber: this.form.number.slice(4),
              address: this.form.address,
            };
            this.fetchOrder(newForm)
            .then((res) => {
                if (res.status == 201) {
                  this.carcasModal = false;
                  this.form.name = "";
                  this.form.number = "";
                  this.form.address = "";
                  this.v$.form.name = false;
                  this.v$.form.number = false;
                  this.v$.form.address = false;
                  this.successModal = true;
                  this.disabled = false;
                  setTimeout(() => {
                    this.successModal = false;
                    this.bgModal = false;
                  }, 3000);
                }
              })
              .catch((err) => {
                console.error(err);
              });
            this.fetchBotOrder(newForm);
          }
        },
      },
      
       mounted() {
       this.fetchCategories()
      },
}