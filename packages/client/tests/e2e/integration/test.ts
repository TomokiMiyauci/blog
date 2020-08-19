describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('body').type('/').type('hello')
    cy.get('li').click({ multiple: true })

    cy.url()
    // cy.contains('h1', 'Techxas')
  })
})
