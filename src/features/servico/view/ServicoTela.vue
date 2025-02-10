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
          </div>
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

          <div class="categorie-field">
            <label for="categorie">Categorias:</label>
            <div class="categorie-container">
            <label class="label-categorie">
              <input type="checkbox" value="limpeza" v-model="selectedServices"> Limpeza
            </label>
            <label class="label-categorie">
              <input type="checkbox" value="construcao" v-model="selectedServices"> Construção
            </label>
            <label class="label-categorie">
              <input type="checkbox" value="manutencao" v-model="selectedServices"> Manutenção
            </label>
            <label class="label-categorie">
              <input type="checkbox" value="eletrica" v-model="selectedServices"> Elétrica
            </label>
            <label class="label-categorie">
              <input type="checkbox" value="hidraulica" v-model="selectedServices"> Hidráulica
            </label>
            <label class="label-categorie">
              <input type="checkbox" value="pintura" v-model="selectedServices"> Estética
            </label>
          </div>
          </div>

          <div class="price-field">
            <label for="price">Preço:</label>
            <input
              id="price"
              placeholder="R$0,00"
            />
          </div>

          <button type="submit" class="submit-btn">CADASTRAR SERVIÇO</button>
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
      showParagraph: true,
      formData: { //Atualizar
        description: "",
        price: null,
      },
    };
  },
  methods: {
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
  margin: 0px;
}

body {
  overflow-y: scroll;
}

::-webkit-scrollbar {
    width: 0px;  /* Para barra de rolagem vertical */
    height: 0px; /* Para barra de rolagem horizontal */
  }

.service-container {
  min-height: 90vh;
  max-height: 100%;
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
  padding: 0.5em;
  border: none;
  background-color: #F26530;
  color: white;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #e65500;
}

.categorie-container {
  display: flex;
  flex-direction: column; /* Mantém os checkboxes em coluna */
  align-items: flex-start; /* Alinha os checkboxes à esquerda */
}

.label-categorie {
  display: flex;
  gap: 8px; /* Espaço entre checkbox e texto */
  cursor: pointer;
}

.categorie-field {
 display: flex;
 flex-direction: column;
 margin-right: 70%;
}
</style>