
import { mapActions, mapState  } from "pinia";
import { useCategoriesStore } from '../store/categories'

export default {
    data() {
        return {
          BurgerActive: false,
          isActive: false,
          navList: [],
          lang: "uz",
        };
      },
      computed: {
        ...mapState (useCategoriesStore,["getSite", "getItems", "locale",'site']),
      },
      methods: {
        ...mapActions(useCategoriesStore,["fetchSite", "fetchCategories", "fetchLang"]),
        setLocale() {
          this.isActive = !this.isActive;
          if (this.isActive && this.locale != "ru") {
            this.fetchLang("ru");
          } else {
            this.fetchLang("uz");
          }
          this.$i18n.locale = this.locale;
          localStorage.setItem("language", this.locale);
        },
      },
      mounted() {
        this.fetchSite()
        let locale = localStorage.getItem("language");
        if (locale == null) {
          this.fetchLang("uz");
        } else {
          this.fetchLang(locale);
        }
      },
}