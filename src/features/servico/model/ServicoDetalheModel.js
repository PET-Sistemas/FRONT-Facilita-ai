import axios from '@/plugins/axios';

const ServicoDetalheModel = {
    methods: {
        async fetchServiceDetails(id) {
            try {
                const response = await axios.get(`/servico/${id}`);
                return response.data;
            } catch (error) {
                console.error("Erro ao buscar detalhes do serviço:", error);
                throw error;
            }
        }
    }
};

export default ServicoDetalheModel;
