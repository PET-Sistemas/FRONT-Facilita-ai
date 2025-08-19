import axios from '../../../plugins/axios';
import CadastroModel from '../model/CadastroModel';

export default class CadastroViewModel {
    constructor() {
        this.nomeCompleto = '';
        this.dataNascimento = '';
        this.telefone = '';
        this.endereco = '';
        this.cidade = '';
        this.estado = '';
        this.email = '';
        this.senha = '';
       // this.confirmacao = '';
        this.estados = [];
        this.cidades = [];
    }

    async fetchStates() {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            this.estados = response.data;
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
        }
    }

    async fetchCities() {
        try {
            if (this.estadoSelecionado) {
                const response = await axios.get(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.estadoSelecionado}/municipios`
                );
                this.cidades = response.data;
            }
        } catch (error) {
            console.error('Erro ao buscar cidades:', error);
        }
    }

    async submitForm() {
        try {
            const userData = new CadastroModel(
                this.nomeCompleto,
                this.dataNascimento,
                this.telefone,
                this.endereco,
                this.estadoSelecionado,
                this.cidadeSelecionada,
                this.email,
                this.senha,
                //this.confirmacao
            );

            // Mostra no console o que vai ser enviado
            console.log('📤 Enviando dados para o back-end:', JSON.stringify(userData, null, 2));

            // Agora use o endpoint relativo, pois o baseURL está no axios.js
            const response = await axios.post('/usuario', userData);

            // Mostra no console a resposta recebida
            console.log('📥 Resposta do back-end:', response.status, response.data);

            if (response.status === 200) {
                alert('✅ Cadastro realizado com sucesso!');
            }
        }catch (error) {
    console.error('❌ Erro ao cadastrar usuário:', error);

    const nomeErro = error.name || 'Erro';
    const mensagemErro = error.response?.data?.mensagem || error.message || 'Erro desconhecido';

    alert(`Erro (${nomeErro}): ${mensagemErro}`);
}
            alert('Ocorreu um erro ao cadastrar o usuário.');
    }
}