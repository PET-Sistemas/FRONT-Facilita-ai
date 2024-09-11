<template>
  <div class="main-div">
    <BemVindo class="bem-vindo" />
    <LoginPage class="login-page" />
  </div>
</template>

<script>
import LoginPage from '../components/LoginPage.vue';
import BemVindo from '../components/BemVindo.vue';

export default {
  name: 'HomePage',
  components: {
    BemVindo,
    LoginPage 
  }
};
</script>

<style scoped>
.main-div {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
  overflow: hidden;
}

.bem-vindo {
  flex: 0 0 55vw; 
  height: 100%;
  margin: 0;
}


.login-page {
  flex: 0 0 45vw; 
  height: 100%;
  margin-top: 13vw;
}

@media screen and (max-width: 600px) {
  .main-div {
    flex-direction: column;
  }

  .login-page {
    width: 100%;
    margin: 0;
  }
}
</style>
