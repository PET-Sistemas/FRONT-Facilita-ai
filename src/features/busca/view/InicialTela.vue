<template>
   <header>
    <HeaderPage />
  </header>
  <nav class="sidebar">
    <div class="filter-section">
      <!-- Filtro por Tipo de Serviço -->
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

      <!-- Filtro por Distância -->
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

      <!-- Filtro por Preço -->
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
  
</template>


  
<script>
import InicialViewModel from '@/features/busca/viewmodel/InicialViewModel';
import HeaderPage from '@/components/header/HeaderPage.vue';

export default {
  mixins: [InicialViewModel],
  components: {
      HeaderPage // Register HeaderPage
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

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

#search {
  padding-right: 40px; /* Espaço para o ícone */
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
  width: 50rem;
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
  background: transparent; /* Fundo transparente */
  outline: none;
  position: relative; /* Necessário para o alinhamento */
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  background: #ccc; /* Cor da linha */
  border-radius: 5px;
  position: relative; /* Necessário para o alinhamento */
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
  top: -4.5px; /* Ajuste para centralizar o thumb */
  z-index: 2; /* Garante que o thumb fique sobre o track */
}

input[type="range"]::-moz-range-track {
  height: 6px;
  background: #ccc; /* Cor da linha */
  border-radius: 5px;
}

input[type="range"]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #024A59;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 2; /* Garante que o thumb fique sobre o track */
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 6px;
  background: transparent; /* Necessário para o track no IE */
  border-color: transparent;
  color: transparent;
}

input[type="range"]::-ms-fill-lower {
  background: #024A59; /* Cor preenchida */
  border-radius: 5px;
}

input[type="range"]::-ms-fill-upper {
  background: #ccc; /* Cor além do valor do slider */
  border-radius: 5px;
}

/* Adiciona gradiente ao fundo da linha com base no valor do slider */
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

</style>
