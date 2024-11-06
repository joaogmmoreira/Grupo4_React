# Computer Store - GP4

**Computer Store** é uma aplicação de e-commerce desenvolvida para a compra de eletrônicos. A plataforma permite que os usuários naveguem por uma lista de produtos, adicionem itens ao carrinho, ajustem quantidades e realizem a compra de forma intuitiva e segura. Toda a interface é construída em React com integração a uma API REST para gerenciar produtos, usuários, pedidos e históricos de compra.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Ferramentas Utilizadas](#ferramentas-utilizadas)
- [Configuração do Projeto](#configuração-do-projeto)
- [Como Executar](#como-executar)
- [Endpoints da API](#endpoints-da-api)
- [Colaboradores](#colaboradores)

---

## Funcionalidades

### Cadastro de Usuário

- Registro com nome, e-mail e senha.

### Login de Usuário

- Autenticação com e-mail e senha, garantindo o acesso seguro aos dados do usuário.

### Listagem de Produtos

- Exibe todos os produtos eletrônicos disponíveis.
- Permite filtragem por nome e categorias.
- Exibe apenas produtos com estoque disponível.

### Detalhes do Produto

- Página de descrição completa de um produto específico.
- Opção para avaliação do produto por parte dos usuários.

### Carrinho de Compras

- Visualização dos produtos adicionados ao carrinho.
- Opções para adicionar e remover produtos, ajustar quantidades e esvaziar o carrinho.
- Acessível de qualquer página no site, exceto nas telas de Login e Cadastro.

### Finalização de Compra

- Reduz a quantidade de produtos no estoque após a compra.
- Registra o pedido no histórico de compras do usuário.

### Histórico de Pedidos

- Exibe todos os pedidos realizados pelo usuário, com detalhes dos itens e valor total.

---

## Ferramentas Utilizadas

### Principais Ferramentas e Bibliotecas

- **React**: Biblioteca JavaScript para construção de interfaces.
- **Vite**: Ferramenta para um desenvolvimento ágil e leve.
- **React Router DOM**: Para gerenciamento e navegação entre rotas.
- **Axios**: Cliente HTTP para comunicação com a API REST.
- **Context API**: Gerenciamento de estado global.

### Ferramentas de Desenvolvimento

- **Visual Studio Code (VS Code)**: Editor de código.
- **Postman**: Teste e verificação de endpoints da API REST.

---

## Configuração do Projeto

### Pré-requisitos

- **Node.js** e **npm** instalados.
- **Git** para clonar o repositório.

### Clonar o Repositório

Para clonar o projeto, execute o seguinte comando:

```bash
git clone https://github.com/joaogmmoreira/Grupo4_React.git
```

## Como Executar

1. **Acessar o diretório do projeto:**

    ```bash
    cd Grupo4_React
    ```

2. **Instalar as dependências:**

    ```bash
    npm install
    ```

3. **Iniciar o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4. **Acessar a aplicação no navegador:**

    A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Endpoints da API

- **Cadastro de Usuário**: `POST /api/users`
- **Login de Usuário**: `POST /api/auth/login`
- **Listagem de Produtos**: `GET /api/products`
- **Detalhes do Produto**: `GET /api/products/:id`
- **Adicionar ao Carrinho**: `POST /api/cart`
- **Remover do Carrinho**: `DELETE /api/cart/:productId`
- **Finalizar Compra**: `POST /api/checkout`
- **Histórico de Pedidos**: `GET /api/orders`

## Colaboradores

- [João Moreira](https://github.com/joaogmmoreira)
- [Vinicius Cassiano](https://github.com/ViniciusCassiano2105)
- [Eber Cintra](https://github.com/cintra444)
- [Weliton Schitini](https://github.com/weliton-schitini)
- [Geovane Rosa](https://github.com/geovanerosa)


