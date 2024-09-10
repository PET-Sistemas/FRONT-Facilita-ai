<template>
  <div class="main-div">
    <BemVindo />
    <LoginPage />
  </div>
</template>

<script>
import LoginPage from '../components/LoginPage.vue';
import BemVindo from '../components/BemVindo.vue';

export default {
  name: 'HomePage',
  components: {
    BemVindo,
    LoginPage // Certifique-se de usar o mesmo nome da importação
  }
};
</script>

<style scoped>
.main-div {
  display: flex;
}

@media screen and (max-width: 600px) {
  .main-div {
    flex-direction: column;
  }
}
</style>
