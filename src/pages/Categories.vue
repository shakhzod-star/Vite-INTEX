<template>
  <div>
    <pulse-loader
      v-if="loading"
      :loading="loading"
      :color="color"
      class="loading"
    ></pulse-loader>
    <div
      v-else
      class="all"
      :id="category.id"
      v-for="category in getItems"
      :key="category.index"
    >
      <div class="bg">
        <h2 class="Title">{{ category[`name_${locale}`] }}</h2>
      </div>
      <div class="pools">
        <div
          data-aos="fade-up"
          v-for="product in category.products"
          :key="product.index"
        >
          <div class="pool">
            <span
              class="status"
              :style="
                product.status_id == 1
                  ? 'background: #139d4b;'
                  : product.status_id == 2
                  ? 'background: #FFE600;'
                  : product.status_id == 3
                  ? 'background: #ED2020;'
                  : ''
              "
              v-if="product.status_ru != ''"
              >{{ product.status_ru }}</span
            >
            <div class="poolName">{{ product[`frame_${locale}`] }}</div>
            <div class="box">
              <img
                class="categoriesImg"
                crossorigin="anonymous"
                :src="product.image"
                :alt="product.image"
              />
              <!-- src="@/assets/img/not-aviable.png" -->
            </div>
            <!-- <div class="poolComment" v-if="product.comment" >{{ product.comment }}</div> -->
            <div class="price_order">
              <div class="price">
                <span>{{ formatNumber(product.price) }} {{ $t("money") }}</span>
                <p>{{ formatNumber(product.sale_price) }} {{ $t("money") }}</p>
              </div>
              <button
                class="order"
                v-if="product.status_id != 3"
                @click="open(product)"
                :disabled="product.status_id == 3"
              >
                {{ $t("order") }}
              </button>
            </div>
          </div>
        </div>
        <Transition name="bounce">
          <div v-if="carcasModal" class="carcasModal">
            <img
              class="cross"
              src="../assets/icons/Modal/cross.png"
              alt="cross"
              @click="BModal"
            />
            <div class="picture">
              <p class="text">{{ orderItem[`frame_${locale}`] }}</p>
              <img
                crossorigin="anonymous"
                :src="orderItem.image"
                :alt="orderItem.image"
              />
              <span class="sum"
                >{{ formatNumber(orderItem.sale_price) }} {{ $t("money") }}
              </span>
            </div>
            <form class="info" @submit.prevent="save">
              <input
                v-model.trim="form.name"
                :class="v$.form.name.$error ? 'form-error' : ''"
                type="text"
                :placeholder="$t('name')"
                :aria-label="$t('name')"
              />
              <p
                class="p-valid"
                :style="v$.form.name.$error ? 'opacity: 1' : ''"
                :class="v$.form.name.$error ? 'error' : ''"
              >
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
              <p
                class="p-valid"
                :style="v$.form.number.$error ? 'opacity: 1' : ''"
              >
                {{ $t("setNumber") }}
              </p>
              <input
                v-model.trim="form.address"
                :class="v$.form.address.$error ? 'form-error' : ''"
                type="text"
                :placeholder="$t('yourAddress')"
                :aria-label="$t('yourAddress')"
              />
              <p
                class="p-valid"
                :style="v$.form.address.$error ? 'opacity: 1' : ''"
              >
                {{ $t("setName") }}
              </p>
              <button class="order" :disabled="disabled">
                {{ $t("order") }}
              </button>
            </form>
          </div>
        </Transition>
        <div v-if="bgModal" class="bgModal" @click="BModal"></div>
        <Transition name="bounce">
          <div class="successModal" v-if="successModal">
            <img
              @click="BModal"
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
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions, mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useCounterStore } from "../store/categories";
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
        number: { required, minLength: minLength(14) },
        address: { required },
      },
    };
  },
  computed: {
    ...mapState(useCounterStore, ["getItems","categories","locale"])

  },
  methods: {
    ...mapActions(useCounterStore, [
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
};
</script>

<style lang="scss" scoped>
.loading {
  margin: 20px auto;
  display: flex;
  justify-content: center;
}

.all {
  padding-top: 71px;
}
.bg {
  .titleh1 {
    padding: 22px 0;
  }
}
.pools {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 0 0;
  .pool {
    padding: 31px 31px 33px 31px;
    margin-right: 41px;
    margin: 0 41px 40px 0;
    background: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 0px 35px 35px 35px;
    position: relative;
    max-width: 340px;

    .status {
      position: absolute;
      top: 0;
      left: 0;
      padding: 4px 18px;

      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 17px;
      color: #ffffff;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
      border-radius: 0px 0px 10px 0px;
    }
    .poolName {
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 23px;
      text-align: center;
      color: #009398;
    }

    .box {
      display: flex;
      max-width: 275px;
      max-height: 125px;
      .categoriesImg {
        margin-bottom: 7px;
        width: 100%;
      }
    }
    .poolComment {
      font-family: "trebuchetms";
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      text-align: center;

      color: #009398;
    }
    .price_order {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .price {
        span {
          font-family: "Spartan-Regular";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 13px;
          color: #848484;
          margin: 0;
          position: relative;
          width: 100%;
        }
        span:before {
          position: absolute;
          content: "";
          height: 2px;
          width: 100%;
          transform: rotate(8deg);
          background: #ff0000;
          margin: auto;
          top: 0;
          bottom: 0;
        }
        p {
          color: #000000;
          font-family: "Spartan-SemiBold";
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 17px;
          margin: 10px 0 0 0;
        }
      }
      .order {
        background: #ffe600;
        box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.25);
        border-radius: 0px 10px;
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 17px;
        text-align: center;
        color: #000000;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 104px;
        padding: 0 5px;
        height: 24px;
        margin-left: 5px;
      }
    }
  }
  .pool:nth-child(3n) {
    margin-right: 0;
  }
}
@media (max-width: 800px) {
  .pools .aos-animate:last-child .pool {
    margin-bottom: 0;
  }
}

@media (max-width: 500px) {
  .all {
    padding-top: 62px;
  }
}
@media (max-width: 380px) {
  .pools {
    .pool {
      padding: 32px 12px 28px 12px;
      .status {
      }
      .poolName {
      }

      .box {
      }
      .poolComment {
      }
      .price_order {
        .price {
          span {
            font-size: 10px;
            line-height: 11px;
          }
          span:before {
          }
          p {
            font-size: 14px;
            line-height: 15px;
            margin: 5px 0 0 0;
            white-space: nowrap;
          }
        }
        .order {
          white-space: nowrap;
          font-size: 14px;
          line-height: 15px;
        }
      }
    }
  }
}
</style>
