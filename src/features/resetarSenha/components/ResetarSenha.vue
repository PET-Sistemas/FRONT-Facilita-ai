<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"; // Importante!
import axios from "axios";

const route = useRoute();
const router = useRouter();

// Pega o token que veio na URL (?token=xyz...)
const token = route.query.token;

const novaSenha = ref("");
const confirmarSenha = ref("");
const API_URL = "http://localhost:8080";

const redefinir = async () => {
  if (novaSenha.value !== confirmarSenha.value) {
    alert("As senhas não conferem!");
    return;
  }

  if (this.senha.length < 8) {
    alert("Senha deve ter pelo menos 8 caracteres.");
    return;
  }

  try {
    await axios.post(`${API_URL}/auth/resetar-senha`, {
      token: token,
      novaSenha: novaSenha.value,
    });

    alert("Senha alterada com sucesso! Faça login.");
    router.push("/login");
  } catch (error) {
    alert("Erro: Link inválido ou expirado.");
  }
};
</script>

<template>
  <div class="login-container">
    <div id="title">Criar Nova Senha</div>
    <div v-if="!token" class="error-message">Erro: Token não fornecido.</div>

    <div v-else class="password-field">
      <label for="novaSenha">Nova Senha</label>
      <input type="password" v-model="novaSenha" id="novaSenha" />
      <label for="confirmSenha">Confirme a senha</label>
      <input type="password" v-model="confirmarSenha" id="confirmSenha" />
    </div>
    <div class="button-link">
      <button @click="redefinir" id="button-link2">Salvar Nova Senha</button>
    </div>
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

.password-field {
  width: 100%;
  max-width: 500px;
  margin-bottom: 1em;
  margin-left: 0.5em;
  font-family: "crete round", serif;
  font-size: 1rem;
}

.password-field label {
  display: block;
  margin-bottom: 0.1em;
  margin-top: 0.4em;
  margin-left: 0.5em;
  font-size: 1.1em;
}

input[type="password"] {
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

.error-message {
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>
