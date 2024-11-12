import { beforeEach, describe, expect, it, vi } from "vitest";
import EmailSenderService from "./class/emailSenderService.class";
import TodoItem from "./class/todoItem.class";
import User from "./class/user.class";

const goodDate = new Date(Date.now() - 14 * 365 * 24 * 60 * 60 * 1000);

vi.mock("./class/emailSenderService.class");

describe("TodoList Class Validations", () => {
  let utilisateur;

  beforeEach(() => {
    utilisateur = new User(
      "test@example.com",
      "Dupont",
      "Jean",
      "Password123",
      goodDate
    );
  });

  // test taille todolist à 0
  it("devrait valider une todolist avec 0 todoItem", () => {
    expect(utilisateur.todoList.items.length).toEqual(0);
  });

  // test taille todolist à 1
  it("devrait valider un nouvel item dans la todolist", () => {
    vi.useFakeTimers();
    utilisateur.todoList.add(new TodoItem("One", "first item to do"));
    expect(utilisateur.todoList.items.length).toEqual(1);
  });

  it("devrait valider l'envoi d'un mail à la création d'un 8ème item", () => {
    const addSpy = vi.spyOn(utilisateur.todoList, "sendANotif");

    const sendEmailMock = vi.fn();
    EmailSenderService.prototype.sendEmail = sendEmailMock;

    // Utilise des fake timers pour gérer le délai de 30 minutes
    vi.useFakeTimers();

    // Ajoute 8 items
    for (let i = 1; i <= 8; i++) {
      utilisateur.todoList.add(new TodoItem(`Tâche ${i}`, `Tâche ${i}`));
      vi.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
    }

    // Rétablit le temps pour vérifier les assertions
    vi.runAllTimers();

    expect(utilisateur.todoList.items.length).toEqual(8);
    expect(addSpy).toHaveBeenCalledOnce();
    expect(sendEmailMock).toHaveBeenCalledWith(
      "test@example.com",
      "Votre todo liste est bientôt pleine."
    );

    // Rétablit le temps pour les tests suivants
    vi.useRealTimers();
  });

  it("devrait invalider l'ajout d'un item trop rapidement", () => {
    utilisateur.todoList.add(new TodoItem("One", "first item to do"));
    expect(() =>
      utilisateur.todoList.add(new TodoItem("Two", "second item to do"))
    ).toThrowError("You must wait 30 minutes before adding a new item.");
  });

  it("devrait invalider l'ajout d'un item avec un nom déjà existant", () => {
    utilisateur.todoList.add(new TodoItem("One", "first item to do"));
    expect(() =>
      utilisateur.todoList.add(new TodoItem("One", "second item to do"))
    ).toThrowError("Name must be unique.");
  });

  it("devrait invalider l'ajout d'un item avec un contenu trop long", () => {
    expect(() =>
      utilisateur.todoList.add(new TodoItem("One", "a".repeat(1001)))
    ).toThrowError("Content must be less than 1000 characters long.");
  });

  it("devrait invalider l'ajout d'un item si la liste est pleine", () => {
    vi.useFakeTimers();
    for (let i = 1; i <= 10; i++) {
      utilisateur.todoList.add(new TodoItem(`Tâche ${i}`, `Tâche ${i}`));
      vi.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
    }
    vi.runAllTimers();

    expect(() => {
      utilisateur.todoList
        .add(new TodoItem("Tâche 11", "Tâche 11"))
        .toThrowError("ToDoList cannot contain more than 10 items.");
      vi.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
    });

    vi.useRealTimers();
  });

  it("devrait invalider l'enregistrement d'un item", () => {
    const item = new TodoItem("riz", "aller acheter du riz");

    const saveMock = vi
      .spyOn(utilisateur.todoList, "save")
      .mockImplementation(() => {
        throw new Error("Erreur lors de la sauvegarde de la nouvelle tâche");
      });

    expect(() =>
      utilisateur.todoList.add(new TodoItem("One", "a".repeat(1001)))
    ).toThrowError("Content must be less than 1000 characters long.");
  });
});

describe("TodoList Class NOT valid", () => {
  it("should invalidate a user", () => {
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
