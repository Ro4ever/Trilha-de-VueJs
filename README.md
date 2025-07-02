# Ecommerce Admin

Este projeto é uma aplicação de administração para um sistema de ecommerce. Ele contém uma parte **backend** e uma parte **frontend**, cada uma com seu próprio conjunto de dependências e configurações.

## Tecnologias Utilizadas

### Backend:
- **Node.js**: Utilizado para a construção do servidor e da API RESTful.
- **Express**: Framework para a construção de APIs.
- **Outras dependências**: Dependências específicas do projeto (verifique o `package.json`).

### Frontend:
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **ESLint & Prettier**: Ferramentas para garantir que o código esteja limpo e siga os padrões de estilo.
- **Outras dependências**: Dependências específicas do projeto (verifique o `package.json`).

## Estrutura do Projeto

O projeto está dividido nas seguintes pastas:

- `backend/`: Contém a parte do servidor, APIs e lógica de negócios.
- `frontend/`: Contém o código da interface do usuário (UI).

### Diretórios Importantes

- **backend/**
  - `.env`: Arquivo de configuração de ambiente (não enviar para o repositório).
  - `node_modules/`: Diretório de dependências do backend (não enviar para o repositório).
  - `package.json`: Arquivo de dependências do backend.
  - `src/`: Código-fonte do backend.
  
- **frontend/**
  - `.eslintrc.js`: Arquivo de configuração do ESLint para manter o código consistente.
  - `.prettierrc.js`: Arquivo de configuração do Prettier para formatar o código.
  - `node_modules/`: Diretório de dependências do frontend (não enviar para o repositório).
  - `package.json`: Arquivo de dependências do frontend.
  - `src/`: Código-fonte do frontend.

## Prints

![Captura de tela 2025-07-02 194107](https://github.com/user-attachments/assets/168d869a-792a-4c7f-ba0d-d1cdc63049f6)
![Captura de tela 2025-07-02 194200](https://github.com/user-attachments/assets/c9df7852-d327-431e-9776-a4a210df9f1d)

## Instalação

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ro4ever/ecommerce-admin.git
   cd ecommerce-admin/backend
````

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do diretório `backend/` com as variáveis de ambiente necessárias. Exemplo de conteúdo:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   SECRET_KEY=chave_secreta
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

### Frontend

1. No diretório `frontend/`, instale as dependências:

   ```bash
   cd ../frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

3. Acesse o frontend no navegador em `http://localhost:3000`.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/nova-feature`).
3. Faça alterações e commit (`git commit -am 'Adiciona nova feature'`).
4. Envie para a branch do repositório remoto (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
