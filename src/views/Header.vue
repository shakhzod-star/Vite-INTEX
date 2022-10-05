<template>
  <div>
    <Navbar />
    <img class="mainPhoto" src="../assets/img/mainPhoto.jpg" alt="mainPhoto" />
  </div>
</template>
<script>
import Navbar from "../components/navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.mainPhoto {
  margin: 0 auto;
  width: 100%;
  padding-top: 71px;
}
@media(max-width:500px){
  .mainPhoto{
 padding-top: 62px;
  }
}

</style>
