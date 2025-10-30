export default class CadastroModel {
    constructor(email, password, role, name, birthdate, address, selectedState, selectedCity, phone, confirmation) {
        this.email = email;
        this.senha = password;
        this.role = "USER";
        this.nomeCompleto = name;
        this.dataNascimento = birthdate;
        this.endereco = address;
        this.cidade = selectedState;
        this.uf = selectedCity;
        this.telefone = phone;
        this.confirmation = confirmation;
    }
}
