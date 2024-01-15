describe("POST /users", () => {
  it("register a new user", () => {
    const user = {
      name: "Lucas Antunes",
      email: "lucas@yahoo.com",
      password: "96523345",
    };
    cy.task("deleteUser", user.email)
    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })
  it("duplicate email", () => {
    const user = {
      name: "Tim McGraw",
      email: "mcgraw@icloud.com",
      password: "96523345",
    };
    cy.task("deleteUser", user.email)
    cy.postUser(user)
    cy.postUser(user)
      .then(response => {
        const {message} = response.body
        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })
  })
})
