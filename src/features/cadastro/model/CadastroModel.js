export default class CadastroModel {
    constructor(name, birthdate, phone, selectedState, selectedCity, email, password, confirmation, sellProduct) {
        this.name = name;
        this.birthdate = birthdate;
        this.phone = phone;
        this.selectedState = selectedState;
        this.selectedCity = selectedCity;
        this.email = email;
        this.password = password;
        this.confirmation = confirmation;
        this.sellProduct = sellProduct;
    }
}
