import { mapActions, mapState } from "pinia";
import { useCategoriesStore } from "../store/categories";
export default {
  
  data() {
    return {
      successModal: false,
      form: {},
      disabled: false,
    };
  },
 
  computed: {
    ...mapState(useCategoriesStore, ["site", "locale"]),
  },
  methods: {
    ...mapActions(useCategoriesStore, [
      "fetchConsultation",
      "fetchSite",
      "fetchBotConsultation",
    ]),
    save() {
      this.disabled = true;
      this.v$.$validate();
      if (!this.v$.$error) {
        let newForm = {
          name: this.form.name,
          phoneNumber: this.form.number.slice(4),
        };
        this.fetchConsultation(newForm)
          .then((res) => {
            if (res.status == 201) {
              this.form.name = "";
              this.form.number = "";
              this.v$.form.name = false;
              this.v$.form.number = false;
              this.successModal = true;
              this.disabled = false;
            }
            setTimeout(() => {
              this.successModal = false;
            }, 5000);
          })
          .catch((err) => {
            console.error(err);
          });
        this.fetchBotConsultation(newForm);
      }
    },
  },
  mounted() {},
}