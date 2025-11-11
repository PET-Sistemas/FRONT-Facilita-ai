import apiClient from '@/plugins/axios';

export default {
    methods: {
        async fetchCategories() {
            try {
                const response = await apiClient.get('/categoria/todas');
                return response.data;
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
                return [];
            }
        },
        async submitService(serviceData) {
            try {
                const response = await apiClient.post('/servico', serviceData);
                return response;
            } catch (error) {
                console.error("Erro ao cadastrar o serviço:", error);
                throw error;
            }
        }
    }
};
