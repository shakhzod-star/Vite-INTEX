<template>
  <div class="navbar">
    <div class="navBg">
      <div class="nav">
        <a href="#" class="logo"> INTEX-SHOP.UZ </a>
        <ul class="navList">
          <li v-for="list in getCategories" :key="list.index">
            <a :href="'#' + list.id"> {{ list[`name_${getLang}`] }}</a>
          </li>
        </ul>
        <div class="phone_social">
          <a class="phone" :href="`tel:${site.phone_number}`">{{
            site.phone_number
          }}</a>
          <a :href="site.telegram_link" target="_blank"
            ><img src="../assets/icons/social/telegram.svg" alt="telegram"
          /></a>
          <a :href="site.instagram_link" target="_blank"
            ><img src="../assets/icons/social/instagram.svg" alt="instagram"
          /></a>
          <div
            style="text-transform: uppercase"
            class="lang"
            @click="setLocale"
          >
            {{ getLang ? getLang : "uz" }}
          </div>
          <button class="burger" @click="BurgerActive = !BurgerActive">
            <img src="../assets/icons/Modal/burger.svg" alt="burger" />
          </button>
        </div>
      </div>
    </div>
    <div class="burgerMenu" :class="{ active: BurgerActive }">
      <a href="#" class="intex">INTEX-SHOP.UZ</a>
      <ul class="navList">
        <li class="list" v-for="list in getCategories" :key="list.index">
          <a :href="'#' + list.id" @click="BurgerActive = !BurgerActive">{{
            list[`name_${getLang}`]
          }}</a>
        </li>
      </ul>
      <div class="socials">
        <a class="phone" :href="`tel:${site.phone_number}`">
          <img src="../assets/icons/social/phonee.svg" alt="phone" />
          {{ $t("call") }}
        </a>
        <a class="social" :href="site.telegram_link" target="_blank">
          <img src="../assets/icons/social/telegramm.svg" alt="telegram" />
          {{ $t("telegram") }}
        </a>
        <a class="social" :href="site.instagram_link" target="_blank">
          <img src="../assets/icons/social/instagramm.svg" alt="instagram" />
          {{ $t("instagram") }}
        </a>
      </div>
    </div>
    <div
      v-if="BurgerActive"
      class="bgModal"
      @click="BurgerActive = !BurgerActive"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState  } from "Pinia";
import { useCounterStore } from '../pinia/index'
export default {
  data() {
    return {
      BurgerActive: false,
      site: {},
      isActive: false,
      navList: [],
      lang: "uz",
    };
  },
  computed: {
    ...mapState (useCounterStore,["getSite", "getCategories", "getLang"]),
  },
  methods: {
    ...mapActions(useCounterStore,["fetchSite", "fetchCategories", "fetchLang"]),
    setLocale() {
      this.isActive = !this.isActive;
      if (this.isActive && this.getLang != "ru") {
        this.fetchLang("ru");
      } else {
        this.fetchLang("uz");
      }
      this.$i18n.locale = this.getLang;
      localStorage.setItem("language", this.getLang);
    },
  },
  mounted() {
      console.log(this.getCategories);
    this.fetchSite().then(res => this.site = res).catch(error => console.log(error));
    let locale = localStorage.getItem("language");
    if (locale == null) {
      this.fetchLang("uz");
    } else {
      this.fetchLang(locale);
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .navBg {
    background: #009398;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1440px;
      padding: 20px 66px;
      margin: 0 auto;
      .logo {
        text-decoration: none;
        font-family: "Signika-Bold";
        font-style: normal;
        font-weight: 600;
        font-size: 25px;
        line-height: 31px;
        color: #ffffff;
        text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
        margin: 0 7px 0 0;
      }
      .navList {
        display: flex;
        margin: 0;
        align-items: center;
        li {
          margin: 0;
          list-style: none;
          padding: 3px 0;
          border-radius: 8px;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
          &:hover {
            background: rgba(0, 170, 170, 0.5);
          }
          &:active {
            background: rgba(0, 170, 170, 1);
          }
          a {
            text-decoration: none;
            font-family: "trebuchetms";
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 26px;
            text-align: center;
            color: #ffffff;
            padding: 0 16px;
          }
        }
      }
      .phone_social {
        display: flex;
        align-items: center;
        a {
          max-height: 26px;
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 23px;
          text-align: center;
          color: #ffffff;
          text-decoration: none;
          margin-right: 14px;
          img {
            width: 24px;
            height: 24px;
            transition: 0.3s all ease-in-out;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
        a:last-child {
          margin-right: 0;
        }
        .lang {
          height: 24px;
          width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 16px;
          text-align: center;
          color: #00979c;
          background: #ffffff;
          border-radius: 3px;
          cursor: pointer;
          transition: 0.3s all ease-in-out;
          &:hover {
            transform: scale(1.1);
          }
        }
        .burger {
          display: none;
          border: none;
          background: none;
          margin-left: 16px;
        }
      }
    }
  }
  .burgerMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: -500px;
    background: #009398;
    height: 100vh;
    width: 284px;
    z-index: 1001;
    transition: all 0.4s ease-in-out;
    overflow-y: scroll;
    &.active {
      left: 0;
    }
    .intex {
      font-family: "Signika-Bold";
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 31px;
      margin-top: 12px;
      text-align: center;
      color: #ffffff;
      text-decoration: none;
      text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
      margin-bottom: 60px;
    }
    .navList {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .list {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        a {
          font-family: "Trebuchet MS";
          font-style: normal;
          font-weight: 700;
          font-size: 17px;
          line-height: 20px;
          color: #009398;
          background: #ffffff;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          width: 236px;
          padding: 17px 0;
          text-align: center;
        }
      }
    }
    .socials {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      .phone {
        padding: 10px 30px;
        margin-bottom: 30px;
        width: 236px;
        display: flex;
        background: #139d4b;
        border-radius: 10px;
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        line-height: 24px;
        border: none;
        white-space: nowrap;
        color: #ffffff;
        img {
          margin-right: 16px;
        }
      }
      .social {
        padding: 2px 30px;
        margin-bottom: 30px;
        width: 236px;
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        line-height: 24px;
        color: #009398;
        background: #ffffff;
        border-radius: 10px;

        img {
          margin-right: 7px;
        }
      }
      .social:nth-child(2) {
        padding: 10px 30px;
        img {
          margin-right: 27px;
        }
      }
    }
  }
  .burgerMenu::-webkit-scrollbar {
    width: 5px;
  }
  .burgerMenu::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
    border-radius: 10px;
  }
  .burgerMenu::-webkit-scrollbar-thumb {
    background: #00979c;
    border-radius: 3px;
  }
  // .burgerMenu::-webkit-scrollbar-thumb:hover {
  //   background: white;
  // }
}

@media (max-width: 1250px) {
  .navbar {
    .navBg {
      .nav {
        .logo {
        }
        .navList {
          display: none;
          li {
            a {
            }
          }
        }
        .phone_social {
          .phone {
            display: none;
          }
          a {
            img {
            }
          }
          a:first-child {
          }
          a:last-child {
          }
          .lang {
          }
          .burger {
            display: block;
          }
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .navbar {
    .navBg {
      .nav {
        padding: 18px 20px;
        .logo {
          font-size: 20px;
          line-height: 25px;
        }
        .navList {
          display: none;
          li {
            a {
            }
          }
        }
        .phone_social {
          .phone {
            display: none;
          }
          a {
            margin-right: 10px;
            img {
            }
          }
          a:first-child {
          }
          a:last-child {
            margin-right: 0;
          }
          .lang {
          }
          .burger {
          }
        }
      }
    }
  }
}
</style>
