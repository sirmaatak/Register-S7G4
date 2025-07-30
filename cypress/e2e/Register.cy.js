const errorMessages = {
  name: "Minimum 3 characters needed",
  surname: "Minimum 3 characters needed",
  email: "Invalid mail adress",
  password:
    "8 characters long 1 uppercase & 1 lowercase character and 1 number needed",
};

describe('Register Tests', () => {
  it('name input test fail for 2 characters', () => {
    cy.visit("http://localhost:5177/");
    cy.get('[data-cy="name-input"]').type('sr');
    cy.contains(errorMessages.name);
  });
  it('surname input test fail for 2 characters', () => {
    cy.visit("http://localhost:5177/");
    cy.get('[data-cy="surname-input"]').type('at');
    cy.contains(errorMessages.surname);
  });
  it('email input test fail for invalid email address', () => {
    cy.visit("http://localhost:5177/");
    cy.get('[data-cy="email-input"]').type('sirma.atakoutlook.com');
    cy.contains(errorMessages.email);
  });
  it('password input test fail for invalid email address', () => {
    cy.visit("http://localhost:5177/");
    cy.get('[data-cy="password-input"]').type('12345');
    cy.contains(errorMessages.password);
  });
})