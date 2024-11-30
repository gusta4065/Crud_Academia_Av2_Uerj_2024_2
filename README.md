# Relatório de Experiência: Desenvolvimento de Aplicativo CRUD para Lista de Exercícios de Musculação

## 1. Introdução

O presente relatório tem como objetivo descrever o desenvolvimento de um aplicativo CRUD para gerenciamento de exercícios de musculação. O projeto foi desenvolvido como parte da disciplina de **Desenvolvimento de Sistemas** no curso de Ciência da Computação, utilizando as tecnologias React Native e AsyncStorage.

Este relatório segue as normas da ABNT, estruturando o trabalho em introdução, metodologia, resultados e conclusão.

## 2. Objetivos

### 2.1 Objetivo Geral

Desenvolver um aplicativo funcional que permita:
- Cadastrar, listar, editar e excluir exercícios de musculação.
- Gerenciar informações como número de séries, repetições e nome do exercício.

### 2.2 Objetivos Específicos

- Implementar funcionalidades de armazenamento utilizando **AsyncStorage**.
- Aplicar boas práticas de programação com **React Native**.
- Proporcionar uma interface simples e intuitiva para o usuário.

## 3. Metodologia

### 3.1 Tecnologias Utilizadas

As tecnologias e ferramentas empregadas foram:
- **Linguagem de programação**: JavaScript/TypeScript.
- **Framework**: React Native.
- **Gerenciamento de dados**: AsyncStorage.
- **Editor de código**: Visual Studio Code.

### 3.2 Estrutura do Projeto

O projeto foi estruturado em componentes para facilitar a organização e manutenção do código:
- **Componente principal**: Gerencia as rotas do aplicativo e controla a navegação.
- **Componente de lista**: Exibe a lista de exercícios.
- **Componente de formulário**: Permite o cadastro e edição dos exercícios.

### 3.3 Desenvolvimento

As etapas do desenvolvimento foram:
1. Configuração do ambiente de desenvolvimento.
2. Criação dos componentes básicos.
3. Implementação das funcionalidades de CRUD:
   - **Create**: Cadastro de novos exercícios.
   - **Read**: Listagem dos exercícios cadastrados.
   - **Update**: Edição dos exercícios existentes.
   - **Delete**: Exclusão de exercícios.
4. Testes e validação do funcionamento.

## 4. Resultados

### 4.1 Funcionalidades Implementadas

O aplicativo permite:
- Adicionar novos exercícios com os campos:
  - Nome.
  - Séries.
  - Repetições.
- Visualizar a lista de exercícios cadastrados.
- Editar as informações de exercícios existentes.
- Excluir exercícios da lista.

### 4.2 Exemplos de Uso

#### Cadastro de um Exercício
O usuário pode inserir o nome do exercício, o número de séries e repetições. Após salvar, o exercício é exibido na lista principal.

#### Edição de um Exercício
Ao selecionar um exercício, o usuário pode alterar suas informações e salvar as mudanças.

## 5. Conclusão

O desenvolvimento do aplicativo CRUD para gerenciamento de exercícios de musculação foi concluído com sucesso, alcançando os objetivos propostos. A experiência proporcionou:
- Compreensão prática do uso do **AsyncStorage** para persistência de dados.
- Aplicação de conceitos fundamentais do desenvolvimento mobile com **React Native**.
- Criação de uma interface funcional e responsiva.

O aplicativo é um ponto de partida para projetos mais complexos no futuro, podendo ser ampliado com funcionalidades como autenticação de usuários e integração com bancos de dados remotos.

---

## Referências

- ABNT. **NBR 6023: Informação e documentação - Referências - Elaboração.** Rio de Janeiro: ABNT, 2018.
- React Native. [Documentação oficial](https://reactnative.dev/).
- AsyncStorage. [Documentação oficial](https://react-native-async-storage.github.io/async-storage/).
