describe('template spec', () => {
  before(() => {
    cy.visit('/')
  })
 

  it('carregou a pagina home', () => {
    cy.get('[data-cy="page-title"]')
      .should('contain.text', 'Bem-vindo ao CRUD de HotWheels!')
  })

  it('carregou a pagina sobre', () => {
    cy.visit('/about')
    cy.get('[data-cy="text-about"]')
      .should('contain.text', 'Esta é uma aplicação para um CRUD de carros HotWheels!')
  })

  it('carregou a pagina carros', () => {
    cy.visit('/carsList')
    cy.get('[data-cy="list-title"]')
      .should('contain.text', 'Lista de Carros')
  })

  it('deve mostrar a lista de carros', () => {
    cy.intercept("GET", 'http://localhost:5000/cars').as('getList')
    cy.visit('/carsList')
    cy.wait('@getList').then((xhr)=>{
      expect(xhr.response.statusCode).to.be.oneOf([200,304])
    })
  })

  it('deve mostrar os detalhes do carro', () => {
    cy.visit('/carsList')
    cy.get('[data-cy="car-item"]').first().click()
    cy.get('[data-cy="carro-detalhes"]').should('contain.text', "Detalhes Carro")
  })

  it('deve mostrar a pagina adicionar carros pelo botao na lista de carros', () => {
    cy.visit('/carsList')
    cy.get('[data-cy="list-addCarro"]').click()
    cy.get('h1').should('contain.text', "Adicionar Carro")
  })

  it('deve mostrar a pagina adicionar carros pela navegacao', () => {
    cy.visit('/carForm')
    cy.get('h1').should('contain.text', "Adicionar Carro")
  })

  it('deve validar os campos de informacoes e adicionar um carro', () => {
    cy.intercept("POST", 'http://localhost:5000/cars').as('addCar')
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.visit('/carForm')
    cy.get('button').click().then(() => expect(stub).to.be.calledWith("Insira o nome do carro"))
    cy.get('input[type="text"]').first().type("Teste Nome Add")
    cy.get('button').click().then(() => expect(stub).to.be.calledWith("Insira a marca do carro"))
    cy.get('input[type="text"]').eq(1).type("Teste Marca Add")
    cy.get('button').click().then(() => expect(stub).to.be.calledWith("Insira a cor do carro"))
    cy.get('input[type="text"]').eq(2).type("Teste Cor Add")
    cy.get('button').click().then(() => expect(stub).to.be.calledWith("Insira o ano do carro"))
    cy.get('input[type="text"]').eq(3).type("1500")
    cy.get('button').click().then(() => expect(stub).to.be.calledWith("Insira um ano válido"))
    cy.get('input[type="text"]').eq(3).clear().type("2500")
    cy.get('button').click().then(() => expect(stub).to.be.calledWith("Insira um ano válido"))
    cy.get('input[type="text"]').eq(3).clear().type("2000")
    cy.get('button').click()
    cy.wait('@addCar').then((xhr)=>{
      expect(xhr.response.statusCode).to.be.oneOf([200])
      cy.get('[data-cy="car-item"]').last().should('contain.text', "Teste Nome Add")
    })
  })

  it('deve validar os campos de informações e editar as informacoes do ultimo carro', () => {
    cy.wait(500)
    cy.intercept("POST", 'http://localhost:5000/cars').as('editList')
    cy.intercept("GET", 'http://localhost:5000/cars').as('getList')
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.visit('/carsList')
    cy.get('[data-cy="car-item"]').last().click()
    cy.get('input[type="text"]').first().clear()
    cy.get('[data-cy="edit-button"]').click().then(() => expect(stub).to.be.calledWith("Insira o nome do carro"))
    cy.get('input[type="text"]').first().type("Teste Nome Edit")
    cy.get('input[type="text"]').eq(1).clear()
    cy.get('[data-cy="edit-button"]').click().then(() => expect(stub).to.be.calledWith("Insira a marca do carro"))
    cy.get('input[type="text"]').eq(1).type("Teste Marca Edit")
    cy.get('input[type="text"]').eq(2).clear()
    cy.get('[data-cy="edit-button"]').click().then(() => expect(stub).to.be.calledWith("Insira a cor do carro"))
    cy.get('input[type="text"]').eq(2).type("Teste Cor Edit")
    cy.get('input[type="text"]').eq(3).clear()
    cy.get('[data-cy="edit-button"]').click().then(() => expect(stub).to.be.calledWith("Insira o ano do carro"))
    cy.get('input[type="text"]').eq(3).type("1500")
    cy.get('[data-cy="edit-button"]').click().then(() => expect(stub).to.be.calledWith("Insira um ano válido"))
    cy.get('input[type="text"]').eq(3).clear().type("2500")
    cy.get('[data-cy="edit-button"]').click().then(() => expect(stub).to.be.calledWith("Insira um ano válido"))
    cy.get('input[type="text"]').eq(3).clear().type("2020")
    cy.get('[data-cy="edit-button"]').click()
    cy.wait(1000)
    cy.wait('@editList').then((xhr)=>{
      expect(xhr.response.statusCode).to.be.oneOf([200,304])
      cy.wait('@getList').then(()=>{
        cy.get('[data-cy="car-item"]').last().should('contain.text', "Teste Nome Edit")
      }) 
    })
  })

  it('deve excluir o ultimo carro da lista', ()=>{
    cy.visit('/carsList')
    cy.get('[data-cy="exluir-item"]').last().click()
    cy.get('[data-cy="car-item"]').last().should('not.contain.text', "Teste Nome Edit")
  })

  it('botao cancelar deve retornar para lista de carros da pagina de adicionar carro', ()=>{
    cy.visit('/carForm')
    cy.get('[data-cy="cancel-button"]').click()
    cy.location('pathname').should('eq', '/carsList')
  })

  it('botao cancelar deve retornar para lista de carros da pagina de editar carro', ()=>{
    cy.visit('/carsList')
    cy.get('[data-cy="car-item"]').last().click()
    cy.get('[data-cy="cancel-button"]').click()
    cy.location('pathname').should('eq', '/carsList')
  })
})