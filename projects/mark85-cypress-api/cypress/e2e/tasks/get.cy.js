describe("GET /tasks", () => {
  beforeEach(function () {
    cy.fixture("tasks/get").then(function (tasks) {
      this.tasks = tasks
    })
  })
  it("get my tasks", function () {
    const { user, tasks } = this.tasks.list
    cy.task('deleteTasksLike', 'Estud4r')
    cy.task('deleteUser', user.email)
    cy.postUser(user)
    cy.postSession(user)
      .then(respUser => {
        cy.postTask(tasks[0], respUser.body.token)
        cy.postTask(tasks[1], respUser.body.token)
        cy.postTask(tasks[2], respUser.body.token)
      })
  })
})
