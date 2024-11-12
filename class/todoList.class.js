import EmailSenderService from "./emailSenderService.class";

export default class TodoList {
  constructor(user) {
    this.user = user;
    this.items = [];
  }

  add(item) {
    // Check if the list is full
    if (this.items.length > 10) {
      throw new Error("ToDoList cannot contain more than 10 items.");
    }

    // Check if the name is unique
    if (this.items.some((i) => i.name === item.name)) {
      throw new Error("Name must be unique.");
    }

    // Check if the content contain a maximum of 1000 characters
    if (item.content.length > 1000) {
      throw new Error("Content must be less than 1000 characters long.");
    }

    // Check if the user is trying to add an item too quickly
    if (this.items.length > 0) {
      const lastItem = this.items[this.items.length - 1];
      if (!lastItem || item.createdAt - lastItem.createdAt < 30 * 60 * 1000) {
        throw new Error("You must wait 30 minutes before adding a new item.");
      }
    }

    this.save(item);

    // Notify user if adding the 8th item
    if (this.items.length === 8) {
      this.sendANotif(this.user);
    }
  }
  // Save method to push the item to the list
  save(item) {
    this.items.push(item);
  }

  sendANotif(user) {
    const emailSenderService = new EmailSenderService();
    emailSenderService.sendEmail(
      user.email,
      "Votre todo liste est bientôt pleine."
    );
  }
}
