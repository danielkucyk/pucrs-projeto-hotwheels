# 🚀 Iniciando o Aplicativo

Para inicializar o aplicativo do projeto, siga os passos abaixo:
## 1. Navegue até o diretório do projeto

Abra o terminal ou prompt de comando e vá até o diretório onde o repositório foi clonado. A pasta correta deve ser:

`.../pucrs-projeto-hotwheels/my-app`

## 2. Instale as dependências

No diretório do projeto (my-app), execute o seguinte comando:

``npm install``

Esse comando instalará todas as dependências listadas no arquivo package.json.
## 3. Inicialize a API

Abra um primeiro terminal, navegue até o diretório da API:

`.../pucrs-projeto-hotwheels/hotwheels-api`

E execute:

`npm start`

A API será iniciada em: http://localhost:5000
## 4. Inicialize o Aplicativo

Abra um segundo terminal, retorne ao diretório do front-end:

`.../pucrs-projeto-hotwheels/my-app`

E execute:

`npm start`

A aplicação será iniciada em: http://localhost:3000

# 🧪 Testes com Cypress

Após iniciar a API e a aplicação, é possível rodar os testes end-to-end utilizando o Cypress.
## 1. Iniciar Cypress em modo gráfico

Abra um terceiro terminal no diretório my-app e execute:

`npx cypress open`

O Cypress será iniciado em modo browser, permitindo explorar os testes visualmente.
## 2. Executar Cypress via terminal

Você também pode rodar os testes diretamente no terminal com:

`npx cypress run`

 ### ⚠️ Em algumas etapas, foram utilizados delays devido à alta frequência de requisições à API.
 

# 🧩 Componentes do Projeto

O projeto é composto por diversos componentes React, organizados para facilitar a manutenção e o reaproveitamento de código:
### App

- Componente principal da aplicação.

- Responsável por agrupar os demais componentes.

- Define funções e estados globais.

### About

- Renderiza a página "Sobre".

- Contém informações sobre o projeto/aplicativo/empresa.

### CarForm

- Formulário para inserção de novos carros.

- Utiliza quatro campos controlados (useState) para nome, marca, cor e ano.

- Valida os dados e realiza uma requisição POST à API.

- O campo de ano aceita valores entre 1886 e o próximo ano corrente.

### CarDetail

- Exibe e permite editar os dados de um carro.

- Recebe as informações via props do componente pai.

- Como a API não possui método PUT/PATCH, a atualização é feita via DELETE + POST (não ideal, mas funcional para fins de aprendizado).

- Valida os dados da mesma forma que o CarForm.

### CarsList

- Lista os carros cadastrados na aplicação.

- Utiliza o hook useEffect para buscar os dados da API com GET.

- A cada atualização, os dados são mapeados com .map() e renderizados via CarDetail.

- A exclusão é feita com DELETE, utilizando o ID único do carro.

### Home

- Renderiza a página inicial do projeto.

### Navbar

- Componente de navegação com links para cada rota.

- Utiliza a biblioteca react-router-dom e o componente Link para navegação entre páginas.

# 🎨 Personalização do Projeto

- O estilo visual da aplicação foi feito com Tailwind CSS, proporcionando customização rápida e eficiente.

- Foram utilizados ícones da biblioteca Material UI, facilitando a inclusão de elementos visuais modernos e acessíveis.

### Obrigado pela leitura!

#### Se tiver dúvidas ou sugestões, sinta-se à vontade para contribuir com o projeto. 💡
