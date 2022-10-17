import { mapActions } from "pinia";
import { useCategoriesStore } from '../store/categories'
export default { 
    
      data() {
        return {
          modal: false,
          successModal: false,
          disabled: false,
          form: {},
        };
      },
    
      methods: {
        ...mapActions(useCategoriesStore,["fetchConsultation", "fetchBotConsultation"]),
        save() {
          this.disabled = true
          this.v$.$validate();
          if (!this.v$.$error) {
            let newForm = {
              name: this.form.name,
              phoneNumber: this.form.number.slice(4)
            };
            this.fetchConsultation(newForm)
              .then((res) => {
                if (res.status == 201) {
                  this.modal = !this.modal;
                  this.successModal = !this.successModal;
                  this.form.name = "";
                  this.form.number = "";
                }
                this.v$.form.name = false;
                this.v$.form.number = false;
                this.disabled = false
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
        outClick() {
          if (!this.v$.$error) {
            this.modal = false;
            this.successModal = false;
          }
        },
        ModalClose(){
          this.modal = !this.modal
          console.log('modal :', this.modal);
        }
      },
}