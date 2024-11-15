describe('visit pages Test', () => {
  it('Visits the weather page', () => {
    cy.visit('localhost:3000/wheater')
  })

  it('visit dashboard page' , () => {
    cy.visit('localhost:3000')
  })

  it('visit profile page' , () => {
    cy.visit('localhost:3000/profile')
  })

  it('visit todos page' , () => {
    cy.visit('localhost:3000/todos')
  })
})



describe('Todos page Test', () => {

  it('check todo validaiton' , () => {
    cy.visit('localhost:3000/todos')

    cy.contains('Todo List')
    cy.contains('Add').click()
    cy.contains('input must contain at least one character')

  })

  it('add a todo' , () => {
    cy.visit('localhost:3000/todos')

    cy.get('#addInput').type('todo 1')
    cy.contains('Add').click()
    cy.contains('todo 1')

  })

  it('add and done todo' , () => {
    cy.visit('localhost:3000/todos')

    cy.get('#addInput').type('todo done test')
    cy.contains('Add').click()
    cy.contains('todo done test')
    cy.get('#doneButton').click()
    cy.contains('todo done test').then(($title) => {
      $title.hasClass('line-through')
    })

  })

  it('add and edit a todo' , () => {
    cy.visit('localhost:3000/todos')

    cy.get('#addInput').type('todo test')
    cy.contains('Add').click()
    cy.contains('todo test')

    
    cy.get('[id="editModeButton-todo test"]').click()
    cy.get('[id="editInput-todo test"]').type('todo test edited')
    cy.get('[id="editButton-todo test"]').click()
    cy.contains('todo test edited')

  })

  it('add and delete a todo' , () => {
    cy.visit('localhost:3000/todos')

    cy.get('#addInput').type('todo test remove')
    cy.contains('Add').click()
    cy.contains('todo test remove')

    cy.get('[id="removeTodoButton-todo test remove"]').click()

    cy.contains('todo test remove').should('not.exist')

  })


})

describe('Profile page Test', () => {
  it('check profile validaiton' , () => {
    cy.visit('localhost:3000/profile')

    cy.contains('Save').click()
    cy.contains('This username field is required atleast 3 characte')

  })

  it('fill form and submit and check if it works' , () => {
    cy.visit('localhost:3000/profile')

    cy.get('#username').type('ehsan')

    cy.contains('Save').click()
    cy.contains('information changed successfully')

    cy.visit('localhost:3000/')
    cy.contains('ehsan')
    

  })


})

describe('Weather page Test', () => {

  it('visit and check init works' , () => {

    cy.visit('localhost:3000/wheater')
    cy.contains('tehran')

  })
})

describe('Dashboard page Test', () => {

  it('check good day working' , () => {

    cy.visit('localhost:3000/')
    cy.contains('Good')

  })
})
