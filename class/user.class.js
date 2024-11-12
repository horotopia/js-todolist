import TodoList from "./todoList.class";

export default class User {
  // Le constructeur de la classe
  constructor(email, nom, prenom, password, dateNaissance) {
    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.password = password;
    this.dateNaissance = new Date(dateNaissance);
    this.todoList = new TodoList(this);
  }

  // Méthode pour afficher les informations de l'utilisateur
  afficherInfos() {
    return `${this.prenom} ${this.nom}, Email: ${
      this.email
    }, Né(e) le: ${this.dateNaissance.toDateString()}`;
  }

  //Méthode poour valider tous les champs
  isValid() {
    return (
      this.emailEstValide() &&
      this.nomEtPrenomSontValides() &&
      this.passwordEstValide() &&
      this.estAgeValide()
    );
  }
  // Méthode pour valider l'email
  emailEstValide() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.email && regexEmail.test(this.email);
  }

  // Méthode pour vérifier que le nom et le prénom sont renseignés
  nomEtPrenomSontValides() {
    return (
      this.nom !== undefined &&
      this.nom !== null &&
      this.nom.trim() !== "" &&
      typeof this.nom === "string" &&
      this.prenom !== undefined &&
      this.prenom !== null &&
      this.prenom.trim() !== "" &&
      typeof this.prenom === "string"
    );
  }

  // Méthode pour vérifier que le mot de passe est valide
  passwordEstValide() {
    return (
      this.password &&
      this.password.length >= 8 &&
      this.password.length <= 40 &&
      /[a-z]/.test(this.password) &&
      /[A-Z]/.test(this.password) &&
      /[0-9]/.test(this.password)
    );
  }

  // Méthode pour obtenir l'âge de l'utilisateur
  obtenirAge() {
    let aujourdhui = new Date();
    let age = aujourdhui.getFullYear() - this.dateNaissance.getFullYear();
    let mois = aujourdhui.getMonth() - this.dateNaissance.getMonth();
    if (
      mois < 0 ||
      (mois === 0 && aujourdhui.getDate() < this.dateNaissance.getDate())
    ) {
      age--; // Réduire l'âge si l'anniversaire n'est pas encore passé cette année
    }
    return age;
  }

  // Méthode pour vérifier que l'utilisateur a 13 ans ou plus
  estAgeValide() {
    return this.obtenirAge() >= 13;
  }
}
