class Produto {

    validarTodosProdutos(){
        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')
    }

    irParaPrimeiroProduto(){
        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()
    }

    buscarPorProduto(produto){
        cy.get('input#search_product').type(produto)
        cy.get('button#submit_search').click()
        cy.get('.title').should('be.visible').and('contain', 'Searched Products')
    }

    adicionarAoCarrinho(){
        cy.contains("Add to cart").click()
        cy.contains("View Cart").click()
    }
}

export default new Produto() 