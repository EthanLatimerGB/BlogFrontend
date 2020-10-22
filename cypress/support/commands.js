import 'cypress-localstorage-commands'
Cypress.Commands.add('createBlog', function (blog) {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { blog },
        headers: {
            'Authorization' : `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
        }
    })
})