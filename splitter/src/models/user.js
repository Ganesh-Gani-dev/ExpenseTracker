export class User {
  constructor(name) {
    if (!name || typeof name != "string") {
      console.warn("Invalid Name");
    }
    this.name = name.trim();
    this.id = this.generateId();
  }

  generateId() {
    return crypto.randomUUID();
  }
}
