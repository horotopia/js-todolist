import { describe, expect, it } from "vitest";
import User from "./class/user.class";

const goodDate = new Date(Date.now() - 14 * 365 * 24 * 60 * 60 * 1000);
const wrongDate = new Date(Date.now() - 12 * 365 * 24 * 60 * 60 * 1000);

describe("User Class Validations", () => {
  it("devrait valider un user correct", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "Password123",
      goodDate
    );
    expect(utilisateur.isValid(utilisateur)).toBe(true);
  });
});
describe("User lastname Class NOT valid", () => {
  it("devrait invalider un user pour son nom", () => {
    const utilisateur = new User(
      "test@example.com",
      "",
      "Jean",
      "Password123",
      goodDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User firstname Class NOT valid", () => {
  it("devrait invalider un user pour son prénom", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "",
      "Password123",
      goodDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User email Class NOT valid", () => {
  it("devrait invalider un user pour son email", () => {
    const utilisateur = new User(
      "test.com",
      "Dupont",
      "Jean",
      "Password123",
      goodDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User dateNaissance Class NOT valid 1", () => {
  it("devrait invalider un user pour sa date d'anniversaire 1", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "Password123",
      wrongDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User dateNaissance Class NOT valid 2", () => {
  it("devrait invalider un user pour sa date d'anniversaire 2", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "Password123",
      "28"
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User password Class NOT valid 1", () => {
  it("devrait invalider un user pour son mot de pass 1", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "password123",
      goodDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User password Class NOT valid 2", () => {
  it("devrait invalider un user pour son mot de pass 2", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "PASSWORD123",
      goodDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
describe("User password Class NOT valid 3", () => {
  it("devrait invalider un user pour son mot de pass 3", () => {
    const utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "Password",
      goodDate
    );
    expect(utilisateur.isValid()).toBe(false);
  });
});
