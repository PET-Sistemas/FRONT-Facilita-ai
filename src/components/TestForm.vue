<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nome completo:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <div v-if="formData">
        <h3>Dados do Formulário:</h3>
        <pre>{{ formData }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        formData: null
      };
    },
    methods: {
      submitForm() {
        this.formData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        console.log('Formulário enviado:', this.formData);
      }
    }
  };
  </script>
  