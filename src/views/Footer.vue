<template>
  <div class="bg">
    <div class="footer">
      <form @submit.prevent="save">
        <h2>{{ $t("freeConsultation") }}</h2>
        <input
          v-model.trim="form.name"
          :aria-label="$t('name')"
          :class="v$.form.name.$error ? 'form-error' : ''"
          type="text"
          :placeholder="$t('name')"
        />
        <p class="p-valid" :style="v$.form.name.$error ? 'opacity: 1' : ''">
          {{ $t("setName") }}
        </p>
        <input
          type="text"
          v-mask="'+998## #######'"
          v-model.trim="form.number"
          :placeholder="$t('number')"
          :aria-label="$t('number')"
          :class="v$.form.number.$error ? 'form-error' : ''"
        />
        <p class="p-valid" :style="v$.form.number.$error ? 'opacity: 1' : ''">
          {{ $t("setNumber") }}
        </p>
        <button class="consult" :disabled="disabled">{{ $t("toConsult") }}</button>
      </form>
      <div class="dateAdd">
        <div class="DateTime">
          <div class="time">
            <img src="../assets/img/time.png" alt="time" />
            <p>{{ $t("workTime") }}</p>
          </div>
          <div class="relax">
            {{     getSite[`work_time_${getLang}`]  }}
          </div>
          <div class="social">
            <a :href="`tel:${getSite.phone_number}`"
              ><img src="../assets/icons/social/phone.png" alt="phone"
            /></a>
            <a :href="getSite.telegram_link" target="_blank">
              <img src="../assets/icons/social/telegram.svg" alt="telegram"
            /></a>
            <a :href="getSite.instagram_link" target="_blank"
              ><img src="../assets/icons/social/instagram.svg" alt="instagram"
            /></a>
          </div>
        </div>
        <ul class="address">
          <li>Intex-market.uz</li>
          <li>{{ getSite.phone_number }}</li>
          <li>{{ getSite[`address_${getLang}`] }}</li>
          <li>{{ $t("allReserved") }}.</li>
        </ul>
      </div>
      <div
        v-if="successModal"
        class="bgModal"
        @click="successModal = !successModal"
      ></div>
      <div class="successModal" v-if="successModal">
        <img
          @click="successModal = !successModal"
          class="cross"
          src="../assets/icons/Modal/cross.png"
          alt="cross"
        />
        <img
          class="success"
          src="../assets/icons/Modal/success.png"
          alt="success"
        />
        <p class="text">{{ $t("thanks") }} !</p>
        <span class="message"> {{ $t("yourOrderFramed") }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "Pinia";
import { useCounterStore } from '../pinia/index'
import useVuelidate from "../../node_modules/@vuelidate/core";
import { required, minLength } from "../../node_modules/@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      successModal: false,
      form: {},
      disabled : false
    };
  },
  validations() {
    return {
      form: {
        name: { required },
        number: { required, minLength: minLength(14) },
      },
    };
  },
  computed: {
    ...mapState(useCounterStore,["getSite", "getLang"]),
  },
  methods: {
    ...mapActions(useCounterStore,["fetchConsultation", "fetchSite", "fetchBotConsultation"]),
    save() {
      this.disabled = true
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
              this.disabled = false
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
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.bg {
  .footer {
    max-width: 1105px;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 125px;
      h2 {
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 29px;
        text-align: center;
        color: #ffffff;
        margin: 0 0 20px 0;
        max-width: 272px;
      }

      input {
        margin-bottom: 2px;
        background: #ffffff;
        border-radius: 10px;
        border: none;
        height: 45px;
        width: 331px;
        max-width: 331px;
      }
      input[type="text"] {
        padding: 0 0 0 12px;
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #919191;
      }
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input:focus {
        outline: 0;
      }
      .consult {
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 17px;
        text-align: center;
        color: #000000;
        background: #ffe600;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        width: 239px;
        height: 37px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
      }
    }
    .dateAdd {
      display: flex;
      .DateTime {
        margin-right: 90px;
        .time {
          display: flex;
          align-items: center;
          margin: 0 0 20px 0;
          p {
            margin: 0 0 0 15px;
            font-family: "trebuchetms";
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 23px;
            color: #ffffff;
          }
        }
        .relax {
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 23px;
          color: #ffffff;
        }
        .social {
          margin: 12px 0 0 0;
          display: flex;
          a {
            margin: 0 25px 0 0;
            display: flex;
            img {
              width: 34px;
              height: 34px;
              transition: 0.3s all ease-in-out;
              &:hover {
                transform: scale(1.1);
              }
            }
            img:nt-child(3) {
              margin: 0;
            }
          }
        }
      }
      .address {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
        li {
          list-style: none;
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 23px;
          color: #ffffff;
          margin: 0 0 7px 0;
          max-width: 271px;
        }
        li:last-child {
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 15px;
          line-height: 17px;
          color: #ffffff;
          margin: 10px 0 0 0;
        }
      }
    }
  }
}
@media (max-width: 1070px) {
  .bg {
    .footer {
      flex-direction: column;
      align-items: center;

      form {
        margin: 0 0 40px 0;
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        //firefox
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }
    }
  }
}
@media (max-width: 700px) {
  .bg {
    .footer {
      form {
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        //firefox
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }
      .dateAdd {
        justify-content: space-between;
        .DateTime {
          margin-right: 20px;
          .time {
            white-space: nowrap;
          }
          .social {
            display: flex;
          }
        }
      }
    }
  }
}
@media (max-width: 550px) {
  .bg {
    .footer {
      form {
        h2 {
          font-size: 20px;
          line-height: 23px;
        }
        input {
          width: 272px;
          font-size: 15px;
          line-height: 17px;
        }
        input[type="text"] {
          font-size: 15px;
          line-height: 17px;
        }
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        //firefox
        input[type="number"] {
          font-size: 15px;
          line-height: 17px;
          -moz-appearance: textfield;
        }

        .consult {
          font-size: 15px;
          line-height: 17px;
        }
      }
      .dateAdd {
        .DateTime {
          .time {
            img {
              width: 24px;
              height: 24px;
            }
            p {
              margin: 0 0 0 12px;
              font-size: 15px;
              line-height: 17px;
            }
          }
          .relax {
            font-size: 12px;
            line-height: 14px;
            max-width: 165px;
          }
          .social {
            a {
              margin: 0;
              img {
                margin-right: 12px;
                width: 24px;
                height: 24px;
              }
            }
          }
        }
        .address {
          li {
            font-size: 12px;
            line-height: 14px;
          }
          li:last-child {
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
    }
  }
}
</style>
