import axios from 'axios';
import CadastroModel from '../model/CadastroModel';

export default class CadastroViewModel {
    constructor() {
        this.name = '';
        this.birthdate = '';
        this.phone = '';
        this.address = '';
        this.selectedState = '';
        this.selectedCity = '';
        this.email = '';
        this.password = '';
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
        if (this.password !== this.confirmation) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const userData = new CadastroModel(
                this.name,
                this.birthdate,
                this.phone,
                this.address,
                this.selectedState,
                this.selectedCity,
                this.email,
                this.password,
                this.confirmation
            );

            console.log('dados:', userData);

            // Substitua a URL abaixo pela URL do backend
            const response = await axios.post('https://api.seusite.com/cadastrar', userData);

            if (response.status === 200) {
                alert('Cadastro realizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário.');
        }
    }
}
