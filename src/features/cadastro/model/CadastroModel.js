export default class CadastroModel {
  constructor({
    nomeCompleto,
    dataNascimento,
    endereco,
    cidadeSelecionada,
    estadoSelecionado,
    email,
    telefone,
    senha
  }) {
    this.nomeCompleto = nomeCompleto;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.cidade = cidadeSelecionada; // Renomeado aqui se o back espera "cidade"
    this.estado = estadoSelecionado; // Renomeado aqui se o back espera "estado"
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
  }
}
