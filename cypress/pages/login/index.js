class Login {
    preencherLogin(usuario, senha) {
        cy.get('[data-qa="login-email"]').type(usuario)
        cy.get('[data-qa="login-password"]').type(senha, { log: false })
    
        cy.get('[data-qa="login-button"]').click()    
    }

    validarLoginBemSucedido(){
        cy.get('i.fa-user').parent().should('contain', 'Tester QA')
    }
}

export default new Login()