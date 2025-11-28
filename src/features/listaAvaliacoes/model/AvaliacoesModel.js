import axios from '@/plugins/axios';

export default {
    methods: {
        async fetchAvaliacoes(servicoId) {
            try {
                const response = await axios.get(`/prestacoes-servico/servico/${servicoId}/avaliacoes`);
                return response.data;
            } catch (error) {
                console.error('Erro ao buscar avaliações:', error);
                throw error;
            }
        },
    },
};
