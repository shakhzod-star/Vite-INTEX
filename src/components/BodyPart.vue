<template>
  <div>
    <div class="bg">
      <div class="modalPart">
        <h2 class="Title">{{ $t("freeDeliver") }}</h2>
        <p class="text">{{ $t("orderFreeIn") }} {{ $t("orderPayOut") }}</p>
        <button  class="add" @click="modal = !modal">
          {{ $t("checkout")}} 
        </button>
      </div>
      <div v-if="modal || successModal" class="bgModal" @click="outClick"></div>
      <Transition name="bounce" >
        <form v-if="modal" class="modal" @submit.prevent="save">
          <img
            class="cross"
            @click="modal = false"
            src="../assets/icons/Modal/cross.png"
            alt="cross"
          />
          <img
            class="feedback"
            src="../assets/icons/Modal/feedback.png"
            alt="feedback"
          />
          <p class="text">{{ $t("getConsult") }}</p>
          <input
            :class="v$.form.name.$error ? 'form-error' : ''"
            type="text"
            v-model.trim="form.name"
            :placeholder="$t('yourName')"
            :aria-label="$t('yourName')"
          />
          <p
            class="p-valid"
            :style="v$.form.name.$error ? 'opacity: 1' : ''"
            :class="v$.form.name.$error ? 'error' : ''"
          >
            {{ $t("setName") }}
          </p>
          <input
            :class="v$.form.number.$error ? 'form-error' : ''"
            v-mask="'+998## #######'"
            v-model.trim="form.number"
            type="text"
            :placeholder="$t('yourNumber')"
            :aria-label="$t('yourNumber')"
          />
          <p
            class="p-valid"
            :style="v$.form.number.$error ? 'opacity: 1' : ''"
            :class="v$.form.number.$error ? 'error' : ''"
          >
            {{ $t("setNumber") }}
          </p>
          <button class="order" :disabled="disabled">{{ $t("order") }}</button>
        </form>
      </Transition>
      <Transition name="bounce" >
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
          <span class="message"> {{ $t("orderSuccess") }} .</span>
        </div>
      </Transition>
    </div>
    <div class="ours">
      <div class="ours_clients">
        <h2>{{ $t("valuesClients") }}</h2>
        <div class="ours_link">
          <div class="box">
            <img src="../assets/img/slide/slider2.png" alt="slider" />
            <ul>
              <li>
                <span>{{ $t("experience") }}</span>
              </li>
              <li>
                <p>{{ $t("professionalismEmployees") }}</p>
              </li>
            </ul>
          </div>
          <div class="box">
            <img src="../assets/img/slide/slider.png" alt="slider" />
            <ul>
              <li>
                <span>{{ $t("delivery") }}</span>
              </li>
              <li>
                <p>{{ $t("freeDeliveryCity") }}</p>
              </li>
            </ul>
          </div>
          <div class="box">
            <img src="../assets/img/slide/slider3.png" alt="slidertick" />
            <ul>
              <li>
                <span> {{ $t("quality") }}</span>
              </li>
              <li>
                <p>{{ $t("sturdyPools") }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="water">
        <h2>{{ $t("poolsInTashkent") }}</h2>
        <div class="habr">
          <div class="habr_hab">
            <ul>
              <li>
                {{ $t("poolsAffordable") }} {{ $t("reliableEnvironmentally") }}
                {{ $t("pureProducts") }} {{ $t("pleasantHoliday") }}
                {{ $t("installedPerfectly") }} {{ $t("activelyUseIt") }}
                {{ $t("duringSummer") }} {{ $t("vividEmotions") }}
                {{ $t("summerDays") }}
              </li>
            </ul>
          </div>
          <div class="nabr_hub">
            <ul class="ticks">
              <li>
                {{ $t("poolsExtensive") }} {{ $t("listOfBenefits") }}
                {{ $t("highlightMost") }}
              </li>
            </ul>
            <ul>
              <li>
                <img src="../assets/img/tick.png" alt="tick" />
                {{ $t("strength") }}
              </li>
              <li>
                <img src="../assets/img/tick.png" alt="tick" />
                {{ $t("easyInstall") }}
              </li>
              <li>
                <img src="../assets/img/tick.png" alt="tick" />
                {{ $t("beautifulColors") }}
              </li>
              <li>
                <img src="../assets/img/tick.png" alt="tick" />
                {{ $t("stylishDesign") }}
              </li>
              <li>
                <img src="../assets/img/tick.png" alt="tick" />
                {{ $t("highQualityJust") }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useCounterStore } from '../store/categories'
import useVuelidate from "../../node_modules/@vuelidate/core";
import { required, minLength } from "../../node_modules/@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      modal: false,
      successModal: false,
      disabled: false,
      form: {},
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
  mounted() {},
  methods: {
    ...mapActions(useCounterStore,["fetchConsultation", "fetchBotConsultation"]),
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
  },
};
</script>

