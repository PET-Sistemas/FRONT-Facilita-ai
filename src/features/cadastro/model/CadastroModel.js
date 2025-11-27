export default class CadastroModel {
  constructor(
    email,
    password,
    role,
    name,
    birthdate,
    address,
    selectedCity,
    selectedState,
    phone,
    confirmation,
    fotoPerfil
  ) {
    this.email = email;
    this.senha = password;
    this.role = "USER";
    this.nomeCompleto = name;
    this.dataNascimento = birthdate;
    this.endereco = address;
    this.uf = selectedState;
    this.cidade = selectedCity;
    this.telefone = phone;
    this.confirmation = confirmation;
    this.fotoPerfil = fotoPerfil;
  }
}
