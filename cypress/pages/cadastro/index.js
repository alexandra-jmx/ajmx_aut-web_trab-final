import { faker } from '@faker-js/faker' 

class Cadastro {
    preencherFormulario() {
        const timestamp = new Date().getTime()
        const signUpName = 'Tester QA'

        Cypress.env('signUpName', signUpName)
    
        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`)
        cy.contains('button', 'Signup').click()
    
       cy.get('input[type=radio]').check('Mrs')
    
        cy.get('[type=password]').type(faker.internet.password(), { log: false })
    
        cy.get('[data-qa="days"]').select(faker.number.int({ min: 1, max: 31 }))
        cy.get('[data-qa="months"]').select(faker.date.month())
        cy.get('[data-qa="years"]').select('1993')
    
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
    
        cy.get('[data-qa="first_name"]').type(faker.person.firstName('female'))
        cy.get('[data-qa="last_name"]').type(faker.person.lastName())
        cy.get('[data-qa="company"]').type(faker.company.name())
        cy.get('[data-qa="address"]').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type(faker.location.state())
        cy.get('[data-qa="city"]').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number())
    
        cy.get('[data-qa="create-account"]').click()
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    }

    iniciarcadastro(email) {
        cy.get('[data-qa="signup-name"]').type(`Tester QA`)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    verificarSeCadastroFoiConcluido() {
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
    }

    subscription(){
        cy.get('input#susbscribe_email')
        .scrollIntoView()
        .type(faker.internet.email())

         cy.get('button#subscribe').click()
    }
}

export default new Cadastro()