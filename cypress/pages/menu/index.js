class Menu {
    irParaProdutos() {
        cy.contains(`Products`).click()
    }

    irParaLoginCadastro() {
        cy.contains('Signup').click()
    }

    irParaContateNos() {
        cy.contains(`Contact us`).click()
    }

    realizarLogout(){
        cy.contains('Logout').click()
    }
}

export default new Menu()