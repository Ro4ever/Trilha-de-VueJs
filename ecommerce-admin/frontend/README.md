# Painel Administrativo de E-commerce

Este é um projeto completo de um painel administrativo para e-commerce, desenvolvido com **Vue.js (Frontend)** e **Node.js/Express (Backend)**, utilizando autenticação JWT, gerenciamento de produtos (CRUD), consumo de API pública e layouts responsivos com Vuetify.

---

## Estrutura do Projeto

ecommerce-admin/
├── backend/                  # Backend Node.js
│   ├── src/
│   │   ├── config/           # Configurações de banco de dados
│   │   ├── controllers/      # Lógica de negócio das rotas
│   │   ├── middlewares/      # Middlewares (ex: autenticação JWT)
│   │   ├── models/           # Modelos do Sequelize (User, Product)
│   │   ├── routes/           # Definição das rotas da API
│   │   └── app.js            # Ponto de entrada do servidor Express
│   ├── .env                  # Variáveis de ambiente
│   ├── package.json
│   └── README.md             # README específico do backend (opcional)
└── frontend/                 # Frontend Vue.js
├── src/
│   ├── assets/           # Imagens, ícones
│   ├── components/       # Componentes Vue reutilizáveis
│   ├── layouts/          # Layouts de página (ex: AdminLayout)
│   ├── plugins/          # Configurações de plugins (Vuetify, Axios)
│   ├── router/           # Configuração do Vue Router
│   ├── store/            # Módulos Vuex (auth, products)
│   │   └── modules/
│   ├── views/            # Páginas principais (Login, Dashboard, Products)
│   ├── App.vue
│   ├── main.js           # Ponto de entrada do Vue
│   └── styles/           # Estilos globais (opcional)
├── .eslintrc.js          # Configuração ESLint
├── .prettierrc.js        # Configuração Prettier
├── package.json
└── README.md             # README específico do frontend (opcional)

---

## Requisitos Prévios

Antes de começar, certifique-se de ter instalado:

* **Node.js** (versão 14 ou superior recomendada)
* **npm** (gerenciador de pacotes do Node.js, vem com o Node.js)
* **MySQL Server** (ou outro SGBD compatível, mas o código atual é para MySQL)
* **Vue CLI** (para facilitar a configuração do projeto Vue)
    ```bash
    npm install -g @vue/cli
    ```

---

## Como Rodar a Aplicação

Siga estes passos cuidadosamente:

### **Passo 1: Configurar o Banco de Dados MySQL**

1.  Acesse seu servidor MySQL (via MySQL Workbench, terminal, ou phpMyAdmin).
2.  **Crie um novo banco de dados** chamado `ecommerce_db`:
    ```sql
    CREATE DATABASE ecommerce_db;
    ```
    *(Você pode alterar o nome do banco de dados no arquivo `.env` do backend, se desejar, mas lembre-se de atualizar lá.)*

### **Passo 2: Configurar e Iniciar o Backend**

1.  Navegue até a pasta `backend`:
    ```bash
    cd ecommerce-admin/backend
    ```
2.  **Crie o arquivo `.env`** na raiz da pasta `backend` e preencha com suas configurações:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha_mysql # <--- SUBSTITUA PELA SUA SENHA DO MYSQL
    DB_NAME=ecommerce_db
    JWT_SECRET=sua_chave_secreta_jwt_bem_longa_e_complexa # <--- SUBSTITUA POR UMA CHAVE SECRETA FORTE E ÚNICA
    ```
3.  Instale as dependências do backend:
    ```bash
    npm install
    ```
4.  Inicie o servidor backend:
    ```bash
    npm run dev
    ```
    Você deverá ver a mensagem: `Server running on port 3000` e `Database & tables created/synced!`. O Sequelize criará automaticamente as tabelas `Users` e `Products` no seu banco de dados.

### **Passo 3: Configurar e Iniciar o Frontend**

1.  Navegue até a pasta `frontend`:
    ```bash
    cd ../frontend # Se você estiver na pasta backend, use isso. Senão, navegue diretamente.
    ```
2.  **Obtenha uma Chave de API do OpenWeatherMap:**
    * Vá para [https://openweathermap.org/api](https://openweathermap.org/api).
    * Registre-se (se ainda não tiver uma conta) e gere sua chave API.
    * **Abra o arquivo `src/views/Dashboard.vue`** e **SUBSTITUA** `'SUA_API_KEY_OPENWEATHERMAP'` com a chave que você obteve:
        ```javascript
        openWeatherMapApiKey: 'SUA_CHAVE_AQUI',
        ```
3.  Instale as dependências do frontend:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run serve
    ```
    Você deverá ver a mensagem: `App running at:` com um endereço como `http://localhost:8080/`.

---

## Demonstração Funcional

1.  Abra seu navegador e acesse `http://localhost:8080/`.
2.  Você será redirecionado para a tela de **Login**.
3.  **Primeiro, clique em "Não tem conta? Cadastre-se"** para criar um novo usuário.
    * Preencha Nome de Usuário, E-mail e Senha.
    * Clique em "Registrar". Você deverá ver um feedback via snackbar e ser redirecionado para o Dashboard.
4.  **Após o registro (ou login):**
    * **Dashboard (`/dashboard`):** Exibe uma mensagem de boas-vindas, a previsão do tempo (se a API Key do OpenWeatherMap estiver configurada corretamente) e um card com o total de produtos.
    * **Gerenciar Produtos (`/products`):**
        * Você pode adicionar novos produtos clicando em "Adicionar Novo Produto".
        * A tabela lista os produtos existentes.
        * Use os ícones de lápis para editar e a lixeira para excluir produtos.
        * A tabela possui busca, paginação e sort.
5.  **Logout:** Clique no ícone de "logout" na barra superior para encerrar a sessão e ser redirecionado para a tela de login.

---

## Boas Práticas e Diretrizes

* **Clean Code:** O código foi estruturado para ser legível e modular.
* **ESLint e Prettier:** Configurados para garantir consistência na formatação do código.
* **Tratamento de Erros:** Mensagens amigáveis são exibidas ao usuário via Snackbar em caso de falhas nas operações.
* **Responsividade:** O layout utiliza componentes do Vuetify e o sistema de grid para se adaptar a diferentes tamanhos de tela.
* **Vuex:** Utilizado para gerenciamento de estado global (autenticação, produtos, snackbar).
* **Axios:** Usado para todas as chamadas HTTP para o backend e APIs externas.

---

## Considerações Finais

Este projeto fornece uma base robusta para um painel administrativo. Para um ambiente de produção, considere:

* **Validação de Entrada:** Implementar validações de formulário mais complexas no backend.
* **Upload de Imagens:** Para gerenciar imagens de produtos, seria necessário um serviço de armazenamento de arquivos (ex: AWS S3, Cloudinary) e um endpoint de upload no backend.
* **Segurança:** Reforçar a segurança (ex: validação de token em cada requisição de dados do usuário, limite de tentativas de login, HTTPS).
* **Paginação e Filtro no Backend:** Para grandes volumes de dados, a paginação e os filtros na API de produtos devem ser implementados no backend para otimização.

Qualquer dúvida durante a configuração ou execução, me diga!