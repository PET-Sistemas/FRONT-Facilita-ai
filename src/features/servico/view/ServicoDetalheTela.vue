<template>
  <HeaderPage />
  <main>
    <div v-if="isLoading" class="loading">Carregando...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="servico" class="service-detail-container">
      <div class="service-card">
        <router-link to="/inicial_tela" class="back-link">&lt; Voltar</router-link>
        <h1>{{ servico.titulo }}</h1>
        <p class="prestador-nome">{{ servico.prestador.nome }}</p>
        
        <div class="rating-container">
          <div class="rating-display">
            <span class="stars">{{ getStarRating(servico.prestador.mediaAvaliacoes) }}</span>
            <span class="rating-feedback">({{ servico.prestador.totalAvaliacoes }} avaliações)</span>
          </div>
          <div class="button-group">
            <button class="avaliacoes-btn" @click="navigateToAvaliacoes">Ver Avaliações</button>
            <button class="avaliar-btn" @click="navigateToAvaliar">Avaliar Serviço</button>
          </div>
        </div>

        <p class="preco">Serviço a partir de: <strong>R$ {{ servico.valor.toFixed(2) }}</strong></p>

        <div class="section">
          <h3>Sobre o serviço:</h3>
          <p>{{ servico.descricao }}</p>
        </div>

        <div class="section">
          <h3>Dados e telefone para contato:</h3>
          <p class="dados-contato"><i class="icon-pin"></i>{{ servico.prestador.enderecoCompleto }}</p>
          <p class="dados-contato"><i class="icon-phone"></i>{{ servico.prestador.telefoneWhatsapp }}</p>
        </div>

        <button @click="contactViaWhatsapp" class="whatsapp-btn">
          <img src="@/assets/whatsapp_icon.png" alt="WhatsApp" />
          Contratar via Whatsapp
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import HeaderPage from '@/components/header/HeaderPage.vue';
import ServicoDetalheViewModel from '../viewmodel/ServicoDetalheViewModel';
import ServicoDetalheModel from '../model/ServicoDetalheModel';

export default {
  name: 'ServicoDetalheTela',
  components: { HeaderPage },
  mixins: [ServicoDetalheModel],
  data() {
    return {
      ...ServicoDetalheViewModel.data()
    };
  },
  methods: {
    navigateToAvaliacoes() {
      this.$router.push({ name: 'avaliacoesServico', params: { id: this.servico.id } });
    },
    navigateToAvaliar() {
      this.$router.push({ name: 'avaliarServico', params: { id: this.servico.id } });
    },
    async loadServiceDetails() {
      this.isLoading = true;
      try {
        const serviceId = this.$route.params.id;
        this.servico = await this.fetchServiceDetails(serviceId);
      } catch (err) {
        this.error = 'Não foi possível carregar os detalhes do serviço.';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    contactViaWhatsapp() {
      if (this.servico && this.servico.prestador.telefoneWhatsapp) {
        const message = `Olá, ${this.servico.prestador.nome}. Vi seu serviço "${this.servico.titulo}" no Facilita Aí e gostaria de mais informações.`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${this.servico.prestador.telefoneWhatsapp.replace(/\D/g, '')}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    getStarRating(media) {
      const totalStars = 5;
      const fullStars = Math.floor(media);
      const halfStar = media % 1 >= 0.5 ? 1 : 0;
      const emptyStars = totalStars - fullStars - halfStar;
      return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }
  },
  created() {
    this.loadServiceDetails();
  }
};
</script>

<style scoped>
/* Estilos Gerais */
main {
  background: #e0e0e0;
  min-height: 90vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Inter', sans-serif; /* Fonte mais moderna */
}

.service-detail-container {
  width: 100%;
  max-width: 800px;
}

.service-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 18px; /* Bordas mais suaves */
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12); /* Sombra mais visível */
  border: 1px solid #e9ecef;
}

/* Cabeçalho do Card */
.back-link {
  color: #F26530;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: inline-block;
  transition: color 0.3s;
}
.back-link:hover {
  color: #d9531e;
}

h1 {
  font-size: 2.2em;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.2rem;
  color: black;
}

.prestador-nome {
  font-size: 1.1em;
  color: black;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Seção de Avaliação */
.rating-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; /* Reduzido de 1.5rem */
  padding-bottom: 1rem; /* Reduzido de 1.5rem */
  border-bottom: 1px solid #e9ecef;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stars {
  color: #F26530; /* Laranja para estrelas */
  font-size: 1.8em;
  letter-spacing: 2px;
}

.rating-feedback {
  color: #6c757d;
  font-weight: 500;
}

.avaliacoes-btn {
  background-color: transparent;
  color: #F26530;
  border: 1px solid #F26530;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.avaliacoes-btn:hover {
  background-color: #F26530;
  color: white;
}

/* Novo estilo para o botão de avaliar serviço */
.avaliar-btn {
  background-color: #F26530;
  color: white;
  border: 1px solid #F26530;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.avaliar-btn:hover {
  background-color: #d9531e;
  border-color: #d9531e;
}

/* Preço */
.preco {
  font-size: 1.1em;
  color: #495057;
  margin-top: 1rem; /* Adicionado para criar espaço acima */
  margin-bottom: 2rem;
}
.preco strong {
  font-size: 1.4em;
  color: #212529;
  font-weight: 700;
}

/* Seções de Conteúdo */
.section {
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #343a40;
}

.section p {
  color: #5C5B5B;
  line-height: 1.6;
}

.dados-contato p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
  font-size: 1.1em;
  color: #5C5B5B;
}

/* Ícones (requer uma biblioteca de ícones ou SVGs) */
.icon-pin, .icon-phone {
  font-style: normal; /* Apenas para exemplo */
}

/* Botão Whatsapp */
.whatsapp-btn {
  background-color: #067057;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin: 2rem auto 0;
  transition: background-color 0.3s;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}
.whatsapp-btn:hover {
  background-color: #1ebe57;
}

.whatsapp-btn img {
  width: 24px;
  height: 24px;
}

/* Loading e Erro */
.loading, .error {
  text-align: center;
  font-size: 1.5em;
  padding: 2rem;
  color: #6c757d;
}

/* Novo estilo para o grupo de botões */
.button-group {
  display: flex;
  gap: 1rem;
}
</style>
