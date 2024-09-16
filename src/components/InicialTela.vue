<template>
    <header>
    <img src="./icons/logo.png" alt="Logo Facilita aí" id="logo">
    <div class="main-content">
      <div class="search-input">
        <input type="text" id="search" placeholder="Descreva o que precisa...">
      </div>
      <div class="address-section">
        <div class="address-text" @click="toggleEdit">
          <span>{{ address }}</span>
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
            <path d="M12 15.41L16.59 10.83 18 12.24 12 18.24 6 12.24 7.41 10.83 12 15.41z"/>
          </svg>
        </div>
        <div v-if="isEditing" class="address-edit">
          <input 
            v-model="newAddress" 
            type="text" 
            placeholder="Digite o novo endereço..."
            @keyup.enter="saveAddress"
            ref="addressInput"
          >
        </div>
      </div>
    </div>
    <div class="header-right">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#ffffff">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z"/>
      </svg>
    </div>
  </header>
  <nav class="sidebar">
    <div class="filter-section">
      <div class="filter-container">
        <h3>Tipo de Serviço</h3>
        <select v-model="serviceType">
          <option value="">Todos</option>
          <option value="beleza">Beleza</option>
        </select>
      </div>
      
      <div class="filter-container">
        <h3>Distância {{ distance }} km</h3>
        <input
        type="range"
        v-model="distance"
        min="0"
        max="50"
        step="1"
        />
    </div>

    <div class="filter-container">
      <h3>Preço R$ {{ price }}</h3>
      <input
        type="range"
        v-model="price"
        min="0"
        max="3000"
        step="50"
      >
    </div>
    </div>
  </nav>
  </template>
  
  <script>
export default {
  data() {
    return {
      address: 'Endereço Atual', 
      newAddress: '', 
      isEditing: false,
      serviceType: '',
      distance: 25,
      price: 500
    };
  },
  watch: {
    serviceType(){
      this.filterResults();
    },
    distance(){
      this.filterResults();
    },
    price(){
      this.filterResults();
    }
  },
  methods: {
    filterResults(){
      console.log('Filtrando por:', this.serviceType, this.distance, this.price);
    },
    formatPrice(price){
      return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.$nextTick(() => {
          this.$refs.addressInput.focus(); 
        });
      }
    },
    saveAddress() {
      if (this.newAddress.trim()) {
        this.address = this.newAddress;
        this.newAddress = '';
        this.isEditing = false;
      }
    }
  }
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
            #024A59 0%,
            #024A59 0%,
            #024A59 0%,
            #024A59 0%,
            #024A59 35%,
            #024A59 49%,
            #024A59 42%,
            #067057 100%,
            #068852 100%

    
    );
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  margin-bottom: 20px; /* Espaço entre o campo de busca e o campo de endereço */
}

.header-right{
    display: flex;
    align-items: center;
}

  #logo {
    margin-left: 3rem;
    width: 100px;
    height: auto;
    
  }
  
  #button-login {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  #button-login:hover {
    background-color: #0056b3;
  }
  
  svg {
    cursor: pointer;
    margin-right: 2rem;

  }

  #search {
    margin-top: 1.8rem;
    display: flex;
    padding: 12px;
    align-items: center;  
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

.address-edit {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative
}

.address-edit input {
  padding: 8px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  margin-bottom: 10px;
  max-width: 400px;
  position: absolute;
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
  gap: 20px; /* Espaço entre os filtros */
}

.filter-container {
  background-color: #ffffff; /* Fundo branco para cada container */
  padding: 15px; /* Espaçamento interno do container */
  border-radius: 8px; /* Cantos arredondados */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-container h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.filter-container select,
.filter-container input[type="range"] {
  width: 100%;
}

input[type="range"] {
  -webkit-appearance: none; /* Remove a aparência padrão no Chrome e Safari */
  width: 100%;
  height: 5px;
  background: #ccc;
  outline: none;
  border-radius: 5px;
  transition: background 0.3s ease;
  
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Remove o estilo padrão */
  appearance: none;
  width: 15px;
  height: 15px;
  background: #024A59;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #024A59;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb:hover,
input[type="range"]::-moz-range-thumb:hover {
  background: #024A59; /* Muda a cor ao passar o mouse */
}

input[type="range"]::-webkit-slider-runnable-track {
  background: #ccc;
  
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #b3b3b3;
}

  </style>
  