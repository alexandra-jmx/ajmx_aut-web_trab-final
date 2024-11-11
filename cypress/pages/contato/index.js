import { faker } from '@faker-js/faker' 
class Contato {

    preencherContato() {
        cy.get(`.contact-form h2`)
          .should('be.visible')
          .and('have.text', 'Get In Touch')

          cy.get('[data-qa="name"]').type(faker.person.fullName())
          cy.get('[data-qa="email"]').type(faker.internet.email())
          cy.get('[data-qa="subject"]').type(`Contact Form`)
          cy.get('[data-qa="message"]').type(`Testing Contact Form`)
      
          cy.fixture('hermione.png').as('file')
          cy.get('input[name="upload_file"]').selectFile('@file')
      
          cy.get('[data-qa="submit-button"]').click()
    }

 }
 
export default new Contato() 