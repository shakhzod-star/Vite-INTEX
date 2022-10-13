<template>
  <div class="bg">
    <div class="footer">
      <form @submit.prevent="save">
        <h2>{{ $t("message.freeConsultation") }}</h2>
        <input
          v-model.trim="form.name"
          :aria-label="$t('message.name')"
          :class="v$.form.name.$error ? 'form-error' : ''"
          type="text"
          :placeholder="$t('message.name')"
        />
        <p class="p-valid" :style="v$.form.name.$error ? 'opacity: 1' : ''">
          {{ $t("message.setName") }}
        </p>
        <input
          type="text"
          v-mask="{mask: '+998NN NNNNNNN' }"
          v-model.trim="form.number"
          :placeholder="$t('message.number')"
          :aria-label="$t('message.number')"
          :class="v$.form.number.$error ? 'form-error' : ''"
        />
        <p class="p-valid" :style="v$.form.number.$error ? 'opacity: 1' : ''">
          {{ $t("message.setNumber") }}
        </p>
        <button class="consult" :disabled="disabled">
          {{ $t("message.toConsult") }}
        </button>
      </form>
      <div class="dateAdd">
        <div class="DateTime">
          <div class="time">
            <img src="../assets/img/time.png" alt="time" />
            <p>{{ $t("message.workTime") }}</p>
          </div>
          <div class="relax">
            {{ site[`work_time_${locale}`] }}
          </div>
          <div class="social">
            <a :href="`tel:${site.phone_number}`"
              ><img src="../assets/icons/social/phone.png" alt="phone"
            /></a>
            <a :href="site.telegram_link" target="_blank">
              <img src="../assets/icons/social/telegram.svg" alt="telegram"
            /></a>
            <a :href="site.instagram_link" target="_blank"
              ><img src="../assets/icons/social/instagram.svg" alt="instagram"
            /></a>
          </div>
        </div>
        <ul class="address">
          <li>Intex-market.uz</li>
          <li>{{ site.phone_number }}</li>
          <li>{{ site[`address_${locale}`] }}</li>
          <li>{{ $t("message.allReserved") }}.</li>
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
        <p class="text">{{ $t("message.thanks") }} !</p>
        <span class="message"> {{ $t("message.yourOrderFramed") }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "../../node_modules/@vuelidate/validators";
import useVuelidate from "../../node_modules/@vuelidate/core";
import footer from '../Mixins/Footer'
export default {
mixins : [footer],
setup() {
    return { v$: useVuelidate() };
  },  
  validations() {
    return {
      form: {
        name: { required },
        number: { required, minLength: minLength(14) },
      },
    };
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
