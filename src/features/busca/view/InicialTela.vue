<template>
    <HeaderPage @search="updateSearchTerm" />
  <div class="main-container">
    <nav class="sidebar">
      <div class="filter-section">
        <div class="filter-container">
          <h3>CATEGORIA</h3>
          <select v-model="selectedCategory" class="service-type">
            <option value="">Todas</option>
            <!-- Loop dinâmico para criar as opções -->
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="filter-container">
          <h3>ORDENAR POR PREÇO</h3>
          <select v-model="priceOrder" class="service-type">
            <option value="desc">Maior preço</option>
            <option value="asc">Menor preço</option>
          </select>
        </div>

        <div class="filter-container">
          <h3>PREÇO MÁXIMO: R$ {{ formatPrice(price) }}</h3>
          <input
            type="range"
            v-model="price"
            min="0"
            max="2000" 
            step="10"
            @input="updateSlider($event, 'price')"
            :style="getSliderBackground(price, 2000)"
          />
        </div>
      </div>
    </nav>
    <div class="main-content">
      <div class="filter-rating">
        <button class="register-button" @click="navigateToService">Cadastrar Serviço</button>
      </div>
      <section class="service-cards">
        <!-- O v-for agora está na div do card, e o router-link foi removido daqui -->
        <div v-for="service in filteredServices" :key="service.id" class="card">
            <div class="card-text">
              <!-- O título agora é clicável -->
              <h3 @click="navigateToDetail(service.id)" class="service-title">{{ service.titulo }}</h3>
              <p>{{ service.descricao }}</p>
              <p class="price">R$ {{ formatPrice(service.valor) }}</p>
              <div class="card-footer">
                <!-- O botão agora é clicável -->
                <button @click="navigateToDetail(service.id)" class="contratar-button">
                  Contratar
                </button>
              </div>
            </div>
          </div>
      </section>
    </div>
  </div>
</template>

<script>
import InicialViewModel from '@/features/busca/viewmodel/InicialViewModel';
import InicialModel from '@/features/busca/model/InicialModel';
import HeaderPage from '@/components/header/HeaderPage.vue';

export default {
  mixins: [InicialViewModel, InicialModel],
  components: {
    HeaderPage
  },
  
  computed: {
    filteredServices() {
      let services = this.filterServices(this.price, this.searchTerm);

      if (this.selectedCategory) {
        services = services.filter(service => service.categoriaNome === this.selectedCategory);
      }

      if (this.priceOrder === 'asc') {
        services.sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor));
      } else {
        services.sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));
      }
      
      return services;
    },
  },
  mounted() {
    if (typeof this.fetchServices === 'function') {
      this.fetchServices();
    }
    if (typeof this.fetchCategories === 'function') {
      this.fetchCategories();
    }
  },
  methods: {
    updateSearchTerm(term) {
      this.searchTerm = term;
    },
    navigateToService() {
      this.$router.push('/servico/cadastrar');
    },
    // Novo método para navegar para os detalhes do serviço
    navigateToDetail(serviceId) {
      this.$router.push('/servico/' + serviceId);
    }
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  height: 7rem;
  background: linear-gradient(
    to left,
    #024A59 0%,
    #024A59 35%,
    #067057 100%,
    #068852 100%
  );
}

.main-container {
  display: flex;
  height: 100vh; 
  overflow: hidden; 
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; 
  margin-bottom: 10rem; 
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

#search {
  padding-right: 40px;
}

.search-icon {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
}

.search-input {
  margin-bottom: 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

#logo {
  margin-left: 3rem;
  width: 100px;
  height: auto;
}

svg {
  cursor: pointer;
  margin-right: 2rem;
}

#search {
  margin-top: 1.8rem;
  display: flex;
  padding: 12px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  width: 100%;
  max-width: 50rem;
}

.address-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.address-text {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
}

.arrow-icon {
  margin-left: 8px;
}

.address-edit input {
  padding: 8px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  margin-bottom: 10px;
  max-width: 400px;
}

.sidebar {
  width: 250px;
  height: 100vh; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: 'inter', sans-serif;
  font-size: 15px;
}

.filter-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: transparent;
  outline: none;
  position: relative;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  background: #ccc;
  border-radius: 5px;
  position: relative;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #024A59;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  top: -4.5px;
  z-index: 2;
}

input[type="range"]::-moz-range-track {
  height: 6px;
  background: #ccc;
  border-radius: 5px;
}

input[type="range"]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #024A59;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 6px;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

input[type="range"]::-ms-fill-lower {
  background: #024A59;
  border-radius: 5px;
}

input[type="range"]::-ms-fill-upper {
  background: #ccc;
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    #024A59 0%,
    #024A59 var(--value, 0%),
    #ccc var(--value, 0%),
    #ccc 100%
  );
}

input[type="range"]::-moz-range-track {
  background: linear-gradient(
    to right,
    #024A59 0%,
    #024A59 var(--value, 0%),
    #ccc var(--value, 0%),
    #ccc 100%
  );
}

.service-cards {
  padding: 20px;
  border-radius: 15px; 
  border: 1px solid #e0e0e0; 
  background-color: #f9f9f9; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
}

.card h3, .card p {
  margin: 5px 0;
  font-family: 'Inter';
}

.card p:nth-child(2) {
  color: #5C5B5B;
  font-family: 'Crete Round', serif;
  font-size: 18px; 
}

.service-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin-right: 20px;
}

.card-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.price-distance {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot {
  margin: 0 5px;
}

.star {
  color: #ccc;
  font-size: 1.2rem;
}

.star.filled {
  color: #FFD700;
}

.contratar-button {
  padding: 10px 20px;
  background-color: #024A59;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.contratar-button:hover {
  background-color: #067057;
}

.solicitado-button {
  padding: 10px 20px;
  background-color: #F26530;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

solicitado-button:hover {
  background-color: #D9542B;
}

.filter-rating {
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.dropdown-button {
  padding: 10px 20px;
  background: none;
  color: #024A59;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-button:hover {
  color: #067057;
}

.dropdown-button .arrow-up::after,
.dropdown-button .arrow-down::after {
  content: '';
  display: inline-block;
  margin-left: 10px;
  border: solid #024A59;
  border-width: 0 2px 2px 0;
  padding: 3px;
  align-self: center; 
}

.dropdown-button:hover .arrow-up::after,
.dropdown-button:hover .arrow-down::after {
  border-color: #067057;
}

.dropdown-button .arrow-up::after {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.dropdown-button .arrow-down::after {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0; 
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-menu button {
  padding: 10px 20px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
}

.service-type {
  display: block;
  margin-top: 0.5rem;
  padding: 0.25rem;
  height: 3.5rem;
  width: 12.5rem;
  border-radius: 10px;
  border: 0.1rem solid #C0C0C0;
  box-sizing: border-box;
  background-color: #FFF;
  font-size: 0.9em;
}

.register-button {
  padding: 10px 20px;
  background-color: #F26530;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 20px;
}

.register-button:hover {
  background-color: #D9542B;
}


.price {
  font-weight: bold;
  color: #067057;
  font-size: 1.2em;
  margin-top: 10px;
}

.card {
  align-items: center;
}

.card-text {
  justify-content: center;
}

.service-title {
  cursor: pointer;
  /* text-decoration: underline; */ /* Removido */
  color: #024A59;
}

.service-title:hover {
  color: #067057;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
  }

  .main-content {
    padding: 10px;
  }

  .service-cards {
    padding: 10px;
  }

  .card {
    flex-direction: column;
    align-items: center;
  }

  .service-image {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .card-footer {
    justify-content: center;
  }
}
</style>
