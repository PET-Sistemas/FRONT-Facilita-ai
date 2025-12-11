<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const mensagem = ref("");
const API_URL = "http://localhost:8080";

const enviarSolicitacao = async () => {
  try {
    await axios.post(`${API_URL}/auth/esqueci-senha`, { email: email.value });
    mensagem.value = "Se o e-mail existir, enviamos um link para você!";
  } catch (error) {
    mensagem.value = "Erro ao solicitar. Verifique o e-mail.";
  }
};
</script>

<template>
  <div class="login-container">
    <div id="title">Recuperar Senha</div>
    <div class="email-field">
      <label for="email">Digite seu e-mail</label>
      <input v-model="email" id="email" type="email" />
    </div>
    <div class="button-link">
      <button @click="enviarSolicitacao" id="button-link2">Enviar Link</button>
    </div>
    <p v-if="mensagem" class="message">{{ mensagem }}</p>
  </div>
</template>

<style scoped>
body {
  margin: 0 !important;
}
.login-container {
  width: calc(100% - 60px);
  max-width: 600px;
  height: calc(100% - 282px);
  max-height: 550px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: left;
}

#title {
  font-size: 2.1em;
  margin-bottom: 1em;
  margin-top: 1.8em;
  margin-left: 0.5em;
  font-family: "crete round", serif;
}

.email-field {
  width: 100%;
  max-width: 500px;
  margin-left: 0.5em;
  font-family: "crete round", serif;
  font-size: 1rem;
}

.email-field label {
  display: block;
  margin-bottom: 0.1em;
  margin-top: 0.4em;
  margin-left: 0.5em;
  font-size: 1.1em;
}

input[type="email"] {
  width: 100%;
  padding: 1em;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 0.3em;
  margin-left: 0.5em;
}

.button-link {
  margin-top: 2.5em;
  text-align: center;
}

#button-link2 {
  width: 95%;
  padding: 0.5em;
  border: none;
  background-color: #f26530;
  color: white;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}

.message {
  color: #f26530;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>