<style lang="scss" scoped>
.bg {
  .modal {
    background: #f8f8f8;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 441px;
    width: 100%;
    padding: 64px 40px;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    height: fit-content;
    margin: auto;
    z-index: 1001;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .cross {
      position: absolute;
      top: 22px;
      right: 30px;
    }
    .text {
      margin: 30px 0 27px 0;
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 35px;
      text-align: center;
      color: #000000;
    }
    input {
      background: #f8f8f8;
      border: 1px solid #cbcbcb;
      box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
      border-radius: 17px;
      text-align: start;
      max-width: 359px;
      width: 100%;
      padding: 12px 5px 12px 12px;
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 29px;

      color: #a3a3a3;
    }

    input[type="text"] {
      margin-bottom: 2px;
    }
    input[type="number"] {
      margin-bottom: 32px;
    }
    .order {
      background: #ffe600;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      border: none;
      padding: 5px;
      max-width: 200px;
      width: 100%;
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 29px;
      text-align: center;
      margin-top: 10px;
      color: #000000;
    }
  }

  .modalPart {
    padding: 20px 0 40px 0;
    .text {
      margin: 25px 0;
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 400;
      font-size: 23px;
      line-height: 27px;
      text-align: center;
      color: #ffffff;
    }
    .add {
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 23px;
      text-align: center;
      padding: 3px 22px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      color: #000000;
      background: #ffe600;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      border: none;
    }
  }
}
.ours {
  background: #e5e5e5;
  width: 100%;
  min-height: 200px;
  .ours_clients {
    h2 {
      padding: 20px 0;
      margin: 0 0 92px 0;
      color: #009398;
      background: #00939817;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      line-height: 60px;
      font-weight: 700;
      font-family: "trebuchetms";
    }
    .ours_link {
      max-width: 1200px;
      margin: 0 auto 50px auto;
      display: flex;
      justify-content: space-between;
      align-items: start;
      .box {
        display: flex;
        margin-right: 15px;
        img {
          margin-right: 25px;
          max-width: 124px;
          max-height: 124px;
          width: 100%;
          height: 100%;
        }
        ul {
          margin: 0;
          padding: 0;
          li {
            list-style: none;
          }
        }
        span {
          font-weight: 700;
          font-size: 40px;
          line-height: 45px;
          display: flex;
          align-items: center;
          font-family: "trebuchetms";
        }
        p {
          font-family: "trebuchetms";
          font-weight: 400;
          font-size: 24px;
          line-height: 28px;
          display: flex;
          align-items: center;
          margin: 5px 0 0 0;
        }
      }
      .box:last-child {
        margin: 0;
      }
    }
  }
  .water {
    h2 {
      margin: 0;
      padding: 20px 0;
      color: #009398;
      background: #00939817;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      line-height: 60px;
      font-weight: 700;
      font-family: "trebuchetms";
    }
    .habr {
      display: flex;
      margin: auto;
      justify-content: space-between;
      align-items: flex-start;
      max-width: 1200px;
      padding: 40px 32px 40px 32px;
      .habr_hab {
        max-width: 503px;
        margin-right: 10px;
        ul {
          text-align: justify;
        }
      }
      .nabr_hub {
        max-width: 515px;
        ul {
          text-align: justify;
          li {
            margin-bottom: 5px;
          }
        }
      }
      li {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 25px;
        line-height: 35px;
        list-style: none;
        font-family: "trebuchetms";
      }
      img {
        background: #009398;
        border-radius: 50%;
        padding: 3px;
        margin-right: 7px;
        width: 22px;
        height: 22px;
      }
    }
  }
}
@media (max-width: 1250px) {
  .ours {
    .ours_clients {
      h2 {
      }
      .ours_link {
        flex-direction: column;
        align-items: start;
        margin-left: auto;
        margin-right: auto;
        width: 700px;
        padding: 0 25px;
        .box {
          img {
          }
          ul {
            li {
            }
          }
          span {
          }
          p {
          }
        }
        .box:last-child {
        }
      }
    }
    .water {
      h2 {
      }
      .habr {
        li {
        }
        img {
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  .ours {
    .ours_clients {
      h2 {
      }
      .ours_link {
        .box {
          img {
          }
          ul {
            li {
            }
          }
          span {
          }
          p {
          }
        }
        .box:last-child {
        }
      }
    }
    .water {
      h2 {
      }
      .habr {
        flex-direction: column;
        align-items: start;
        .habr_hab {
          margin-bottom: 10px;
        }
        .nabr_hub {
          margin-top: 5px;
          &:nth-child(2) {
            ul {
              margin-top: 10px;
            }
          }
        }
        li {
        }
        img {
        }
      }
    }
  }
}
@media (max-width: 750px) {
  .ours {
    .ours_clients {
      h2 {
      }
      .ours_link {
        width: 100%;
        .box {
          img {
          }
          ul {
            li {
            }
          }
          span {
          }
          p {
          }
        }
        .box:last-child {
        }
      }
    }
    .water {
      h2 {
        font-size: 24px;
        line-height: 26px;
      }
      .habr {
        align-items: flex-start;
        .habr_hab {
        }
        li {
        }
        img {
        }
      }
    }
  }
}
@media (max-width: 650px) {
  .ours {
    .ours_clients {
      h2 {
        font-size: 18px;
        line-height: 22px;
        margin-bottom: 20px;
      }
      .ours_link {
        align-items: start;
        .box {
          img {
            width: 70px;
            height: 70px;
          }
          ul {
            li {
              span {
              }
              p {
              }
            }
          }
        }
        .box:last-child {
        }
      }
    }
    .water {
      h2 {
      }
      .habr {
        li {
        }
        img {
        }
      }
    }
  }
}
@media (max-width: 550px) {
  .bg {
    .modal {
      padding: 45px 30px 50px 30px;
      max-width: 329px;
      .cross {
        width: 23px;
        height: 23px;
        top: 16px;
        right: 22px;
      }
      .feedback {
        width: 90px;
        height: 97px;
      }
      .text {
        font-size: 22px;
        line-height: 26px;
        margin: 20px 0;
      }
      input {
        max-width: 268px;
      }

      input[type="text"] {
        font-size: 20px;
        line-height: 23px;
      }
      input[type="number"] {
        font-size: 20px;
        line-height: 23px;
      }
      .order {
        font-size: 20px;
        line-height: 23px;
      }
    }

    .modalPart {
      padding: 20px 12px 30px 12px;
      .text {
        margin: 15px 0 48px 0;
        font-size: 18px;
        line-height: 22px;
      }
      .add {
        font-size: 15px;
        line-height: 17px;
      }
    }
  }
  .ours {
    .ours_clients {
      h2 {
      }
      .ours_link {
        margin-bottom: 20px;
        .box {
          img {
          }
          ul {
            li {
              span {
                font-size: 20px;
                line-height: 23px;
              }
              p {
                font-size: 12px;
                line-height: 14px;
              }
            }
          }
        }
        .box:last-child {
        }
      }
    }
    .water {
      h2 {
        font-size: 18px;
        line-height: 22px;
      }
      .habr {
        padding: 20px 15px;
        li {
          font-size: 16px;
          line-height: 20px;
        }
        img {
        }
      }
    }
  }
}
</style>
