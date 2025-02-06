export default class CadastroModel {
    constructor(name, birthdate, phone, address, selectedState, selectedCity, email, password, confirmation) {
        this.name = name;
        this.birthdate = birthdate;
        this.phone = phone;
        this.address = address;
        this.selectedState = selectedState;
        this.selectedCity = selectedCity;
        this.email = email;
        this.password = password;
        this.confirmation = confirmation;
    }
}
