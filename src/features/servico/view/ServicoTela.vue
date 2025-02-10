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
              <button class="dropdown-menu">Opções</button>
              <div class="dropdown-content">
                <a value="limpeza">Limpeza</a>
                <a value="construcao">Construção</a>
                <a value="manutencao">Manutenção</a>
                <a value="eletrica">Elétrica</a>
                <a value="hidraulica">Hidráulica</a>
                <a value="pintura">Estética</a>
              </div>
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

.categorie-container:hover .dropdown-content {
  display: block;
}

.dropdown-menu {
  margin-bottom: 15px;
  padding: 10px;
  min-width: 200px;
  border: 1px solid #777;
  background-color: white;
  border-radius: 5px;
  font-family: "Crete Round", serif;
  color:#777;
  cursor: pointer;
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1;
}

.dropdown-content a {
  width: auto;
  display: block;
  padding: 10px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.dropdown-content a:last-child {
  width: auto;
  border-bottom: none;
}

.dropdown-content a:hover {
  width: auto;
  background-color: #e65500;
  color: white;
  border-radius: 5px;
}

.categorie-field {
 display: flex;
 flex-direction: column;
}
</style>