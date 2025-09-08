<img src="src/assets/logo.png" alt="Logo Facilita Ai" width="200">

> Este projeto contempla o frontend do Facilita Ai, desenvolvido em Vue.js, responsável pela interface e interação do usuário com os serviços da plataforma.

## Tecnologias Utilizadas:

- [Vue.js 2.x](https://vuejs.org/)
- [Axios](https://axios-http.com/)
- [JavaScript]
- [Docker]
- [Node.js]

---

## 📦 Instalação e Execução Local

Obs.: É necessário possuir Node.js e npm instalados na máquina.

### 1. Clone o repositório
```bash
git clone https://github.com/PET-Sistemas/facilita-ai-project.git
cd facilita-ai-project/FRONT-Facilita-ai
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o acesso ao backend
O frontend está configurado para acessar o backend em `http://localhost:8080/` via Axios. Certifique-se de que o backend está rodando nesta porta.

### 4. Execute o projeto
```bash
npm run serve
```
Acesse o sistema em: [http://localhost:8081](http://localhost:8081)

---

## Executando com Docker

```bash
docker build -t facilitaai-front .
docker run -p 8081:8081 facilitaai-front
```

---

## 📄 Estrutura de Pastas

- `src/` - Código-fonte principal
  - `assets/` - Imagens e arquivos estáticos
  - `components/` - Componentes reutilizáveis
  - `features/` - Funcionalidades do sistema
  - `plugins/` - Configurações globais (ex: Axios)
  - `router/` - Rotas da aplicação

---

## 📝 Observações
- Certifique-se de que o backend está rodando e acessível para o frontend funcionar corretamente.
- Para personalizar a URL do backend, edite o arquivo `src/plugins/axios.js`.

---

## 👨‍💻 Contribuição

Sinta-se à vontade para abrir issues e pull requests!

---

## 📢 Contato

Dúvidas ou sugestões? Entre em contato com o time PET-Sistemas.