import axios from 'axios';
import CadastroModel from '../model/CadastroModel';

export default class CadastroViewModel {
    constructor() {
        this.email = '';
        this.senha = '';
        this.role = 'USER';
        this.nomeCompleto = '';
        this.dataNascimento = '';
        this.endereco = '';
        this.selectedCity = '';
        this.selectedState = '';
        this.telefone = '';
        this.confirmation = '';
        this.states = [];
        this.cities = [];
    }

    async fetchStates() {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            this.states = response.data;
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
        }
    }

    async fetchCities() {
        try {
            if (this.selectedState) {
                const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.selectedState}/municipios`);
                this.cities = response.data;
            }
        } catch (error) {
            console.error('Erro ao buscar cidades:', error);
        }
    }

    async submitForm() {
        if (this.senha !== this.confirmation) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const userData = new CadastroModel(
                this.email,
                this.senha,
                this.role,
                this.nomeCompleto,
                this.dataNascimento,
                this.endereco,
                this.selectedCity,
                this.selectedState,
                this.telefone,
                this.confirmation
            );

            console.log('dados:', userData);

            // Substitua a URL abaixo pela URL do backend
            const response = await axios.post('http://localhost:8080/auth/register', userData);

            if (response.status === 200) {
                alert('Cadastro realizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário.');
        }
    }
}
