// Descreve um grupo de testes para o endpoint POST /sessions
describe("POST /sessions", () => {
  // Teste para uma sessão de usuário bem-sucedida
  it("user session", () => {
    // Define os dados do usuário
    const userData = {
      name: "Lucas Antunes",
      email: "lucas@yahoo.com",
      password: "96523345",
    };
    // Faz uma requisição POST para o endpoint /sessions com os dados do usuário
    cy.postSession(userData).then(response => {
      // Desestrutura o usuário e o token do corpo da resposta
      const { user, token } = response.body
      // Espera que o status da resposta seja 200 (OK)
      expect(response.status).to.eq(200)
      // Espera que o nome do usuário na resposta corresponda aos dados do usuário
      expect(user.name).to.eq(userData.name)
      // Espera que o email do usuário na resposta corresponda aos dados do usuário
      expect(user.email).to.eq(userData.email)
      // Espera que o token na resposta não esteja vazio
      expect(token).not.to.be.empty
    })
  })
  // Teste para uma senha inválida
  it("invalid password", () => {
    // Define os dados do usuário com uma senha inválida
    const user = {
      email: "lucas@yahoo.com",
      password: "987654",
    }
    // Faz uma requisição POST para o endpoint /sessions com os dados do usuário
    cy.postSession(user).then(response => {
      // Espera que o status da resposta seja 401 (Não autorizado)
      expect(response.status).to.eq(401)
    })
  })
  // Teste para um email não encontrado
  it("email not found", () => {
    // Define os dados do usuário com um email não encontrado
    const user = {
      email: "lucasantunes@yahoo.com",
      password: "96523345",
    }
    // Faz uma requisição POST para o endpoint /sessions com os dados do usuário
    cy.postSession(user).then(response => {
      // Espera que o status da resposta seja 401 (Não autorizado)
      expect(response.status).to.eq(401)
    })
  })
})
// Adiciona um comando personalizado ao Cypress para fazer uma requisição POST para o endpoint /sessions
Cypress.Commands.add("postSession", (user) => {
  // Faz uma requisição API
  cy.api({
    // Define a URL para a requisição
    url: "/sessions",
    // Define o método para a requisição
    method: "POST",
    // Define o corpo para a requisição
    body: { email: user.email, password: user.password },
    // Não falha no código de status
    failOnStatusCode: false,
  }).then(response => {
    // Retorna a resposta
    return response
  })
})
