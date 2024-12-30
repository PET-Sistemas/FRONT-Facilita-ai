<template>
  <header>
    <HeaderPage />
  </header>

  <main>
    <div class="service-container">
      <div class="form-container">
        <h2>Dados</h2>
        <hr />

        <div class="service-data">
          <img
            src="https://via.placeholder.com/50"
            alt="Foto do serviço"
            class="service-picture"
          />
          <div class="service-info">
            <strong>Nome do serviço</strong>
            <p class="subtext">Prestador de Serviço</p>
          </div>
          <button @click="deleteUser" class="trash-btn">
            <img
              src="@/assets/lixeira.png"
              alt="Lixeira"
              class="trashcan"
            />
          </button>
        </div>

        <form @submit.prevent="submitForm">
          <div class="description-field">
            <label for="description">Descrição:</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="10"
              placeholder="Insira a descrição"
            ></textarea>
          </div>

          <div class="price-field">
            <label for="price">Preço</label>
            <input
              id="price"
              v-model="formData.price"
              type="number"
              step="any"
              placeholder="R$0,00"
            />
          </div>

          <button type="submit" class="submit-btn">ENVIAR EDIÇÃO</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import HeaderPage from "@/components/header/HeaderPage.vue";

export default {
  name: "ProfilePage",
  components: {
    HeaderPage,
  },
  data() {
    return {
      formData: { //Atualizar
        description: "",
        price: null,
      },
    };
  },
  methods: {
    deleteUser() {
      alert("Usuário excluído!");
      // Logica do botao de excluir
    },
    submitForm() {
      alert(
        `Descrição: ${this.formData.description}\nPreço: ${this.formData.price}`
      );
      // Lógica para enviar os dados ao servidor
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

body {
  overflow-y: scroll;
}

.service-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    1.87deg,
    rgba(2, 74, 89, 0.3) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.form-container {
  margin: 2rem;
  width: 60%;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.5);
  font-family: "Crete Round";
  background-color: white;
}

.service-data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5em;
}

.service-picture {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.service-info {
  margin-left: 10px;
  flex: 1;
  font-family: "Crete Round", serif;
}

.service-info p {
  margin-top: 5px;
  color: #777;
}

.trash-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.trashcan {
  width: 45px;
  height: 45px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
}

label {
  margin-bottom: 5px;
  font-family: "Crete Round", serif;
  font-size: 0.9em;
}

.description-field {
 display: flex;
 flex-direction: column;
}

textarea,
input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #777;
  border-radius: 5px;
  font-family: "Crete Round", serif;
}

textarea {
  height: 100px;
}

.price-field {
 display: flex;
 flex-direction: column;
 margin-right: 70%;
}


#price {
 height: auto;
 margin-bottom: 15px;
 padding: 10px auto;
 border: 1px solid #777;
 border-radius: 5px;
 font-family: 'crete round', serif;
}


.submit-btn {
  width: 50%;
  margin: 2.5em auto 0;
  padding: 0.25rem;
  background-color: #f26530;
  height: 3.2rem;
  border-radius: 7px;
  color: #fff;
  font-weight: bold;
  font-size: 1.5em;
  cursor: pointer;
  border: none;
  text-align: center;
}

.submit-btn:hover {
  background-color: #e65500;
}
</style>