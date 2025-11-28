<template>
  <HeaderPage />
  <div class="main-container">
    <div class="main-content">
      <div class="header-controls">
        <router-link :to="'/servico/' + $route.params.id" class="back-link">&lt; Voltar</router-link>
        <div class="filter-container">
          <h3>ORDENAR POR AVALIAÇÃO</h3>
          <select v-model="sortOrder" class="sort-select">
            <option value="desc">Maior nota</option>
            <option value="asc">Menor nota</option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="loading">Carregando avaliações...</div>
      <div v-if="error" class="error">{{ error }}</div>
      
      <section v-if="!isLoading && sortedAvaliacoes.length > 0" class="service-cards">
        <div v-for="avaliacao in sortedAvaliacoes" :key="avaliacao.nomeUsuario + avaliacao.data" class="card">
          <div class="card-text">
            <div class="card-header">
              <h3>{{ avaliacao.nomeUsuario }}</h3>
              <span class="rating-stars">{{ getStarRating(avaliacao.numeroEstrelas) }}</span>
            </div>
            <p class="review-date">{{ formatDate(avaliacao.data) }}</p>
            <p class="review-description">{{ avaliacao.descricao }}</p>
          </div>
        </div>
      </section>
      <div v-if="!isLoading && sortedAvaliacoes.length === 0 && !error" class="no-reviews">
        <p>Este serviço ainda não possui avaliações.</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from '@/components/header/HeaderPage.vue';
import AvaliacoesViewModel from '../viewmodel/AvaliacoesViewModel';

export default {
  name: 'AvaliacoesTela',
  components: { HeaderPage },
  mixins: [AvaliacoesViewModel],
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 20px;
}

.main-content {
  flex: 1;
  max-width: 900px;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.back-link {
  color: #F26530;
  text-decoration: none;
  font-weight: 600;
  font-size: 1em;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-container h3 {
  margin: 0;
  font-size: 0.9em;
  color: #333;
  font-weight: 600;
}

.sort-select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.9em;
}

.loading, .error, .no-reviews {
  text-align: center;
  font-size: 1.2em;
  padding: 40px;
  color: #6c757d;
}

.service-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  box-sizing: border-box;
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 1.2em;
  font-weight: 600;
}

.rating-stars {
  color: #F26530;
  font-size: 1.3em;
}

.review-date {
  font-size: 0.9em;
  color: #6c757d;
  margin: 0;
}

.review-description {
  margin: 5px 0 0 0;
  font-family: 'Crete Round', serif;
  font-size: 1em;
  line-height: 1.5;
  color: #333;
}
</style>
