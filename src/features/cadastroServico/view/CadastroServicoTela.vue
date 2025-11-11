<template>
  <HeaderPage />
  <main>
    <div class="service-container">
      <div class="form-container">
        <h2>Cadastrar Novo Serviço</h2>
        <hr />

        <form @submit.prevent="handleFormSubmit">
          <div class="form-field">
            <label for="titulo">Título do Serviço:</label>
            <input
              id="titulo"
              type="text"
              v-model="titulo"
              placeholder="Ex: Pintura de parede"
              required
            />
          </div>

          <div class="form-field">
            <label for="description">Descrição (max 500 caracteres):</label>
            <textarea
              id="description"
              v-model="descricao"
              rows="8"
              placeholder="Descreva os detalhes do seu serviço"
              required
              maxlength="500"
            ></textarea>
          </div>

          <div class="form-field">
            <label for="category">Categoria:</label>
            <select id="category" v-model="selectedCategory" required>
              <option value="" disabled>Selecione uma categoria</option>
              <option v-for="category in categories" :key="category.id" :value="category.titulo">
                {{ category.titulo }}
              </option>
            </select>
          </div>

          <div class="form-field">
            <label for="price">Preço:</label>
            <input
              id="price"
              type="text"
              v-model.lazy="valor"
              v-money="moneyConfig"
              placeholder="R$ 0,00"
              required
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
import CadastroServicoViewModel from '../viewmodel/CadastroServicoViewModel';
import CadastroServicoModel from '../model/CadastroServicoModel';

export default {
  name: "CadastroServicoTela",
  components: {
    HeaderPage,
  },
  mixins: [CadastroServicoModel],
  data() {
    return {
      ...CadastroServicoViewModel.data(),
      moneyConfig: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    async handleFormSubmit() {

      if (!this.titulo || !this.descricao || !this.valor || !this.selectedCategory) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      
      const valorNumerico = typeof this.valor === 'string' 
        ? parseFloat(this.valor.replace('R$ ', '').replace(/\./g, '').replace(',', '.'))
        : this.valor;

      const serviceData = {
        titulo: this.titulo,
        descricao: this.descricao,
        valor: valorNumerico,
        categoriaNome: this.selectedCategory, // Corrigido de categoriaId para categoriaNome
        // TODO: Substituir o '1' pelo ID do usuário autenticado quando o login estiver implementado
        // Ex: const usuarioId = this.$store.state.user.id;
        usuarioPrestadorId: 1 
      };

      try {
        await this.submitService(serviceData);
        alert("Serviço cadastrado com sucesso!");
        this.$router.push('/'); // Redireciona para a home após o sucesso
      } catch (error) {
        alert("Falha ao cadastrar o serviço. Tente novamente.");
      }
    },
    async loadCategories() {
      this.categories = await this.fetchCategories();
    }
  },
  created() {
    this.loadCategories();
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

main {
  background: linear-gradient(
    1.87deg,
    rgba(2, 74, 89, 0.3) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  min-height: 90vh;
  padding: 2rem 0;
}

.service-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 60%;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.5);
  font-family: "Crete Round", serif;
  background-color: white;
}

h2 {
  font-size: 2em;
  margin-bottom: 0rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-size: 1.1em;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #777;
  border-radius: 5px;
  font-family: "Crete Round", serif;
  font-size: 1em;
  box-sizing: border-box;
}

.submit-btn {
  width: 50%;
  margin: 1.5em auto 0;
  padding: 0.7em;
  border: none;
  background-color: #F26530;
  color: white;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #e65500;
}

hr {
  border: 0;
  border-top: 2px solid #eee;
  margin-top: 1rem;
  margin-bottom: 1rem; /* Aumentando este valor, aumentamos o espaço */
}
</style>
