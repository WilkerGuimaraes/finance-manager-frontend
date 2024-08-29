## Preview

https://github.com/user-attachments/assets/e9dcaa3d-b449-4c9c-812a-4eaa4175a0ae

# Gerenciador de finanças

## 📃 Descrição

Este é um projeto front-end onde foi desenvolvido uma aplicação de gerenciamento de finanças. Com o objetivo de cadastrar novas transações, tanto de lucro quanto de despesas, para registrar e calcular o valor total de fluxo de caixa do usuário.

## 🛠 Tecnologias

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Radix UI](https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white)

## 🧰 Recursos

- `react-hook-form`: é uma biblioteca React que utiliza React Hooks para gerenciar o estado dos campos de formulários. Neste projeto esta biblioteca esta sendo utilizada para lidar com a validação dos campos e controlar o envio do formulário.
- `zod`: é uma biblioteca de validação de esquemas em TypeScript. Nesta aplicação ela está sendo utilizada para definir o esquema de validação dos produtos do formulário.
- `react-query`: é uma biblioteca React que serve para o gerenciamento de estado assíncrono. Seu uso neste projeto é o gerenciamento de dados do json-server.
- `axios`: é uma biblioteca popular em JavaScript para fazer requisições HTTP usada para interagir com o json-server.

## ⚙ Funcionamento

- O usuário pode cadastrar uma nova trasação através de um formulário, onde ele define a descrição, o preço, categoria e qual o tipo, podendo ser de "entrada" ou "saída".
- O usuário pode buscar por transações através de uma caixa de diálogo.
- Ao cadastrar uma nova transação, o fluxo de caixa será calculado e exibido na tela.
- O usuário pode deletar uma transação cadastrada.

## 💻 Executando

1. Escolha um diretório na sua máquina, acesse-o pelo terminal e execute o seguinte comando para clonar este repositório:

```

git clone https://github.com/WilkerGuimaraes/finance-manager-frontend.git

```

2. Acesse este projeto através do seu editor de código e execute o seguinte comando para instalar todas as dependências:

```

npm install

```

3. E por fim, execute o seguinte comando para executar o front-end:

```

npm run dev

```

Assim que o projeto estiver rodando, acesse o seu `http://localhost:5173/`

## 🙋‍♂️ Colaboradores

Este projeto foi desenvolvido por mim, Wilker Guimarães, através do conteúdo do Ignite da plataforma da Rockeseat. O objetivo foi desenvolver e aplicar os meus conhecimentos front-end aplicando boas práticas com o React para construir interfaces mais funcionais, acessíveis e interativas.

Eu resolvi aprimorar mais este projeto desenvolvendo uma API backend complementar ao qual é usado para realizar operações CRUD em um banco de dados SQLite.

Para ter mais detalhes, acesse o repositório do projeto backend por este link: https://github.com/WilkerGuimaraes/finance-manager-backend
