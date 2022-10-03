<template>
  <div>
    <Header />
    <Season />
    <Categories/>
    <BodyPart />
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Season from "../components/Season.vue";
import Categories from "../pages/Categories.vue";
import BodyPart from "../components/BodyPart.vue";
import Footer from "./Footer.vue";
export default {
  components: {
    Header,
    Season,
    Categories,
    BodyPart,
    Footer,
  },
};
</script>
