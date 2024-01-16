// commands.js: Definindo um novo comando personalizado chamado "postUser" para realizar uma requisição POST para a rota "/users"
// No arquivo support/commands.js, um comando personalizado é adicionado ao Cypress
Cypress.Commands.add("postUser", (user) => {
  // Uma requisição API é feita
  cy.api({
    // A URL para a requisição é definida
    url: "/users",
    // O método para a requisição é definido
    method: "POST",
    // O corpo da requisição é definido
    body: user,
    // Não falha no código de status
    failOnStatusCode: false,
  }).then(response => { 
    // Retorna a resposta
    return response 
  })
})