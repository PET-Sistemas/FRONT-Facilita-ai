import apiClient from '@/plugins/axios';

export default {
  data() {
    return {
      services: [],
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await apiClient.get('/categoria/todas');
        this.categories = response.data.map(cat => cat.titulo);
      } catch (error) {
        console.error("Erro ao buscar as categorias:", error);
        this.categories = [];
      }
    },

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

    filterServices(price, searchTerm) {
      let filtered = this.services.filter(service => {
        return parseFloat(service.valor) <= price;
      });

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(service =>
          service.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
          service.descricao.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      return filtered;
    }
  }
};
