describe('Blog application', function() {
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            'username': 'EthanLatimer',
            'name': 'Ethan Latimer',
            'password': 'BruhMoment'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    describe('Login', function() {
        it('Succeeds with correct credentials', function() {
            cy.get('#Username').type('EthanLatimer')
            cy.get('#Password').type('BruhMoment')
            cy.get('#login-button').click()

            cy.contains('Logged in as Ethan Latimer')
        })

        it('Fails with incorrect credentails', function() {
            cy.get('#Username').type('EthanLatimer')
            cy.get('#Password').type('IncorrectPassword')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function(){
            cy.get('#Username').type('EthanLatimer')
            cy.get('#Password').type('BruhMoment')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function(){
            cy.contains('Create Blog').click()
            cy.get('#input-Title').type('This blog was created from testing using Cypress')
            cy.get('#input-Author').type('Ethan Latimer')
            cy.get('#input-URL').type('http://www.test.com')
            cy.get('#input-Likes').type('41')
            cy.get('#submit-Blog').click()

            cy.contains('This blog was created from testing using Cypress')
            cy.contains('Ethan Latimer')
        })

        it('A blog can be liked', function() {
            cy.contains('Create Blog').click()
            cy.get('#input-Title').type('This blog was created from testing using Cypress')
            cy.get('#input-Author').type('Ethan Latimer')
            cy.get('#input-URL').type('http://www.test.com')
            cy.get('#input-Likes').type('41')
            cy.get('#submit-Blog').click()

            cy.contains('This blog was created from testing using Cypress')
            cy.contains('Expand').click()
                .get('#button-incrementlikes').click()
        })

        it('A blog can be deleted', function() {
            const blog1 = {
                title: 'Tylers bruh moments',
                author: 'Tyler lol',
                URL: 'no',
                likes: 21
            }
            cy.createBlog(blog1)


            cy.contains('This blog was created from testing using Cypress')
                .get('#button-deleteblog').click()
            cy.on('window:confirm', () => true)
            cy.contains('This blog was created from testing using Cypress')
        })

        it('Orders all blogs in ascending order for amount of likes', function () {

        })
    })
})