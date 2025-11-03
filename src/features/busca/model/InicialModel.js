import apiClient from '@/plugins/axios';

export default {
  data() {
    return {
      services: [],
    };
  },
  methods: {
    async fetchServices() {
      try {
        const response = await apiClient.get('/servico/todos');
        this.services = response.data.map(service => ({ ...service, solicitado: false }));
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error);
        this.services = [];
      }
    },

    toggleSolicitado(service) {
      service.solicitado = !service.solicitado;
    },

    filterServices(price) {
      return this.services.filter(service => {
        return parseFloat(service.valor) <= price;
      });
    }
  }
};
