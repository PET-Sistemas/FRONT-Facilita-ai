import apiClient from '@/plugins/axios'; // Assumindo que você criou este arquivo

export default {
  data() {
    return {
      services: [], // Começa vazio, será preenchido pela API
      price: 1000, // Valor inicial do filtro de preço
      priceOrder: 'desc',
      selectedCategory: '' // <-- ADICIONADO: para o filtro de categoria
    };
  },
  methods: {
    async fetchServices() {
      console.debug('fetchServices: iniciando requisição');
      try {
        const response = await apiClient.get('/servico/todos');
        console.debug('fetchServices: resposta recebida', response);

        this.services = response.data.map(service => ({ ...service, solicitado: false }));
        console.debug('fetchServices: serviços atualizados', this.services.length);
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error);
        this.services = [];
      }
    },

    toggleSolicitado(service) {
      service.solicitado = !service.solicitado;
    },

    // Filtro simplificado para usar apenas o preço (valor)
    filterServices(price) {
      return this.services.filter(service => {
        // Converte o valor para número para garantir a comparação correta
        return parseFloat(service.valor) <= price;
      });
    }
  }
};
