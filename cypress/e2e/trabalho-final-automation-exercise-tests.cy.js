/// <reference types="cypress" />

import cadastro from '../pages/cadastro'
import checkout from '../pages/checkout'
import conta from '../pages/conta'
import contato from '../pages/contato'
import login from '../pages/login'
import menu from '../pages/menu'
import produto from '../pages/produto'

describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Test Case 1: Cadastrar um usuário', () => {
    menu.irParaLoginCadastro()

    cadastro.preencherFormulario()
    cadastro.verificarSeCadastroFoiConcluido()
    cy.screenshot()    

    conta.deletarUsuario()
  });

  it('Test Case 2: Login User with correct email and password', () => {
    menu.irParaLoginCadastro()
    login.preencherLogin('tester-1721346302730@mail.com', '12345')

    login.validarLoginBemSucedido()
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irParaLoginCadastro()
    login.preencherLogin('tester-9876@mail.com', '54321')

    cy.get('p').should('contain', 'Your email or password is incorrect!')
  });

  it('Test Case 4: Logout User', () => {
    menu.irParaLoginCadastro()
    login.preencherLogin('tester-1721346302730@mail.com', '12345')
    login.validarLoginBemSucedido()

    menu.realizarLogout()
    cy.url().should('contain', 'login')
    cy.contains("Login to your account").should("be.visible");
  });

  it('Test Case 5: Register User with existing email', () => {
    menu.irParaLoginCadastro()
    cadastro.iniciarcadastro(`tester-9876@mail.com`)

    cy.get(`.signup-form form p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!')

  });

  it('Test Case 6: Contact Us Form', () => {

    menu.irParaContateNos()
    contato.preencherContato()

    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.irParaProdutos()
    produto.validarTodosProdutos()
    produto.irParaPrimeiroProduto()

    cy.get('.product-information').should('contain.text', "Condition")
    cy.get('.product-information').should('contain.text', "Availability")
    cy.get('.product-information').should('contain.text', "Category")
    cy.get('.product-information').should('contain.text', "Brand")
    cy.get('.product-information > h2').should('be.visible')
    cy.get('.product-information p').should('be.visible').and('have.length', 4)
    cy.get('.product-information span span').should('be.visible')
    cy.screenshot()

  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProdutos()
    produto.validarTodosProdutos()
    produto.buscarPorProduto('Dress')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cadastro.subscription()

    cy.contains('You have been successfully subscribed!').should('be.visible')

  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    menu.irParaLoginCadastro()
    cadastro.preencherFormulario()
    produto.adicionarAoCarrinho()
    checkout.revisarPedido()
    checkout.efetuarPagamento()

    cy.get('[data-qa="order-placed"]').should('be.visible')
    cy.get('section p').should('have.text', 'Congratulations! Your order has been confirmed!')
    

    conta.deletarUsuario()
  });
});