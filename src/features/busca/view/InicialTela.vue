<template>
    <HeaderPage />
  <div class="main-container">
    <nav class="sidebar">
      <div class="filter-section">
        <div class="filter-container">
          <h3>TIPO DE SERVIÇO</h3>
          <div>
            <label>
              <input type="checkbox" value="limpeza" v-model="selectedServices"> Limpeza
            </label>
            <label>
              <input type="checkbox" value="construcao" v-model="selectedServices"> Construção
            </label>
            <label>
              <input type="checkbox" value="manutencao" v-model="selectedServices"> Manutenção
            </label>
            <label>
              <input type="checkbox" value="eletrica" v-model="selectedServices"> Elétrica
            </label>
            <label>
              <input type="checkbox" value="hidraulica" v-model="selectedServices"> Hidráulica
            </label>
            <label>
              <input type="checkbox" value="pintura" v-model="selectedServices"> Estética
            </label>
          </div>
        </div>
        <div class="filter-container">
          <h3>DISTÂNCIA: {{ distance }} km</h3>
          <input
            type="range"
            v-model="distance"
            min="0"
            max="50"
            step="1"
            @input="updateSlider($event, 'distance')"
            :style="getSliderBackground(distance, 50)"
          />
        </div>
        <div class="filter-container">
          <h3>PREÇO: R$ {{ formatPrice(price) }}</h3>
          <input
            type="range"
            v-model="price"
            min="0"
            max="3000"
            step="50"
            @input="updateSlider($event, 'price')"
            :style="getSliderBackground(price, 3000)"
          />
        </div>
      </div>
    </nav>
    <div class="main-content">
      <section class="service-cards">
        <div v-for="service in filteredServices" :key="service['Nome do Serviço']" class="card">
          <img :src="service.Imagem" alt="Imagem do Serviço" class="service-image" />
          <div class="card-text">
            <h3>{{ service["Nome do Serviço"] }}</h3>
            <p>{{ service["Nome do Prestador"] }}</p>
            <p>
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= service['Avaliação em Estrelas'] }">★</span>
            </p>
            <div class="price-distance">
              <p>{{ service["Distância em KM"] }} km</p>
              <span class="dot">•</span>
              <p>R$ {{ service.Preço }}</p>
            </div>
            <div class="card-footer">
              <button @click="toggleSolicitado(service)" :class="{'solicitado-button': service.solicitado, 'contratar-button': !service.solicitado}">
                {{ service.solicitado ? 'Solicitado' : 'Contratar' }}
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
  data() {
    return {
      selectedServices: [],
      distance: 50,
      price: 3000,
    };
  },
  computed: {
    filteredServices() {
      console.log('Filtrando serviços:', this.services);
      return this.filterServices(this.selectedServices, this.distance, this.price);
    },
  },
  mounted() {
    console.log('Dados carregados:', this.services);
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
  height: 100vh; /* Ajuste para garantir que o contêiner ocupe a altura total da tela */
  overflow: hidden; /* Ensure the container itself does not scroll */
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* Add scroll if necessary */
  margin-bottom: 10rem; /* Aumenta a margem inferior para 10rem */
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
  height: 100vh; /* Ajuste para garantir que a sidebar ocupe a altura total da tela */
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Add scroll if necessary */
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.card {
  background-color: #ffffff;
  padding: 20px;
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
  font-size: 18px; /* Diminui o tamanho da fonte para 18px */
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

.solicitado-button:hover {
  background-color: #D9542B;
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
