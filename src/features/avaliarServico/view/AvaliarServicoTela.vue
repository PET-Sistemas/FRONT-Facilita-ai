<template>
  <HeaderPage />
  <main>
    <div class="evaluation-container">
      <div class="evaluation-card">
        <router-link to="/" class="back-link">&lt; Voltar</router-link>
        <h1>Avaliar Serviço</h1>

        <div class="service-info" v-if="servico">
          <img
            :src="servico.prestador.foto || require('@/assets/placeholder.png')"
            alt="Foto do Prestador"
            class="provider-photo"
          />
          <div class="service-text">
            <span class="service-name">{{ servico.titulo }}</span>
            <span class="provider-name">{{ servico.prestador.nome }}</span>
          </div>
        </div>

        <div class="rating-section">
          <h2>Qualidade do Serviço</h2>
          <div class="stars" @mouseleave="resetHoverRating">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: star <= (hoverRating || rating) }"
              @mouseover="hoverRating = star"
              @click="setRating(star)"
              >★</span
            >
          </div>
        </div>

        <div class="description-section">
          <h2>Avaliação</h2>
          <textarea
            v-model="avaliacaoDesc"
            placeholder="Escreva sua avaliação sobre o serviço..."
          ></textarea>
        </div>

        <button
          @click="submitEvaluation"
          class="submit-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Enviando..." : "Enviar Avaliação" }}
        </button>
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import HeaderPage from "@/components/header/HeaderPage.vue";
import AvaliarServicoViewModel from "../viewmodel/AvaliarServicoViewModel";

export default {
  name: "AvaliarServicoTela",
  components: { HeaderPage },
  mixins: [AvaliarServicoViewModel],
};
</script>

<style scoped>
main {
  background: #e0e0e0;
  min-height: 90vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: "Inter", sans-serif;
}

.evaluation-container {
  width: 100%;
  max-width: 700px;
}

.evaluation-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 18px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  border: 1px solid #e9ecef;
}

.back-link {
  color: #f26530;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: inline-block;
}

h1 {
  font-size: 2em;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: left;
  color: black;
}

.service-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.provider-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.service-text {
  display: flex;
  flex-direction: column;
}

.service-name {
  font-weight: 600;
  font-size: 1.2em;
  color: #343a40;
}

.provider-name {
  color: #6c757d;
}

.rating-section,
.description-section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #343a40;
}

.stars {
  display: flex;
  gap: 0.5rem;
  font-size: 2.5em;
  color: #ccc;
  cursor: pointer;
}

.star.filled {
  color: #f26530;
}

textarea {
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-family: "Inter", sans-serif;
  font-size: 1em;
  resize: vertical;
}

.submit-btn {
  background-color: #f26530;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #d9531e;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message,
.error-message {
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}
</style>
