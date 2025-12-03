import axios from '@/plugins/axios';

export default {
    async enviarAvaliacao(evaluationData) {
        try {
            const response = await axios.post('/prestacoes-servico', evaluationData);
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            throw error;
        }
    },

    async fetchServiceDetails(serviceId) {
        try {
            const response = await axios.get(`/servico/${serviceId}/avaliacao`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar detalhes do serviço:", error);
            throw error;
        }
    }
};
