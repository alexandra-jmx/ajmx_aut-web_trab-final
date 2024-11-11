class Conta {
    deletarUsuario(){
    cy.get('[href *="delete"]').click()
    cy.url().should('contain', 'delete')
    cy.get('b').should('contain', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').click()
    }
}

export default new Conta()