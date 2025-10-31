# Usar a imagem do Node como base
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e instalar as dependências
# Isso aproveita o cache do Docker se as dependências não mudarem
COPY package*.json ./
RUN npm install

# Copiar o resto do código-fonte
COPY . .

# Expor a porta padrão do servidor de desenvolvimento do Vue
EXPOSE 8080

# O comando para iniciar o servidor com HMR
CMD ["npm", "run", "serve"]
